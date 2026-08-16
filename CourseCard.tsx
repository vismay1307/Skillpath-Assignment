import { Course, CountryStatus } from "./types.ts"
import { formatPrice } from "./price.ts"
import { styles } from "./style.ts"

interface CourseCardProps {
    course: Course
    countryCode: string | null
    countryStatus: CountryStatus
}

export default function CourseCard({
    course,
    countryCode,
    countryStatus,
}: CourseCardProps) {
    const price = formatPrice(course, countryCode, countryStatus)

    return (
        <div style={styles.card}>
            {course.refundable && <span style={styles.badge}>Refundable</span>}

            <h3 style={styles.courseName}>{course.courseName}</h3>

            <p style={styles.category}>{course.mainCategory}</p>

            <p style={styles.description}>{course.description}</p>

            <p style={styles.price}>{price}</p>
        </div>
    )
}
