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
                    username: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    verified: user.emailVerified,
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
            console.log("User successfully logged out")
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
                    console.log("Successful login!")
                    setUser({
                        username: userObj.displayName,
                        email: userObj.email,
                        verified: userObj.emailVerified,
                        uid: userObj.uid,
                        fname: userObj.fname,
                        sname: userObj.sname
                    })
                    history.push("/")
                    resolve()
                })
                .catch(error => reject(error))
            }
            else {
                console.log("logging in with username")
                logInWithUsername(username, password)
                .then(userObj => {
                    console.log("Successful login!")
                    setUser({
                        username: userObj.displayName,
                        email: userObj.email,
                        verified: userObj.emailVerified,
                        uid: userObj.uid,
                        fname: userObj.fname,
                        sname: userObj.sname
                    })
                    history.push("/")
                    resolve()
                })
                .catch(error => {
                    console.log("ERROR LOGGING IN WITH USERNAME")
                    console.log(error)
                    reject(error)
                })
            }
        })
    }

    const userSignUp = (fname, sname, email, password, username) => {
        return new Promise((resolve, reject) => {
            firebaseRegister(fname, sname, email, password, username)
            .then((outcome) => {
              console.log("Registration complete: ", outcome)
              history.push("/SignUpComplete")
              resolve(outcome)
            })
            .catch((error) => {
                console.log("Error signing up")
                console.log(error)
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
