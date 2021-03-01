import React, { useContext, useState } from "react"

const UserContext = React.createContext();
const UserToggleContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserToggle() {
    return useContext(UserToggleContext);
}

export default function UserProvider({ children }) {
    const [ user, setUser] = useState();

    const toggleUser = () => {
        if (user !== null) {
            setUser(null);
        }
        else {
            setUser();
        }
    }

    return (
        <UserContext.Provider value={user}>
            <UserToggleContext.Provider value={toggleUser}>
                {children}
            </UserToggleContext.Provider>
        </UserContext.Provider>
    )
}
