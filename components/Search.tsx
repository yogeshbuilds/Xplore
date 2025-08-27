'use client'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useState } from "react";

export default function Search() {
    const [suggestions, setSuggestions] = useState<boolean>(false);
    return (
        <Command className="bg-black/50 rounded-lg w-full text-white">
            <CommandInput placeholder="Serach for a country..." />
            {suggestions && (
                <CommandList className="bg-white">
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    )
}