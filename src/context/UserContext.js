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
    const [ allowUserUpdate, setAllowUserUpdate ] = useState(true)

    useEffect(() => {
        authSubscribe(setUser)
    }, [])

    useEffect(() => {
        if (user && allowUserUpdate) {
            getUserByUid(user.uid)
            .then(userInfo => {
                setUser({
                    uid: user.uid,
                    verified: user.emailVerified,
                    email: userInfo.email,
                    username: userInfo.username,
                    fname: userInfo.fname,
                    sname: userInfo.sname,
                    bio: userInfo.bio
                })
            })
            setAllowUserUpdate(false)
        }
    }, [ user, allowUserUpdate ])

    const history = useHistory()

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

    const afterSuccessfulLogin = (userObj) => {
        setUser({
            username: userObj.username,
            email: userObj.email,
            verified: userObj.verified,
            uid: userObj.uid,
            fname: userObj.fname,
            sname: userObj.sname
        })
        return true
    }

    const userLogIn = (username, password) => {
        return new Promise((resolve, reject) => {
            if (username.includes('@')) {
                firebaseRegularLogIn(username, password)
                .then(userObj => {
                    resolve(afterSuccessfulLogin(userObj))
                })
                .catch(error => reject(error))
            }
            else {
                logInWithUsername(username, password)
                .then(userObj => {
                    resolve(afterSuccessfulLogin(userObj))
                })
                .catch(error => reject(error))
            }
        })
    }

    const userSignUp = (fname, sname, email, password, username) => {
        return new Promise((resolve, reject) => {
            firebaseRegister(fname, sname, email, password, username)
            .then((outcome) => {
                setAllowUserUpdate(true)
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
