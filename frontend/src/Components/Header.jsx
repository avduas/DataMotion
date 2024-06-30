import AccountMenu from './AccountInfo'
import './Header.css'
import { useState } from 'react'

export default function Header(){
    const [showAccount, setShowAccount] = useState(true)

    return(
        <>
            <div id="headerCont">
                <div id="companiesLogos">
                    <a href='https://www.ditomic.cloud/' target='_blank'>
                        <img id="ditomicLogo" src='/header/dit.png'></img>
                    </a>
                    <div id="verticalLine"></div>
                    <img id="companyLogo" src='/header/hashmal.png'></img>
                </div>

                <div id="userInterface">
                    <div id="contact">
                        <img src='/header/contact_icon.svg'></img>
                    </div>
                    <div id="notific">
                        <img src='/header/notific_icon.svg'></img>
                    </div>
                    <div id="wiki">
                        <img src='/header/wiki_icon.svg'></img>
                    </div>
                    <div id="else">
                        <img src='/header/options_icon.svg'></img>
                    </div>
                    <div id="userPic" onClick={() => setShowAccount(!showAccount)}>
                        <img src='/header/empty_acc_pic.svg'></img>
                    </div>
                </div>
            </div>
            <AccountMenu show={showAccount}/>
        </>
    )
}