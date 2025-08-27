'use client'

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useEffect, useRef, useState } from "react";
import { debouncer, httpHelper } from "@/lib/utils";

interface Country {
    name: {
        official: string;
    };
}

export default function Search() {
    const [suggestions, setSuggestions] = useState<Country[]>([]);
    const searchRef = useRef(null);

    useEffect(() => {
        if (searchRef.current && typeof (searchRef.current as HTMLInputElement).focus === "function") {
            (searchRef.current as HTMLInputElement).focus();
        }
    }, []);

    const handleChange = async (val: string) => {
        if (val) {
            const results = await httpHelper(`/name/${val}`);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    }

    const dSearch = debouncer(handleChange, 500);

    return (
        <Command className="bg-black/50 rounded-lg w-full text-white">
            <CommandInput
                ref={searchRef}
                placeholder="Serach for a country..."
                onChangeCapture={(e) => dSearch((e.target as HTMLInputElement).value)}
            />
            {suggestions?.length > 0 && (
                <CommandList className="bg-white">
                    <CommandGroup heading="Suggestions">
                        {suggestions.map((c: Country) => (
                            <CommandItem key={c?.name?.official}>
                                {c?.name?.official}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    )
}