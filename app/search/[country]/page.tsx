'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { type Country, type CountryApiResponse } from '../../../types/country';
import Image from 'next/image';

interface CountryInfoProps {
    initialData?: Country;
}

export default function CountryInfo({ initialData }: CountryInfoProps = {}) {
    const params = useParams();
    const countryName = typeof params === 'object' && params !== null && 'country' in params
        ? (params as Record<string, string>).country
        : undefined;
    const [countryData, setCountryData] = useState<Country | null>(initialData || null);
    const [loading, setLoading] = useState<boolean>(!initialData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountryData = async (): Promise<void> => {
            if (!countryName || initialData) { return };

            setLoading(true);
            setError(null);

            const decodedCountryName = decodeURIComponent(countryName);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/name/${encodeURIComponent(decodedCountryName)}?fullText=true`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch country data: ${response.status}`);
            }

            const data: CountryApiResponse = await response.json();
            setCountryData(data[0]); // API returns array, we take first result
            setLoading(false);
        };

        fetchCountryData();
    }, [countryName, initialData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading country information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!countryData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <div className="text-gray-400 text-6xl mb-4">🌍</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Country Not Found</h2>
                    <p className="text-gray-600">No data available for the requested country.</p>
                </div>
            </div>
        );
    }

    const {
        name,
        flags,
        coatOfArms,
        capital,
        region,
        subregion,
        population,
        area,
        languages,
        currencies,
        timezones,
        borders,
        tld,
        idd,
        car,
        demonyms,
        gini,
        continents,
        maps,
        landlocked,
        unMember,
        independent,
        startOfWeek
    } = countryData;

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat().format(num);
    };

    const formatLanguages = (langs: Country['languages']): string => {
        if (!langs) { return 'N/A' };
        return Object.values(langs).join(', ');
    };

    const formatCurrencies = (curr: Country['currencies']): string => {
        if (!curr) { return 'N/A' };
        return Object.entries(curr)
            .map(([code, details]) => `${details.name} (${details.symbol || code})`)
            .join(', ');
    };

    const getGiniData = (giniObj: Country['gini']): string => {
        if (!giniObj) { return 'N/A' };
        const years = Object.keys(giniObj).map(Number);
        const latestYear = Math.max(...years);
        return `${giniObj[latestYear]} (${latestYear})`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <Image
                                src={flags?.png || flags?.svg}
                                alt={`Flag of ${name?.common}`}
                                className="w-32 h-24 object-cover rounded-lg shadow-md border"
                                width={320}
                                height={240}
                            />
                        </div>
                        <div className="text-center lg:text-left flex-grow">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {name?.common} {countryData.flag}
                            </h1>
                            <h2 className="text-xl text-gray-600 mb-4">{name?.official}</h2>
                            {name?.nativeName && (
                                <div className="space-y-1">
                                    {Object.entries(name.nativeName).map(([lang, names]) => (
                                        <p key={lang} className="text-gray-500 text-sm">
                                            Native ({lang.toUpperCase()}): {names.official}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                        {coatOfArms?.png && (
                            <div className="flex-shrink-0">
                                <Image
                                    src={coatOfArms.png}
                                    alt={`Coat of Arms of ${name?.common}`}
                                    className="w-20 h-20 object-contain"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Basic Information
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold text-gray-600">Capital:</span>
                                    <p className="text-gray-800">{capital?.[0] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Region:</span>
                                    <p className="text-gray-800">{region}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Subregion:</span>
                                    <p className="text-gray-800">{subregion}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Continent:</span>
                                    <p className="text-gray-800">{continents?.[0]}</p>
                                </div>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Population:</span>
                                <p className="text-gray-800 text-lg">{formatNumber(population)}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Area:</span>
                                <p className="text-gray-800">{formatNumber(area)} km²</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Languages:</span>
                                <p className="text-gray-800">{formatLanguages(languages)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Economic & Political */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Economic & Political
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="font-semibold text-gray-600">Currencies:</span>
                                <p className="text-gray-800">{formatCurrencies(currencies)}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Gini Index:</span>
                                <p className="text-gray-800">{getGiniData(gini)}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold text-gray-600">Independent:</span>
                                    <p className="text-gray-800">{independent ? 'Yes' : 'No'}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">UN Member:</span>
                                    <p className="text-gray-800">{unMember ? 'Yes' : 'No'}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Landlocked:</span>
                                    <p className="text-gray-800">{landlocked ? 'Yes' : 'No'}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Week Starts:</span>
                                    <p className="text-gray-800 capitalize">{startOfWeek}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Technical Details
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold text-gray-600">Country Code:</span>
                                    <p className="text-gray-800 font-mono">{countryData.cca2}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Calling Code:</span>
                                    <p className="text-gray-800 font-mono">
                                        {idd?.root}{idd?.suffixes?.[0]}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">TLD:</span>
                                    <p className="text-gray-800 font-mono">{tld?.[0]}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Car Side:</span>
                                    <p className="text-gray-800 capitalize">{car?.side}</p>
                                </div>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Timezones:</span>
                                <p className="text-gray-800 font-mono">{timezones?.join(', ')}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Demonym:</span>
                                <p className="text-gray-800">{demonyms?.eng?.m || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Borders & Maps */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Geography & Links
                        </h3>
                        <div className="space-y-4">
                            {borders && borders.length > 0 && (
                                <div>
                                    <span className="font-semibold text-gray-600">Border Countries:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {borders.map((border) => (
                                            <span
                                                key={border}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono"
                                            >
                                                {border}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <span className="font-semibold text-gray-600">Maps:</span>
                                <div className="flex flex-col space-y-2">
                                    {maps?.googleMaps && (
                                        <a
                                            href={maps.googleMaps}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-fit"
                                        >
                                            🗺️ Google Maps
                                        </a>
                                    )}
                                    {maps?.openStreetMaps && (
                                        <a
                                            href={maps.openStreetMaps}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit"
                                        >
                                            🌍 OpenStreetMap
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}