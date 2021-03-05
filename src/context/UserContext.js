import React, { useContext, useState } from "react"
import { Logout } from "../firebaseFunctions/auth";

const UserContext = React.createContext();
const UserSetContext = React.createContext();
const UserLogOutContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserSet() {
    return useContext(UserSetContext);
}

export function useUserLogOut() {
    return useContext(UserLogOutContext);
}

export default function UserProvider({ children }) {
    const [ user, setUser ] = useState(null);

    const userLogOut = () => {
        Logout()
        .then(() => {
            setUser(null);
            console.log("User successfully logged out")
        })
        .catch(error => {
            console.log("Error logging out of firebase: ", error);
        })
    }

    return (
        <UserContext.Provider value={user}>
        <UserSetContext.Provider value={setUser}>
        <UserLogOutContext.Provider value={userLogOut}>
            {children}
        </UserLogOutContext.Provider>
        </UserSetContext.Provider>
        </UserContext.Provider>
    )
}
