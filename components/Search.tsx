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
import { useRouter } from "next/navigation";

export interface Country {
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
    const router = useRouter();

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
            router.push(`/search/${value}`);
        };
    }

    return (
        <div className="relative w-full">
            <Command className="bg-black/50 rounded-lg w-full text-white">
                <CommandInput
                    ref={searchRef}
                    value={query}
                    placeholder="Serach for a country..."
                    onValueChange={(val) => { setQuery(val); dSearch(val); }}
                    autoFocus={focus}
                    onBlur={(e) => {
                        e.stopPropagation();
                        // Add a small delay to allow click events to process first
                        setTimeout(() => setFocus(false), 150);
                    }}
                    onFocus={(e) => {setFocus(true); e.stopPropagation() }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            submitForm(e);
                            setFocus(false);
                        }
                    }}
                />
                {(suggestions?.length > 0 && focus) && (
                    <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-lg shadow-lg border max-h-80 overflow-y-auto">
                        <CommandGroup 
                            heading="Suggestions"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                const target = e.target as HTMLElement;
                                const commandItem = target.closest('[data-value]');
                                if (commandItem) {
                                    setFocus(false); // Immediately hide suggestions
                                    goToSearch(commandItem as HTMLDivElement);
                                }
                            }
                        }
                        >
                            {suggestions.map((c: Country) => (
                                <CommandItem
                                    key={c?.name?.official} 
                                    className="text-gray-900 hover:bg-gray-100"
                                    data-value={c?.name?.official}
                                >
                                    {c?.name?.official}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                )}
            </Command>
        </div>
    )
}