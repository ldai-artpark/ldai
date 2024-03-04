import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [popup, setPopUp] = useState(false);


    return (
        <MyContext.Provider
            value={{
                popup,
                setPopUp,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => {
    return useContext(MyContext);
};