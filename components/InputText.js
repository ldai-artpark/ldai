import React from "react";

function InputText({name, placeholder, unit, heading, value, onChange, inputProps}) {

    return (
        <div className="flex p-1 mt-2">
            <span className={`${heading === null ? "hidden" : "mr-2"}`}>{heading}</span>
            <input {...inputProps} value={value} name={name} placeholder={placeholder} className="input input-bordered input-sm w-full max-w-xs mr-2 text-black" onChange={onChange} />
            <p>{unit}</p>
        </div>
    )
}

export default InputText;