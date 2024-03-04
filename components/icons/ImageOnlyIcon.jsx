import * as React from "react"

const ImageOnlyIcon = (props) => (
    <svg
        width={140}
        height={140}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x={1}
            y={1}
            width={138}
            height={138}
            rx={16}
            stroke="#4842ff"
            strokeWidth={2}
        />
        <path fill="#4842ff" d="M13 20h115v106H13z" />
        <g fill="#fff">
            <path d="M63.561 71.5c1.277 0 2.313-1.007 2.313-2.25S64.838 67 63.56 67c-1.277 0-2.313 1.007-2.313 2.25s1.036 2.25 2.313 2.25ZM68.186 76l-2.313-3-4.625 6h18.5l-6.937-9-4.625 6Z" />
            <path d="M82.832 61H58.165c-1.7 0-3.083 1.346-3.083 3v18c0 1.654 1.383 3 3.083 3h24.667c1.7 0 3.083-1.346 3.083-3V64c0-1.654-1.383-3-3.083-3ZM58.165 82V64h24.667l.003 18h-24.67Z" />
        </g>
    </svg>
)

export default ImageOnlyIcon
