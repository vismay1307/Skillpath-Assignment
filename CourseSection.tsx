import { useState, useEffect, useCallback, useMemo, useRef } from "react"

import { addPropertyControls, ControlType } from "framer"

import CourseCard from "./CourseCard.tsx"
import { fetchCourses, fetchCountry } from "./api.ts"

import {
    Course,
    CoursesStatus,
    CountryStatus,
    CoursesSectionProps,
    SortOption,
} from "./types.ts"

import { styles } from "./style.ts"

export default function CoursesSection({
    headingText = "Explore Our Courses",
    cardGap = 24,
}: CoursesSectionProps) {
    const [courses, setCourses] = useState<Course[]>([])

    const [coursesStatus, setCoursesStatus] = useState<CoursesStatus>("loading")

    const [countryCode, setCountryCode] = useState<string | null>(null)

    const [countryStatus, setCountryStatus] = useState<CountryStatus>("loading")

    const [searchTerm, setSearchTerm] = useState("")

    const [sortOption, setSortOption] = useState<SortOption>("default")

    // Reference to the actual CoursesSection element.
    // We use this to measure its real width.
    const sectionRef = useRef<HTMLElement | null>(null)

    // Number of columns shown in the course grid.
    const [columnCount, setColumnCount] = useState(3)

 
//course fetch , callback use kiya hai so har bar new function ref na create ho
    const loadCourses = useCallback(async () => {
        setCoursesStatus("loading")

        try {
            const data = await fetchCourses()

            setCourses(data)
            setCoursesStatus("success")
        } catch {
            setCoursesStatus("error")
        }
    }, [])



    const loadCountry = useCallback(async () => {
        setCountryStatus("loading")

        try {
            const data = await fetchCountry()

            setCountryCode(data.country_code)
            setCountryStatus("success")
        } catch {
            setCountryStatus("error")
        }
    }, [])

// initially first render + har re render pe api call karvayenge

    useEffect(() => {
        loadCourses()
        loadCountry()
    }, [loadCourses, loadCountry])

   
    // Responsive column calculation---mobile,laptop


    useEffect(() => {
        const element = sectionRef.current

        if (!element) return

        const updateColumns = (width: number) => {
            if (width <= 600) {
                setColumnCount(1)
            } else if (width <= 900) {
                setColumnCount(2)
            } else {
                setColumnCount(3)
            }
        }

        // Calculate columns immediately when component loads.
        updateColumns(element.getBoundingClientRect().width)

        // Watch the actual component width.
        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width

            if (width) {
                updateColumns(width)
            }
        })

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])



    const handleRetry = () => {
        loadCourses()
        loadCountry()
    }

  
// use memo use kiya hai,so that heavy calculation na ho jab tak inme se koi dependancy change nai ho jati 
    const visibleCourses = useMemo(() => {
        const search = searchTerm.trim().toLowerCase()

        let filteredCourses = courses

        if (search) {
            filteredCourses = courses.filter((course) => {
                return (
                    course.courseName.toLowerCase().includes(search) ||
                    course.description.toLowerCase().includes(search) ||
                    course.mainCategory.toLowerCase().includes(search)
                )
            })
        }

        if (sortOption === "lowToHigh") {
            return [...filteredCourses].sort((a, b) => {
                return (
                    getPriceValue(a, countryCode) -
                    getPriceValue(b, countryCode)
                )
            })
        }

        if (sortOption === "highToLow") {
            return [...filteredCourses].sort((a, b) => {
                return (
                    getPriceValue(b, countryCode) -
                    getPriceValue(a, countryCode)
                )
            })
        }

        return filteredCourses
    }, [courses, searchTerm, sortOption, countryCode])

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <section ref={sectionRef} style={styles.section}>
            <h2 style={styles.heading}>{headingText}</h2>

            {/* Search and Sort */}

            {coursesStatus === "success" && courses.length > 0 && (
                <div style={styles.controls}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search courses..."
                        style={styles.searchInput}
                    />

                    <select
                        value={sortOption}
                        onChange={(event) =>
                            setSortOption(event.target.value as SortOption)
                        }
                        style={styles.sortSelect}
                    >
                        <option value="default">Sort by</option>

                        <option value="lowToHigh">Price: Low to High</option>

                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>
            )}

            {/* Loading */}

            {coursesStatus === "loading" && (
                <p style={styles.message}>Loading courses...</p>
            )}

            {/* Error */}

            {coursesStatus === "error" && (
                <div style={styles.message}>
                    <p>Unable to load courses.</p>

                    <button style={styles.retryButton} onClick={handleRetry}>
                        Retry
                    </button>
                </div>
            )}

            {/* Empty API response */}

            {coursesStatus === "success" && courses.length === 0 && (
                <p style={styles.message}>No courses available right now.</p>
            )}

            {/* Search returned no results */}

            {coursesStatus === "success" &&
                courses.length > 0 &&
                visibleCourses.length === 0 && (
                    <p style={styles.message}>No courses match your search.</p>
                )}

            {/* Courses */}

            {coursesStatus === "success" && visibleCourses.length > 0 && (
                <div
                    style={{
                        ...styles.grid,
                        gap: cardGap,
                        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                    }}
                >
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.mangoId}
                            course={course}
                            countryCode={countryCode}
                            countryStatus={countryStatus}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}



function getPriceValue(course: Course, countryCode: string | null): number {
    if (countryCode === "IN") {
        return course.pricePaise
    }

    if (countryCode === "US") {
        return course.priceUsdCents
    }

    return Number.MAX_SAFE_INTEGER
}


// Framer Property Controls


addPropertyControls(CoursesSection, {
    headingText: {
        type: ControlType.String,
        title: "Heading Text",
        defaultValue: "Explore Our Courses",
    },

    cardGap: {
        type: ControlType.Number,
        title: "Card Gap",
        defaultValue: 24,
        min: 0,
        max: 64,
        step: 4,
        unit: "px",
    },
})
