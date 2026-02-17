/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#6c1e1e",
                "accent-gold": "#C6A75E",
                "ivory": "#F8F4E3",
                "background-light": "#f8f6f6",
                "background-dark": "#1f1313",
            },
            fontFamily: {
                "display": ["'Noto Serif'", "serif"],
                "sans": ["'Noto Sans'", "sans-serif"]
            },
        },
    },
    plugins: [],
}
