import { useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function Navbar({showNavBar}){
    const [hidden, setHidden] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setHidden(!showNavBar)

        console.log(hidden)
    }, [showNavBar])


    //Fixing bug with templates
    /*const params = useParams()

    useEffect(() => {

    }, [params])*/

    return(
        <>
            <div id='navbar' onMouseEnter={() => !showNavBar && setHidden(false)} onMouseLeave={() => !showNavBar && setHidden(true)}>
                <div id='stickyPart'>
                    <div onClick={() => navigate('/')} className={ `navbarItem ${window.location.pathname == '/' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/overview_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Overview</div>
                            
                        </a>
                    </div>

                    <div className={`dividingLine ${hidden ? 'hidden' : undefined}`} id='first'></div>

                    <div onClick={() => navigate('/pipelines')} className={`navbarItem ${window.location.pathname == '/pipelines' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}`}>
                        <div className={ `pointer ${window.location.pathname == '/pipelines' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/pipelines_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Pipelines</div>
                            
                        </a>
                    </div>
                    <div onClick={() => navigate('/templates')} className={ `navbarItem ${window.location.pathname == '/templates' ? ' pointed' : undefined} ${hidden && 'hidden'}` }>
                        <div className={ `pointer ${window.location.pathname == '/templates' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/templates_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Templates</div>
                            
                        </a>
                    </div>
                    <div onClick={() => navigate('/data_routes')} className={ `navbarItem ${window.location.pathname == '/data_routes' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/data_routes' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/data_routes_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Data Models</div>
                            
                        </a>
                    </div>
                    {/*<div className={ `navbarItem ${window.location.pathname == '/monitoring' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/monitoring' ? ' active' : undefined}` }></div>
                        <a onClick={() => navigate('/monitoring')} className='navbarItem'>
                            <img src="/navbar/monitoring_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Monitoring</div>
                            
                        </a>
                    </div>*/}

                    <div className={`dividingLine ${hidden ? 'hidden' : undefined}`}></div>

                    <div onClick={() => navigate('/new_pipeline')} className={ `navbarItem ${window.location.pathname == '/new_pipeline' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/new_pipeline' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/plus.svg" alt="" className='plus'/>
                            <img src="/navbar/pipelines_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>New Pipeline</div>
                            
                        </a>
                    </div>

                    <div onClick={() => navigate('/template?id=0')} className={ `navbarItem ${window.location.pathname == '/template' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/template' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/plus.svg" alt="" className='plus'/>
                            <img src="/navbar/templates_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>New Template</div>
                            
                        </a>
                    </div>

                    <div onClick={() => navigate('/route')} className={ `navbarItem ${window.location.pathname == '/route' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/route' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/plus.svg" alt="" className='plus'/>
                            <img src="/navbar/data_routes_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>New Data Model</div>
                        </a>
                    </div>

                    <div className={`dividingLine ${hidden ? 'hidden' : undefined}`}></div>

                    <div onClick={() => navigate('/settings')} className={ `navbarItem ${window.location.pathname == '/settings' ? ' pointed' : undefined} ${hidden ? 'hidden' : undefined}` }>
                        <div className={ `pointer ${window.location.pathname == '/settings' ? ' active' : undefined}` }></div>
                        <a className='navbarItem'>
                            <img src="/navbar/settings_icon.svg" alt="" />
                            <div className={hidden ? 'hidden' : undefined}>Settings</div>
                            
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}