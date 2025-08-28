'use client'

import CountryCard, { SkeletonCards } from "@/components/Card";
import type { Country } from "@/components/Search";
import { lazy } from "react";
import { httpHelper } from "@/lib/utils";
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from "react";
const Search = lazy(() => import('@/components/Search'));


export default function SearchPage() {
    const params = useSearchParams();
    const query = params.get('query') || '';
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCountries(query: string) {
            if (query) {
                const results = await httpHelper(`/name/${query}`);
                if (Array.isArray(results)) {
                    setCountries(results);
                }
            }
            setLoading(false);
        };
        fetchCountries(query);
    }, [query]);

    return (
        <div>
            {/* Nav Bar */}
            <div className="w-full h-16 relative">
                <div className="flex justify-between gap-[5%] w-full">
                    <div className="w-[20%] p-2 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">Xplore</h1>
                    </div>
                    <div className="w-[50%] p-2 text-white">
                        <Suspense fallback='loading'>
                            <Search />
                        </Suspense>
                    </div>
                    <div className="w-[20%]" />
                </div>
                <div className="bg-border -mx-1 h-px" />
            </div>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {!loading && countries.length > 0 && (
                        countries.map((c: Country) => <CountryCard key={c.name.official} countryData={c} />)
                    )}
                </div>
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        <SkeletonCards />
                        <SkeletonCards />
                        <SkeletonCards />
                        <SkeletonCards />
                    </div>
                )}
                {!loading && countries.length === 0 && (
                    <h2>Soemthing went wrong!!</h2>
                )}

            </div>
        </div>
    )
}