import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../DataRoutes.css'

export default function DataRouteItem( {data, deleteRoute} ){
    const [showOptions, setShowOptions] = useState(false)
    const [showOptionsMenu, setShowOptionsMenu] = useState(false)

    const navigate = useNavigate()

    function dateParsing(raw){
        const date = new Date(raw)
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    //Images for routes
    const images = {    //may be disabled
        SQLDATABASE : '/dataRoutes/itemIcons/SQLStorage.png',
        APIGATEWAY : '/dataRoutes/itemIcons/APIGateway.png',
        FILESYSTEM : '/dataRoutes/itemIcons/FileSystem.png',
        GCS : '/dataRoutes/itemIcons/GCS.png',
        AWS : '/dataRoutes/itemIcons/AWS.png'
    }
    
    return(
        <>
            <div className='routeItem' onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => {setShowOptions(false); setShowOptionsMenu(false)}}>
                <div id='itemCont'>
                    <div id='numbOfElem'>
                        <img src={'/dataRoutes/itemIcons/DataRoutes.svg'}></img>
                    </div>
                    <div id='textCont'>
                        <div id='routeName'>
                            <div>{data.route_name}</div>
                        </div>
                        <div id='dividingLine'></div>
                        <div id='dateName'>
                            <div id='name'><span>Created by : </span>{`${data.first_name} ${data.last_name}`}</div>
                            <div id='date'><span>Last Modified : </span>{dateParsing(data.last_modified_at)}</div>
                        </div>
                    </div>
                    <button id='options'  className={showOptions ? 'active' : ''} onClick={() => setShowOptionsMenu(!showOptionsMenu)}>
                        <img src='/templates/Options.svg'></img>
                    </button>
                    <div id='optionsMenu' className={showOptionsMenu ? 'active' : ''}>
                        <div>
                            {/*<button onClick={() => navigate(`/route?id=${data.route_id}`)}>
                                <img src='/templates/Edit.svg'></img>
                                <span>Edit</span></button>
                            <div id='dividingLine'></div>*/}
                            <button onClick={() => navigate(`/new_pipeline?data_model_id=${data.route_id}`)}>
                                <img src='/templates/NewPipeline.svg'></img>
                                <span>New Pipeline</span></button>
                            <div id='dividingLine'></div>
                            <button onClick={() => deleteRoute(data.route_id)}>
                                <img src='/templates/Delete.svg'></img>
                                <span>Delete</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}