'use client'

import CountryCard, { SkeletonCards } from "@/components/Card";
import { lazy } from "react";
import { httpHelper } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { useCount, useCountries } from "@/zustand/store";
import type { Country } from "@/types/country";
import { useSearchParams } from "next/navigation";
const Search = lazy(() => import('@/components/Search'));

function SearchPageContent() {
    const { countries, setCountries } = useCountries() as { countries: Country[], setCountries: (val: Country[]) => void };
    const { visibleCount, setVisibleCount } = useCount() as { visibleCount: number, setVisibleCount: (c: number) => void };
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const query = params.get('query');

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const showMore = () => {
        setVisibleCount(Math.min(visibleCount + 12, countries?.length));
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
                        <Search page="search" />
                    </div>
                    <div className="w-[20%]" />
                </div>
                <div className="bg-border -mx-1 h-px" />
            </div>
            <div className="container mx-auto px-2 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {!loading && countries.length > 0 && (
                        countries.slice(0, visibleCount).map((c: Country) => <CountryCard key={c.name.official} countryData={c} />)
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
                    <h1 className="text-center font-bold">Search for your favourite country...</h1>
                )}
                {!loading && countries.length > 0 && visibleCount < countries.length && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={showMore}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Show More ({countries.length - visibleCount} remaining)
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function SearchPageFallback() {
    return (
        <div>
            {/* Nav Bar Skeleton */}
            <div className="w-full h-16 relative">
                <div className="flex justify-between gap-[5%] w-full">
                    <div className="w-[20%] p-2 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold">Xplore</h1>
                    </div>
                    <div className="w-[50%] p-2">
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-[20%]" />
                </div>
                <div className="bg-border -mx-1 h-px" />
            </div>
            <div className="container mx-auto px-2 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <SkeletonCards key={idx} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageFallback />}>
            <SearchPageContent />
        </Suspense>
    );
}