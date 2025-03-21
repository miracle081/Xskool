import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [doc, setDoc] = useState("");
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("F0oRUehjZwXPgpWgxrsI5HI8UBT2");
    const [account, setAccount] = useState({});
    const [preloader, setPreloader] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState({ image: null, first_name: "", last_name: "", email: "" });


    return (
        <AppContext.Provider value={{
            doc, setDoc,
            posts, setPosts,
            docID, setDocID,
            account, setAccount,
            userUID, setUserUID,
            userInfo, setUserInfo,
            preloader, setPreloader,

            // Funtions
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }