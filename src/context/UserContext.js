import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Logout, firebaseRegularLogIn, firebaseRegister, authSubscribe, getUserByUid, logInWithUsername } from "../firebaseFunctions/auth"

const UserContext = React.createContext()
const UserLoginContext = React.createContext()
const UserLogOutContext = React.createContext()
const UserSignUpContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function useUserLogin() {
    return useContext(UserLoginContext)
}

export function useUserLogOut() {
    return useContext(UserLogOutContext)
}

export function useUserSignUp() {
    return useContext(UserSignUpContext)
}

export default function UserProvider({ children }) {

    const [ user, setUser ] = useState(null)
    const history = useHistory()

    useEffect(() => {
        authSubscribe(firebaseUserUpdate)
        console.log("User context refresh")
    }, [])

    const firebaseUserUpdate = (newUser) => {
        updateUser(newUser)
        console.log("Firebase User Update:", newUser)
    }

    const updateUser = (newUser) => {
        console.log("Updating user to:", newUser)
        if (newUser !== null) {
            getUserByUid(newUser.uid)
            .then(userInfo => {
                console.log("New User's Firestore Information:", userInfo)
                let updatedUser = {
                    uid: newUser.uid,
                    verified: newUser.emailVerified,
                    email: newUser.email,
                    username: userInfo.username,
                    fname: userInfo.fname,
                    sname: userInfo.sname,
                    bio: userInfo.bio
                }
                console.log("UPDATED USER:", updatedUser)
                setUser(updatedUser)
            })
            .catch(error => {
                console.log("Error updating user:", error)
                setUser({
                    ...newUser,
                    verified: newUser.emailVerified
                })
            })
        }
    }

    useEffect(() => {
        console.log("User information changed:", user)
    }, [ user ])

    const userLogOut = () => {
        Logout()
        .then(() => {
            setUser(null)
            history.push("/login")
        })
        .catch(error => {
            console.log("Error logging out of firebase: ", error)
        })
    }

    const userLogIn = (username, password) => {
        return new Promise((resolve, reject) => {
            if (username.includes('@')) {
                firebaseRegularLogIn(username, password)
                .then(userObj => {
                    resolve(true)
                })
                .catch(error => reject(error))
            }
            else {
                logInWithUsername(username, password)
                .then(userObj => {
                    resolve(true)
                })
                .catch(error => reject(error))
            }
        })
    }

    const userSignUp = (fname, sname, email, password, username) => {
        return new Promise((resolve, reject) => {
            firebaseRegister(fname, sname, email, password, username)
            .then((outcome) => {
                resolve(outcome)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    return (
        <UserContext.Provider value={user}>
        <UserLoginContext.Provider value={userLogIn}>
        <UserLogOutContext.Provider value={userLogOut}>
        <UserSignUpContext.Provider value={userSignUp}>
            {children}
        </UserSignUpContext.Provider>
        </UserLogOutContext.Provider>
        </UserLoginContext.Provider>
        </UserContext.Provider>
    )
}
