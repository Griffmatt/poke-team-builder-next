/** @type {import('tailwindcss').Config} */
module.exports = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#c7d2fe',
                secondary: '#6366f1',
                light: '#f5f5f5',
                'light-2': '#e5e5e5',
                'light-3': '#d4d4d4',
                dark: '#171717',
                'dark-2': '#262626',
                'dark-3': '#404040',
                error: '#dc2626',
            },
        },
    },
    plugins: [],
}
