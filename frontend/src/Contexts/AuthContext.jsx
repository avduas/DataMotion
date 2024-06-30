import { createContext, useState} from "react";

export const authContext = createContext(null)

export function AuthContext({children}){

    const [reqBody, setReqBody] = useState('')

    return(
        <>
            <authContext.Provider value = {{reqBody, setReqBody}}>
                {children}
            </authContext.Provider>
        </>
    )
}