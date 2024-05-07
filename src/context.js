import { createContext, useState } from "react";

export const myContext = createContext();

function PostProvider({ children }) {
    const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem("language") || "english");
    const [isUser, setIsUser] = useState(false);

    const exportedData = {
        selectedLanguage,
        setSelectedLanguage,
        isUser,
        setIsUser
    }

    return (
        <myContext.Provider value={exportedData}>
            {children}
        </myContext.Provider>
    )
}

export default PostProvider