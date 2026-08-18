import { Course, CountryStatus } from "./types.ts"

export function formatPrice(
    course: Course,
    countryCode: string | null,
    countryStatus: CountryStatus
): string {
    if (countryStatus !== "success" || countryCode === null) {
        return "Price unavailable"
    }

    if (countryCode === "IN") {
        const rupees = course.pricePaise / 100

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(rupees)
    }

    if (countryCode === "US") {
        const dollars = course.priceUsdCents / 100

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(dollars)
    }

    return "Price unavailable"
}
