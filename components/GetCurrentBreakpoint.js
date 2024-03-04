import { theme } from '../tailwind.config';
import { useState, useEffect } from 'react';


function GetCurrentBreakpoints() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    } , []);

    const breakpoint = Object.keys(theme.screens).find((key) => {
        return width <= Number(theme.screens[key].slice(0, -2)) ? key : null;
    })   

    return breakpoint;
}

export default GetCurrentBreakpoints;
