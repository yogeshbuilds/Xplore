import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debouncer = (func: (v: string) => void, time: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (value: string) => {
    if (timeout) {
		clearTimeout(timeout);
	}
    timeout = setTimeout(() => {
      func(value)
    }, time)
  }
};

export const httpHelper = async (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = baseUrl + endpoint;
  const result =  await fetch(url);
  const data = await result.json();
  return data;
}
