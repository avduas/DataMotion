import {useState, useContext, useEffect} from 'react'
import { templateDesignCon } from '../scripts/templateDesign'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext'
import InputNode from './ReactFlowComponents/CustomNodes/InputNode'
import './Templates.css'
import TemplateItem from './Page Items/TemplateItem'


export default function Templates(){
    const [templates, setTemplates] = useState([])

    //For log out

    const {setReqBody} = useContext(authContext)

    //For navigating to template design (TemplateCreate.jsx)

    const navigate = useNavigate()

    //Uploading templates from the server

    async function getTemplates(){
        const res = await templateDesignCon.getAllTemplates()    //That function is providing you templates from server

        ////DELETE ME AFTER YOU WOULD REVEAL PREVIOUS LINE OF CODE/////////
        /*const res = [       //use it as a hardcoded response from the server, feel free to change anything in it
            {
                template_id : 0,
                elements : 9,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                template_name : "1st"
            },
            {
                template_id : 1,
                elements : 14,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                template_name : "2nd dgdgds fdffsdf fdsfsdfd fsdfsf"
            },
            {
                template_id : 2,
                elements : 8,
                first_name : "Ivan",
                last_modified_at : "2024-04-21T08:26:44.978Z",
                last_name : "Stepanov",
                template_name : "3rd dgdgds"
            },
            {
                template_id : 3,
            },
            {
                template_id : 0,
            },
            {
                template_id : 1,
            },
            {
                template_id : 2,
            },
            {
                template_id : 3,
            },
            {
                template_id : 0,
            },
            {
                template_id : 1,
            },
            {
                template_id : 2,
            },
            {
                template_id : 3,
            }, {
                template_id : 0,
            },
            {
                template_id : 1,
            },
            {
                template_id : 2,
            },
            {
                template_id : 3,
            }
        ]*/
        ///////////////////////////////////////////////////////////////////

        res.logOut == true && setReqBody(res)   //sending json with logOut : true to App.js through context, it would made all that needed

        Array.isArray(res) ? setTemplates(res) : console.log('err')//alert('We are sorry, please, try later')
    }

    useEffect(() => {   //that hook is uploading templates in the first time or according to some dependencies you wish
        ////////////////////    //I highly recommend you to write console.log's in structures like that to visually distinguish them from the rest of the code
        console.log('first upload')
        ////////////////////
        getTemplates()
    }, [])
    useEffect(() => {   //that hook is handling interval updating. It content can be added to the previous useEffect if needed later
        let reloadTimer = setInterval(() => { //and then that hook is updating templates intervally
            ////////////////////
            console.log('interval-related upload')
            ////////////////////
            getTemplates()
        }, 60000);

        return () => clearTimeout(reloadTimer)
    }, [templates])

    //Internal functions (or whatever you want to write) starts here, except react states and things like useNavigate, you can set them in the first part, but, please, comment it like I do, making named separate code blocks

        // *I hope to see your code here soon :) , be sure to load it to particular branch we created

    //Deleting concrete template
    async function deleteTemplate(templateId){
        const res = await templateDesignCon.deleteTemplate(templateId)  
        //////////////////
        console.log(res)
        //////////////////

        res.logOut == true && setReqBody(res)   //log out
        
        if(res.message == 'Template deleted successfully'){
            getTemplates()
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

    if(templates.length == undefined){return(//that piece of code suppose to provide some loader, if you want, you can associate it with some specific react state other than templates, but I don't really see any necessity in it
        <div id="templates">
            <div id="innerHeader">
                <p>Templates</p>
            </div>
            <div id='mainCont'>
                <div></div>  {/*Here is that concrete loader. You don't see it now because of the hardcoded input*/}
            </div>
        </div>
    )}

    return(
        <>
            <div id="templates">
                <div id="innerHeader">
                    <p>Templates</p>
                    <button onClick={() => navigate('/template?id=0')}>+ CREATE NEW</button>
                </div>
                <div id='mainCont'>
                    <div id='templatesCont'>{   //here is a flex/(whatever you want) container
                        templates.map((e) => 
                            <TemplateItem data={e} key={e.template_id} deleteTemplate={deleteTemplate}/>
                        )
                    }</div>
                </div>
            </div>
        </>
    )
}