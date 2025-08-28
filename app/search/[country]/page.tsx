"use client"

import { useParams } from "next/navigation";

const CountryDetails = () => {
    const { country } = useParams<{ country: string }>();
    const countryName = decodeURIComponent(
        Array.isArray(country) ? country[0] : country
    );

    return (
        <div>
            <h2>Country Details: {countryName}</h2>
        </div>
    );
};

export default CountryDetails;