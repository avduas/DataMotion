import {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext'
import './DataRoutes.css'
import DataRouteItem from './Page Items/DataRouteItem'
import { DataRoutesCon } from '../scripts/dataRoutes'

export default function DataRoutes(){
    const [routes, setRoutes] = useState([])

    //For log out

    const {setReqBody} = useContext(authContext)

    //For navigating to route design (TemplateCreate.jsx)

    const navigate = useNavigate()

    //Uploading templates from the server

    async function getRoutes(){
        const res = await DataRoutesCon.getAllRoutes()    //That function is providing you routes from server

        ////DELETE ME AFTER YOU WOULD REVEAL PREVIOUS LINE OF CODE/////////
        /*const res = [       //use it as a hardcoded response from the server, feel free to change anything in it
            {
                route_id : 0,
                elements : 9,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                route_name : "Smart Meter Readings (Water)",
                route_source : 'SQLDATABASE'
            },
            {
                route_id : 1,
                elements : 14,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                route_name : "IOT Online Commands",
                route_source : 'APIGATEWAY'
            },
            {
                route_id : 2,
                elements : 8,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                route_name : "Smart Device Network Metrics",
                route_source : 'FILESYSTEM'
            },
            {
                route_id : 3,
                elements : 8,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                route_name : "IOT Device Network Registration",
                route_source : 'GCS'
            },
            {
                route_id : 4,
                elements : 8,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                route_name : "Smart Meter Readings w/Consumption",
                route_source : 'AWS'
            }
        ]*/
        ///////////////////////////////////////////////////////////////////

        res.logOut == true && setReqBody(res)   //sending json with logOut : true to App.js through context, it would made all that needed

        Array.isArray(res) ? setRoutes(res) : console.log('err') /*alert('We are sorry, please, try later')*/
    }

    useEffect(() => {   //that hook is uploading templates in the first time or according to some dependencies you wish
        ////////////////////    //I highly recommend you to write console.log's in structures like that to visually distinguish them from the rest of the code
        console.log('first upload')
        ////////////////////
        getRoutes()
    }, [])
    useEffect(() => {   //that hook is handling interval updating. It content can be added to the previous useEffect if needed later
        let reloadTimer = setInterval(() => { //and then that hook is updating templates intervally
            ////////////////////
            console.log('interval-related upload')
            ////////////////////
            getRoutes()
        }, 60000);

        return () => clearTimeout(reloadTimer)
    }, [routes])

    //Internal functions (or whatever you want to write) starts here, except react states and things like useNavigate, you can set them in the first part, but, please, comment it like I do, making named separate code blocks

        // *I hope to see your code here soon :) , be sure to load it to particular branch we created

    //Deleting concrete route
    async function deleteRoute(routeId){
        const res = await DataRoutesCon.deleteRoute(routeId)  
        //////////////////
        console.log(res)
        //////////////////

        res.logOut == true && setReqBody(res)   //log out
        
        if(res.message == 'Data routes deleted successfully'){
            getRoutes()
        }else{
            if(res.error != undefined){
                //alert(res.error)
            }
            else{
                //alert('We are sorry, try again later')
            }
        }
    }


    //

    if(routes.length == undefined){return(//that piece of code suppose to provide some loader, if you want, you can associate it with some specific react state other than templates, but I don't really see any necessity in it
        <div id="dataRoutes">
            <div id="innerHeader">
                <p>Data Routes</p>
                <button onClick={() => navigate('/route')}>+ CREATE NEW</button>
            </div>
            <div id='mainCont'>
                <div></div>  {/*Here is that concrete loader. You don't see it now because of the hardcoded input*/}
            </div>
        </div>
    )}

    return(
        <>
            <div id="dataRoutes">
                <div id="innerHeader">
                    <p>Data Routes</p>
                    <button onClick={() => navigate('/route')}>+ CREATE NEW</button>
                </div>
                <div id='mainCont'>
                    <div id='routesCont'>{   //here is a flex/(whatever you want) container
                        routes.map((e) => 
                            <DataRouteItem data={e} key={e.route_id} deleteRoute={deleteRoute}/>
                        )
                    }</div>
                </div>
            </div>
        </>
    )
}