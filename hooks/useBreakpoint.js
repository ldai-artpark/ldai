import { useState, useEffect } from "react";
import { theme } from '../tailwind.config';

const useBreakpoint = () => {
    const [width, setWidth] = useState(1200);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
       return () => {
        window.removeEventListener('resize', handleResize);
       }
    } , []);

    const breakpoint = Object.keys(theme.screens).find((key) => {
        return width <= Number(theme.screens[key].slice(0, -2)) ? key : null;
    })

    return [breakpoint, width];
}

export default useBreakpoint;