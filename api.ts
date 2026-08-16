import { Course, CountryResponse } from "./types.ts"

const COURSES_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export async function fetchCourses(): Promise<Course[]> {
    const response = await fetch(COURSES_URL, {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Courses request failed")
    }

    const data: unknown = await response.json()

    if (!Array.isArray(data)) {
        throw new Error("Invalid courses response")
    }

    return data as Course[]
}

export async function fetchCountry(): Promise<CountryResponse> {
    const response = await fetch(COUNTRY_URL, {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Country request failed")
    }

    const data: unknown = await response.json()

    if (
        typeof data !== "object" ||
        data === null ||
        !("country_code" in data) ||
        typeof data.country_code !== "string"
    ) {
        throw new Error("Invalid country response")
    }

    return data as CountryResponse
}
