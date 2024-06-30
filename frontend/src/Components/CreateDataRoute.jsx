import './CreateDataRoute.css'

import { useContext, useEffect, useMemo, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext';
import Insertion from './DataRouteComponents/Insertion';
import Revision from './DataRouteComponents/Revision';
import Configuration from './DataRouteComponents/Configuration';

export default function CreateDataRoute(){

    const [routeName, setRouteName] = useState('New Data Model')
    const [sample, setSample] = useState('')    //stores original json, inserted by user on first page
    const [route, setRoute] = useState({})  //contains data route, that would be sent to the server

    return(
        <>
            <div id="newDataRoute">
                <div id="innerHeader">
                    <p>New Data Model</p>
                </div>
                <div id='mainCont'>
                    <div id='routeCont'>
                        <Routes>
                            <Route index element={<Insertion route={route} setRoute={setRoute} routeName={routeName} setRouteName={setRouteName} sample={sample} setSample={setSample}/>}/>
                            <Route path='revision' element={<Revision route={route} setRoute={setRoute} routeName={routeName} setRouteName={setRouteName} sample={sample}/>}/>
                            {/*<Route path='configuration' element={<Configuration route={route} setRoute={setRoute} routeName={routeName} setRouteName={setRouteName} />}/>*/}
                        </Routes>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}