import type { Country } from "@/types/country";
import { create } from "zustand";

// const useSearch = create((set) => ({
//     query: '',
//     setQuery: (query: string) => set({ query: query }),
// }))

const useCountries = create((set) => ({
    countries: [],
    error: '',
    setCountries: (country: Country[]) => set({ countries: country}),
    setError: (error: string) => set({ error: error }),
}));

const useCount = create((set) => ({
    visibleCount: 12,
    setVisibleCount: (count: number) => set({ visibleCount: count }),
}));

// export default useSearch;
export { useCountries, useCount };