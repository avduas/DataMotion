import { useState, useEffect, useContext } from "react"
import { authenticationObj } from "../scripts/authentication"

import './LoginPage.css'

import { authContext } from '../Contexts/AuthContext'

export default function LoginPage({setIsLogged}){

    const { setReqBody }= useContext(authContext)

    const [keepSigned, setKeepSigned] = useState(false)
    //Variables for sign-in
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //For displaying errors
    const [emailErr, setEmailErr] = useState('')
    const [passErr, setPassErr] = useState('')
    //

    //Cheking password and email, displaying errors if needed
    const assertVar = {                 //regular expressions for inserted data
        email : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/.test(email),
        password : /^[0-9A-Z]+$/i.test(password)
    }

    const lengthCondition = {           //length conditions for inserted data
        emailLong : (email.length >= 200),
        passwordLong : (password.length >= 50),
        passwordShort : (password.length <= 5)
    }

    useEffect(() => {setEmailErr(
        (!(assertVar.email || email == '') ? 'Invalid email\n' : '')
        + ((lengthCondition.emailLong) ? 'Email adress must be shorter\n' : '')
    )}, [email])

    useEffect(() => {setPassErr(
        (!(assertVar.password || password === '') ? 'Invalid password\n' : '')
        + ((lengthCondition.passwordLong && password !== '') ? 'Password must be shorter\n' : '')
        + ((lengthCondition.passwordShort && password !== '') ? 'Password must be longer\n' : '')
    )}, [password])
    //

    async function login(){
        const res = await authenticationObj.login(
            {
                email : email,
                password : password
            }
        )
        //////////////////////
        console.log(res)
        //////////////////////
        if(res.error == undefined){
            setReqBody(await res[0])
        }else{
            //alert(res.error)
        }
    }
    function onEnter(e){    //logging user on enter pressed
        (passErr == '' && emailErr == '' && email != '' && password != '' && e.keyCode == 13) && login()
    }

    return(
        <> 
            <div id="loginSpace" onKeyDown={(e) => onEnter(e)}>
                <div id="loginTab">
                    <p id="loginHeader">Sign in</p>

                    <div id="inputField">
                        <p className="inputHeader">Email</p>
                        <input type="text" className = {emailErr != '' && 'err'} onChange={(e) => setEmail((e.target.value).trim())}></input>
                        <div className="errBox">{emailErr}</div>
                    </div>

                    <div id="inputField">
                        <p className="inputHeader">Password</p>
                        <input type="password" className = {passErr != '' && 'err'} onChange={(e) => setPassword(e.target.value)}></input>
                        <div className="errBox">{passErr}</div>
                    </div>

                    <div id="checkBox">
                        <label className="toggle-switch">
                            <input type="checkbox" onChange={() => setKeepSigned(!keepSigned)}/>
                            <div className="toggle-switch-background">
                                <div className="toggle-switch-handle"></div>
                            </div>
                        </label>
                        <div id="keep">Keep me sign-in</div>
                    </div>

                    <div className="buttonCont">
                        <button onClick={() => (passErr == '' && emailErr == '' && email != '' && password != '') && login()} id="signIn">Sign In</button>
                    </div>

                    {/*<div className="buttonCont">
                        <button id="createAcc">CREATE AN ACCOUNT</button>
                        </div>*/}

                    <div id="dividingLine"></div>

                    <a href="/" id="forgotPassword">Forgot password</a>
                </div>
            </div>

            <div id="extraSpace">
                <div></div>
            </div>
        </>
    )
}