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
import { useCount, useCountries } from "@/zustand/store";
import { useRouter } from "next/navigation";
import type { Country } from "@/types/country";

interface SearchProps {
    page: 'index' | 'search';
}

export default function Search(props: SearchProps) {
    const { page } = props;
    const [suggestions, setSuggestions] = useState<Country[]>([]);
    const searchRef = useRef(null);
    const { setCountries, setError } = useCountries() as { setCountries: (val: Country[]) => void, setError: (err: string) => void };
    const { setVisibleCount } = useCount() as { setVisibleCount: (c: number) => void };

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
            if (Array.isArray(results)) {
                setSuggestions(results);
            }
        }
    }

    const dSearch = debouncer(handleChange, 500);

    const goToSearch = (elem: HTMLDivElement) => {
        const value = elem.dataset?.value || '';
        if (value) {
            router.push(`/search/${value}`);
        };
    }

    async function fetchCountries(query: string) {
        setError('');
        if (query) {
            const results = await httpHelper(`/name/${query}`);
            if (typeof results === 'object' && results.status === 404) {
                setCountries([]);
                setError('No Results found. Try a different country');
            }
            if (Array.isArray(results)) {
                setCountries(results);
            }
        }
    };

    const submitForm = (e: FormEvent) => {
        const target = e.target as HTMLElement;
        const query = target.closest('input')?.value || '';
        if (page === 'index') {
            router.push(`/search?query=${query}`);
        } else if (page === 'search') {
            if (query) {
                fetchCountries(query);
                setVisibleCount(12); // Reset to show first 12 when searching
            }
        }
    }

    return (
        <div className="relative w-full">
            <Command className="bg-black/50 rounded-lg w-full text-white">
                <CommandInput
                    ref={searchRef}
                    placeholder="Search for a country..."
                    onValueChange={(val) => { dSearch(val); }}
                    autoFocus={focus}
                    aria-label="Search for a country"
                    aria-expanded={focus && suggestions?.length > 0}
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                    role="combobox"
                    onBlur={(e) => {
                        e.stopPropagation();
                        setTimeout(() => setFocus(false), 150);
                    }}
                    onFocus={(e) => { setFocus(true); e.stopPropagation() }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            submitForm(e);
                            setFocus(false);
                        }
                    }}
                    className={`
                    w-full rounded-lg px-4 py-2
                    text-white placeholder-white
                    transition
                    ${page === "index" ? "text-lg md:text-xl py-3 md:py-4" : "text-sm md:text-base"}
                `}
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