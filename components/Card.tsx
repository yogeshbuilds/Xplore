import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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
interface CountryProps {
    countryData: {
        name: {
            common: string;
            official: string;
        };
        capital: string[];
        fifa: string;
        currencies: {
            [key: string]: { name: string, symbol: string };
        };
        flags: {
            png: string;
            alt: string;
        };
        region: string;
    }
}

export default function CountryCard({ countryData }: CountryProps ) {
    const currencyNames = Object.values(countryData?.currencies || {})
        .map((c) => `${c?.name} (${c.symbol})`)
        .filter(Boolean)
        .join(", ");
    return (
        <Card>
            <Link href={`/search/${countryData.name.official}`}>
            <CardHeader>
                <CardDescription>
                    <Image className="border rounder-2" lazyRoot="" src={countryData.flags.png} alt={countryData.flags.alt || 'alt'} height={125} width={320} />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-bold">{countryData.name.common}<span>({countryData.name.official})</span></p>
                <p>Capital - {countryData?.capital?.[0]}</p>
                <p>
                    Currency - {currencyNames || 'N/A'}
                </p>
                <p>Region - {countryData.region}</p>
            </CardContent>
            </Link>
        </Card>
    )
}
