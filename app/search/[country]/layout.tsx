import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: "Xplore | Country",
    description: "Details of Country",
};

export default function Layout ({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    );
};