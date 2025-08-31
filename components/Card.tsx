import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Country } from "@/types/country";

export function SkeletonCards() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export default function CountryCard({ countryData }: { countryData: Country }) {
    const currencyNames = Object.values(countryData?.currencies || {})
        .map((c: any) => `${c?.name} (${c?.symbol})`)
        .filter(Boolean)
        .join(", ");

    const formatPopulation = (pop: number) => {
        if (pop >= 1000000) {
            return `${(pop / 1000000).toFixed(1)}M`;
        } else if (pop >= 1000) {
            return `${(pop / 1000).toFixed(0)}K`;
        }
        return pop?.toString();
    };

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white">
            <Link href={`/search/${encodeURIComponent(countryData.name.official)}`} className="block">
                <CardHeader className="p-0">
                    <CardDescription className="relative overflow-hidden rounded-t-lg">
                        <Image
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            src={countryData.flags.png}
                            alt={countryData.flags.alt || `Flag of ${countryData.name.common}`}
                            height={192}
                            width={320}
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {countryData.name.common} {countryData.flag}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                            {countryData.name.official}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span className="font-medium mr-2">Capital:</span>
                            <span className="truncate">{countryData?.capital?.[0] || 'N/A'}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span className="font-medium mr-2">Region:</span>
                            <span>{countryData.region}</span>
                        </div>

                        {countryData.population && (
                            <div className="flex items-center text-sm text-gray-700">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                                <span className="font-medium mr-2">Population:</span>
                                <span>{formatPopulation(countryData.population)}</span>
                            </div>
                        )}

                        <div className="flex items-start text-sm text-gray-700">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0 mt-1.5"></span>
                            <span className="font-medium mr-2">Currency:</span>
                            <span className="line-clamp-2">{currencyNames || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                            View Details →
                        </span>
                        {countryData.fifa && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-mono">
                                {countryData.fifa}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
