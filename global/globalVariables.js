import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("F0oRUehjZwXPgpWgxrsI5HI8UBT2");
    const [preloader, setPreloader] = useState(false);
    const [userInfo, setUserInfo] = useState({ image: null, first_name: "", last_name: "", email: "" });
    const [courses, setCourses] = useState([]);



    return (
        <AppContext.Provider value={{
            docID, setDocID,
            userUID, setUserUID,
            courses, setCourses,
            userInfo, setUserInfo,
            preloader, setPreloader,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }