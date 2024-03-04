/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    // darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./common/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1920px',
          },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                // chalk : ['Fredericka the Great', "cursive"],
                greater : ['Roboto Slab', 'serif'],
                lesser : ['Inter', 'sans-serif'],
            },
            colors: {
                "blue-gray": {
                    900: "#282c31",
                    800: "#2f333a",
                    700: "#454b56",
                    600: "#4d545e",
                    500: "#5a626e",
                    400: "#737d8c",
                    300: "#858fa1",
                    200: "#98a5b9",
                    100: "#afbed7",
                    50: "#c2d2ec"
                },
                "algae-green": {
                    900: "#4b675b",
                    800: "#6D9886",
                    700: "#7ba996",
                    600: "#8ec9b0",
                    500: "#97d7bc",
                    400: "#9fe5c8",
                    300: "#a1e8cb",
                    200: "#a5f1d1",
                    100: "#a4f5d3",
                    50: "#a8fcd9"
                },
                "tan" : {
                    900: "#4b4842",
                    800: "#5e5a52",
                    700: "#6c6861",
                    600: "#837d74",
                    500: "#989186",
                    400: "#b4ac9f",
                    300: "#cbc1b2",
                    200: "#e1d7c6",
                    100: "#F2E7D5",
                    50: "#F2E7D5"
                },
                "super-gray" : {
                    900: "#1a1a1a",
                    800: "#2a2a2a",
                    700: "#3a3a3a",
                    600: "#4a4a4a",
                    500: "#5a5a5a",
                    400: "#6a6a6a",
                    300: "#7a7a7a",
                    200: "#8a8a8a",
                    100: "#9a9a9a",
                }
            },
            animation: {
                'text1':'text 3s ease infinite 0.1s alternate',
                'text2':'text 4s ease infinite 0.2s alternate',
                'text3':'text 3s ease infinite 0.3s alternate',
                'text4':'text 4s ease infinite 0.4s alternate',
                'text5':'text 5s ease infinite 0.5s alternate',
            },
            keyframes : {
                'text': {
                    '0%, 100%': {
                        'background-size':'200% 200%',
                        'background-position': 'left top'
                    },
                    '50%': {
                        'background-size':'200% 200%',
                        'background-position': 'right bottom'
                    }
                },
            },
        },
        
    },
    plugins: [
        require("daisyui"),
        require('@tailwindcss/forms'),
    ],
    daisyui: {
        themes: false,
    }
}