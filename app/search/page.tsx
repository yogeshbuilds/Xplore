'use client'

import CountryCard, { SkeletonCards } from "@/components/Card";
import type { Country } from "@/components/Search";
import type { FormEvent } from "react";
import { lazy } from "react";
import { httpHelper } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import useSearch from "@/zustand/store";
const Search = lazy(() => import('@/components/Search'));

export default function SearchPage() {
    const { query } = useSearch() as { query: string };
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCountries(query: string) {
        if (query) {
            const results = await httpHelper(`/name/${query}`);
            if (Array.isArray(results)) {
                setCountries(results);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query) {
            fetchCountries(query);
        } else {
            setLoading(false);
        }
    }, []);

    const formSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (query) {
            fetchCountries(query);
        }
    }

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
                            <Search page="search" submitForm={formSubmit} />
                        </Suspense>
                    </div>
                    <div className="w-[20%]" />
                </div>
                <div className="bg-border -mx-1 h-px" />
            </div>
            <div className="container mx-auto px-2 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {!loading && countries.length > 0 && (
                        countries.map((c: Country) => <CountryCard key={c.name.official} countryData={c} />)
                    )}
                </div>
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <SkeletonCards key={idx} />
                        ))}
                    </div>
                )}
                {!loading && countries.length === 0 && (
                    <h2>Search for your favourite country...</h2>
                )}
            </div>
        </div>
    )
}