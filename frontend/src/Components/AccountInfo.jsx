import { authContext } from '../Contexts/AuthContext'
import './Header.css'
import { useContext, useState } from 'react'

export default function AccountMenu({show}){

    const { reqBody, setReqBody } = useContext(authContext)

    function logOut(){
        //////////////////// //delete after demo
        //localStorage.clear()
        //window.location.reload(false)
        ////////////////////
        setReqBody({ logOut : true })
    }

    return(
        <>
            <div id='accWindow' className={show && 'hidden'}>

                <button onClick={()=>{logOut()}}>Log Out</button>
            </div>
        </>
    )
}