import React from 'react';
import PropTypes from 'prop-types';
import {ScaleLoader} from "react-spinners";
import useCurrentTheme from "../common/hooks/useCurrentTheme";

const LoadingState = props => {

    const show = props.show === undefined ? true : props.show;

    const theme = useCurrentTheme();

    if(!show){
        return null;
    }

    return (
        <div className={"w-full h-full flex justify-center items-center p-5"}>
            <ScaleLoader color={theme === "dark" ? "#09c2c2" : "#4449ff"} size={40} aria-busy={true} aria-label={"Loading"} />
        </div>
    );
};

LoadingState.propTypes = {
    show: PropTypes.bool
};

export default LoadingState;