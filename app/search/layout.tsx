import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: "Xplore | Search",
    description: "Search for a country",
  };
export default function Layout ({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    );
};