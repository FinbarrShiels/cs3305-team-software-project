import React, { useContext, useState } from "react"

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [ user ] = useState(null);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
