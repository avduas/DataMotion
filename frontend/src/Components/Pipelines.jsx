import { useState, useContext, useEffect, useRef } from 'react'
import { pipelineFetchObj } from '../scripts/pipelines'
import PipelineItem from './Page Items/PipelineItem'
import { authContext } from '../Contexts/AuthContext'
import { useBeforeUnload } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import './Pipelines.css'


export default function Pipelines() {
    const [pipelines, setPipelines] = useState([])
    const navigate = useNavigate()

    //For log out

    const { setReqBody } = useContext(authContext)

    //Uploading pipelines from the server

    async function getPipelines() {
        const res = await pipelineFetchObj.getAllPipelines()    //That function would provide you pipelines from server, when, of course, it would be ready


        ////DELETE ME AFTER YOU WOULD REVEAL PREVIOUS LINE OF CODE/////////

        ///////////////////////////////////////////////////////////////////

        res.logOut == true && setReqBody(res)   //sending json with logOut : true to App.js through context, it would made all that needed

        Array.isArray(res) ? setPipelines(res) : console.log('err') /*alert('We are sorry, please, try latter')*/
    }

    useEffect(() => {   //that hook is uploading pipelines in the first time or according to some dependencies you wish
        ////////////////////    //I highly recommend you to write console.log's in structures like that to visually distinguish them from the rest of the code
        console.log('first upload')
        ////////////////////
        getPipelines()
    }, [])
    useEffect(() => {   //that hook is handling interval updating. It content can be added to the previous useEffect if needed later
        let reloadTimer = setTimeout(() => { //and then that hook is updating pipelines intervally
            ////////////////////
            console.log('interval-related upload')
            ////////////////////
            getPipelines()
        }, 3600000);

        return () => clearTimeout(reloadTimer)
    }, [pipelines])

    //Internal functions (or whatever you want to write) starts here, except react states and things like useNavigate, you can set them in the first part, but, please, comment it like I do, making named separate code blocks

    // *I hope to see your code here soon :) , be sure to load it to particular branch we created



    //

    if (pipelines.length == 0) {
        return (//that piece of code suppose to provide some loader, if you want, you can associate it with some specific react state other than pipelines, but I don't really see any necessity in it
            <div id="pipelines">
                <div id="innerHeader">
                    <p>Pipelines</p>
                    <button onClick={() => navigate('/new_pipeline')}>+ CREATE NEW</button>
                </div>
                <div id='mainCont'>
                    <div></div>  {/*Here is that concrete loader, you don't see it now because of the hardcoded input*/}
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="pipelines">
                <div id="innerHeader">
                    <p>Pipelines</p>
                    <button onClick={() => navigate('/new_pipeline')}>+ CREATE NEW</button>
                </div>
                <div id='mainCont'>
                    <div id='pipelinesCont'>{   //here is a flex/(whatever you want) container
                        pipelines.map((e) =>
                            <PipelineItem data={e} key={e.id} name={e.name} />
                        )
                    }</div>
                </div>
            </div>
        </>
    )
}