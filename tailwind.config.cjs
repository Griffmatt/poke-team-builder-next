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
                primary: '#2F64C9',
                secondary: '#9030A4',
                light: '#EEEEEE',
                'light-secondary': '#DEDEDE',
                dark: '#222222',
                'dark-secondary': '#333333',
                error: 'red',
            },
        },
    },
    plugins: [],
}
