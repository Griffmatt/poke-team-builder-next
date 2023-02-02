/** @type {import('tailwindcss').Config} */
module.exports = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#0284c7",
                secondary: "#6366f1",
                gray: "#d1d5db",
                "gray-2": "#a1a1aa",
                light: "#f5f5f5",
                favorited: "#eab308",
                "light-2": "#e5e5e5",
                "light-3": "#d4d4d4",
                dark: "#0f172a",
                "dark-2": "#1e293b",
                "dark-3": "#374151",
                "dark-4": "#3f3f46",
                att: "#ea580c",
                hp: "#e11d48",
                def: "#1d4ed8",
                spa: "#dc2626",
                spd: "#a21caf",
                spe: "#16a34a",
            },
        },
    },
    plugins: [],
}
