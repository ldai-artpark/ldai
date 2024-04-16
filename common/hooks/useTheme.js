import useLocalStorage from "./useLocalStorage";
import {useEffect} from "react";

const useTheme = ({autoThemeChangeDetect } = {autoThemeChangeDetect:true}) => {
    const [currentTheme, setCurrentTheme] = useLocalStorage("theme", "dark");


    const toggleTheme = () => {
        if (currentTheme === "dark") {
            setCurrentTheme("light");
        } else {
            setCurrentTheme("dark");
        }
    }

    useEffect(() => {

        const switchTheme = (currentTheme) => {
            if(currentTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

        }

        const handleThemeChange = event => {
            const newColorScheme = event.matches ? "dark" : "light";
            setCurrentTheme(newColorScheme);
            switchTheme(newColorScheme);
        };

        if(autoThemeChangeDetect) {
            typeof window !== "undefined" &&
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
        }

        switchTheme(currentTheme);

        return () => {
            if(autoThemeChangeDetect) {
                typeof window !== "undefined" &&
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
            }
        }

    }, [currentTheme, autoThemeChangeDetect])

    // useEffect(() => {
    //     if(!localStorage.getItem("theme")) {
    //         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //             setCurrentTheme("dark");
    //             document.documentElement.classList.add("dark");
    //         } else {
    //             setCurrentTheme("light");
    //             document.documentElement.classList.remove("dark");
    //         }
    //     }
    //
    //     return () => {
    //         window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    //     }
    // }, []);

    return toggleTheme;
}

export default useTheme;




