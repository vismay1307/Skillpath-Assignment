export interface Course {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

export type CoursesStatus = "loading" | "error" | "success"

export type CountryStatus = "loading" | "error" | "success"

export type SortOption = "default" | "lowToHigh" | "highToLow"

export interface CountryResponse {
    country_code: string
}

export interface CoursesSectionProps {
    headingText: string
    cardGap: number
}
