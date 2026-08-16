import { CSSProperties } from "react"

export const styles: Record<string, CSSProperties> = {
    section: {
        width: "100%",
        padding: "60px 40px",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
    },

    heading: {
        fontSize: 32,
        fontWeight: 700,
        margin: "0 0 24px 0",
        color: "#111111",
    },

    controls: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 32,
    },

    searchInput: {
        flex: 1,
        minWidth: 0,
        padding: "10px 14px",
        fontSize: 14,
        border: "1px solid #D9D9D9",
        borderRadius: 8,
        outline: "none",
        boxSizing: "border-box",
    },

    sortSelect: {
        padding: "10px 14px",
        fontSize: 14,
        border: "1px solid #D9D9D9",
        borderRadius: 8,
        background: "#FFFFFF",
        cursor: "pointer",
    },

    message: {
        fontSize: 16,
        color: "#555555",
    },

    retryButton: {
        marginTop: 12,
        padding: "8px 20px",
        fontSize: 14,
        border: "1px solid #111111",
        borderRadius: 6,
        background: "#FFFFFF",
        cursor: "pointer",
    },

    grid: {
        display: "grid",

        width: "100%",
    },

    card: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        border: "1px solid #E2E2E2",
        borderRadius: 12,
        padding: 24,
        backgroundColor: "#FAFAFA",
        position: "relative",
        boxSizing: "border-box",
    },

    badge: {
        alignSelf: "flex-start",
        fontSize: 12,
        fontWeight: 600,
        color: "#1A7F37",
        background: "#E6F4EA",
        padding: "2px 10px",
        borderRadius: 999,
        marginBottom: 4,
    },

    courseName: {
        fontSize: 18,
        fontWeight: 700,
        margin: 0,
        color: "#111111",
    },

    category: {
        fontSize: 13,
        fontWeight: 500,
        margin: 0,
        color: "#7A7A7A",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    description: {
        fontSize: 14,
        lineHeight: "20px",
        color: "#444444",
        margin: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },

    price: {
        fontSize: 16,
        fontWeight: 700,
        color: "#111111",
        margin: "8px 0 0 0",
    },
}
