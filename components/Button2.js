import { Button } from "./Button";
import { useState } from "react";
import { useMyContext } from "../contexts/MyContext";
import Link from "next/link";

const ButtonDialog = ({ color, mt }) => {

    return (
        <Link href={'/data/vaani'}>
            <Button color={color} className={`mt-${mt}`}>
                Download Data
            </Button>
        </Link>
    );
};

export default ButtonDialog;
