import { createContext, useState } from "react";

export const myContext = createContext();

function PostProvider({ children }) {
    const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem("language") || "english");

    const exportedData = {
        selectedLanguage,
        setSelectedLanguage
    }

    return (
        <myContext.Provider value={exportedData}>
            {children}
        </myContext.Provider>
    )
}

export default PostProvider