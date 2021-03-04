import React, { useContext, useState } from "react"

const UserContext = React.createContext();
const UserSetContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserSet() {
    return useContext(UserSetContext);
}

export default function UserProvider({ children }) {
    const [ user, setUser ] = useState(null);

    const updateUser = newUser => {
        console.log(`User updated`);
        console.log(newUser);
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={user}>
            <UserSetContext.Provider value={updateUser}>
                {children}
            </UserSetContext.Provider>
        </UserContext.Provider>
    )
}
