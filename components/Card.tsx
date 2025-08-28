import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
        flags: {
            png: string,
            alt: string
        }
    }
}

export default function CountryCard({ countryData }: CountryProps ) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                    <Image lazyRoot="" src={countryData.flags.png} alt={countryData.flags.alt || 'alt'} height={125} width={320} />
                </CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}
