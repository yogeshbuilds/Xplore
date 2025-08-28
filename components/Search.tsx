'use client'

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { debouncer, httpHelper } from "@/lib/utils";
import { useRouter } from 'next/navigation'

export interface Country {
    name: {
        official: string;
    };
    flags: {
        png: string,
        alt: string
    }
}

export default function Search() {
    const [suggestions, setSuggestions] = useState<Country[]>([]);
    const searchRef = useRef(null);
    const [blur, setBlur] = useState(false);
    const router = useRouter();
    const [inputVal, setInputVal] = useState('');

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

    const goToSearch = (elem: HTMLDivElement) => {
        const value = elem.dataset?.value || '';
        if (value) {
            // go to coutry details page
        };
    }

    const submitForm = (e: FormEvent) => {
        e.preventDefault()
        router.push(`/search?query=${inputVal}`);
    }

    return (
        <Command className="bg-black/50 rounded-lg w-full text-white">
            <CommandInput
                ref={searchRef}
                value={inputVal}
                placeholder="Serach for a country..."
                onChangeCapture={(e) => { setInputVal((e.target as HTMLInputElement).value); dSearch((e.target as HTMLInputElement).value); }}
                onBlur={() => setBlur(true)}
                onFocus={() => setBlur(false)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submitForm(e);
                    }
                }}
            />
            {(suggestions?.length > 0 && !blur) && (
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