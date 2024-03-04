import { Button } from "./Button";
import { useState } from "react";
import {useMyContext} from "../contexts/MyContext";

const ButtonDialog = ({ color, mt}) => {
    const {popup, setPopUp} = useMyContext();
    return (
        <Button color={color} className={`mt-${mt}`}
                onClick={() => setPopUp(true)}
        >
            Download Data
        </Button>
    );
};

export default ButtonDialog;
