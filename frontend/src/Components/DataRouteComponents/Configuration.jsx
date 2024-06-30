import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../CreateDataRoute.css'

export default function Configuration({route, setRoute, routeName, setRouteName}){

    const [option, setOption] = useState('SQLDATABASE')

    //Inputs
    const [server, setServer] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [databaseName, setDatabaseName] = useState('')
    const [tableName, setTableName] = useState('')

    const options = [
        {img : '/dataRoutes/itemIcons/SQLStorage.png', route_source : 'SQLDATABASE', name : 'SQL Database'},
        {img : '/dataRoutes/itemIcons/APIGateway.png', route_source : 'APIGATEWAY', name : 'API Gateway'},
        {img : '/dataRoutes/itemIcons/FileSystem.png', route_source : 'FILESYSTEM', name : 'File System'},
        {img : '/dataRoutes/itemIcons/GCS.png', route_source : 'GCS', name : 'Google Cloud Storage'},
        {img : '/dataRoutes/itemIcons/AWS.png', route_source : 'AWS', name : 'Amazon Web Services'}
    ]

    //Create DataRoute

    function createRoute(){
        const json = route
        json.data_source ={
            server : server,
            user : user,
            password : password,
            databaseName : databaseName,
            tableName : tableName,
            type : option 
        }
        ///////////////////
        console.log('route', json)
        ///////////////////
    }

    //navigation
    const navigate = useNavigate()

    return(
        <>
            <p><div>{routeName}</div></p>
            <div id='dividingLine'></div>
            <div id='configCont'>
                <div id='firstStr'>
                    <p>Data Source:</p>
                </div>
                <div id='optCont'>
                    {options.map((e) => {
                            return(
                                <div key={e.route_source} id={e.route_source} onClick={() => setOption(e.route_source)} className={'option ' + (option == e.route_source ? 'active' : '')}>
                                    <img src={e.img}></img>
                                    <div>{e.name}</div>
                                </div>
                            )
                        })}
                </div>
                <div id='inputs'>
                    <div className='inputStr'>
                        <div>Server : </div>
                        <input type="text" maxLength={50} onChange={(e) => setServer(e.target.value)} defaultValue={server}></input>
                    </div>
                    <div className='inputStr'>
                        <div>User : </div>
                        <input type="text" maxLength={50} onChange={(e) => setUser(e.target.value)} defaultValue={user}></input>
                    </div>
                    <div className='inputStr'>
                        <div>Password : </div>
                        <input type="text" maxLength={50} onChange={(e) => setPassword(e.target.value)} defaultValue={password}></input>
                    </div>
                    <div className='inputStr'>
                        <div>Database Name : </div>
                        <input type="text" maxLength={50} onChange={(e) => setDatabaseName(e.target.value)} defaultValue={databaseName}></input>
                    </div>
                    <div className='inputStr'>
                        <div>Table Name : </div>
                        <input type="text" maxLength={50} onChange={(e) => setTableName(e.target.value)} defaultValue={tableName}></input>
                    </div>
                </div>
                
            </div>
            <div id='buttonCont'>
                    <button id='back' onClick={() =>  navigate('../revision')}>Back</button>
                    <button id='create' onClick={() =>  createRoute()}>Create</button>
            </div>
        </>
    )
}