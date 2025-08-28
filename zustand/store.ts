import { create } from "zustand";

const useSearch = create((set) => ({
    query: '',
    setQuery: (query: string) => set({ query: query }),
}))

export default useSearch;