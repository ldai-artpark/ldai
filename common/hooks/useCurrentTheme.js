import {useEffect, useState} from "react";

const useCurrentTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.classList.contains('dark') ? setTheme('dark') : setTheme('light');

        const mo = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    document.documentElement.classList.contains('dark') ? setTheme('dark') : setTheme('light');
                }
            });
        });

        mo.observe(document.documentElement, {attributes: true});

        return () => {
            mo.disconnect();
        }


    }, []);

    return theme;
}

export default useCurrentTheme;