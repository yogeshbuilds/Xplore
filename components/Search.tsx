'use client'

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { debouncer, httpHelper } from "@/lib/utils";
import useSearch from "@/zustand/store";

export interface Country {
    name: {
        official: string;
    };
    flags: {
        png: string,
        alt: string
    }
}

interface SearchProps {
    page: 'index' | 'search';
    submitForm: (e: FormEvent) => void;
}

export default function Search(props: SearchProps) {
    const { page, submitForm } = props;
    const [suggestions, setSuggestions] = useState<Country[]>([]);
    const searchRef = useRef(null);
    const { query, setQuery } = useSearch() as { query: string, setQuery: (val: string) => void };
    const [focus, setFocus] = useState(page === 'index');

    useEffect(() => {
        if (page === 'index' && searchRef.current && typeof (searchRef.current as HTMLInputElement).focus === "function") {
            (searchRef.current as HTMLInputElement).focus();
        }
    }, [page]);

    const handleChange = async (val: string) => {
        if (val) {
            const results = await httpHelper(`/name/${val}`);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    }

    const dSearch = debouncer(handleChange, 500);

    const goToSearch = (elem: HTMLDivElement) => {
        const value = elem.dataset?.value || '';
        if (value) {
            // go to coutry details page
        };
    }

    return (
        <Command className="bg-black/50 rounded-lg w-full text-white">
            <CommandInput
                ref={searchRef}
                value={query}
                placeholder="Serach for a country..."
                onValueChange={(val) => { setQuery(val); dSearch(val); }}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                autoFocus={focus}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submitForm(e);
                        setFocus(false);
                    }
                }}
            />
            {(suggestions?.length > 0 && focus) && (
                <CommandList className="bg-white">
                    <CommandGroup heading="Suggestions" onClick={(e) => goToSearch(e.target as HTMLDivElement)}>
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