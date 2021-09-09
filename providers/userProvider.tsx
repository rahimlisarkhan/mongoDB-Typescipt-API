import React, { createContext, useState, useContext, useEffect } from 'react'
import { getProfileInfo } from '../services/profile';
import { ProfileType, ResponseType } from '../interfaces/request.model';


const UserContext = createContext<any>({})


export const UserProvider = ({ children }) => {

    //setter
    const [user, setUser] = useState<ResponseType<ProfileType> | null>(null)
    const [auth, setAuth] = useState(false)
    const [text, setEditText] = useState('Welcome Dear')

    useEffect(() => { auth && userLoad() }, [auth])

    //getter
    const userLoad = async () => {
        const profileInfo = await getProfileInfo()
        setUser(profileInfo.data)
    }


    const contextAPI = {
        user,
        auth,
        userLoad,
        text,
        setEditText,
        setUser,
        setAuth
    }

    //return context api
    return (
        <UserContext.Provider value={contextAPI}>
            {children}
        </UserContext.Provider>
    )
}

//return store
export const userStore = () => useContext(UserContext)

