"use client";

import React from 'react';
import {MoonIcon, SunIcon} from "@heroicons/react/outline";
import useTheme from "../hooks/useTheme";


const ThemeSelector = props => {

    const toggleTheme = useTheme();

    return (
        <button onClick={toggleTheme} className={"p-2"}>
            <span className="sr-only">Change Theme</span>
            <div className={""}>
                <div className={"dark:sr-only flex gap-2"}>
                    <span className={"sr-only"}>Dark</span>
                    <MoonIcon className="h-6 text-gray-400 fill-zinc-700" aria-hidden="true" />
                </div>
                <div className={"sr-only dark:not-sr-only flex gap-2"}>
                    <span className={"sr-only"}>Light</span>
                    <SunIcon className="h-6 text-gray-400 fill-white" aria-hidden="true" />
                </div>
            </div>
        </button>
    );
};

ThemeSelector.propTypes = {

};

export default ThemeSelector;
