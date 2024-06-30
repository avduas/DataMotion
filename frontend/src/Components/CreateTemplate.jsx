import { ReactFlowProvider } from 'reactflow'
import './CreateTemplate.css'
import TemplateDesigner from './ReactFlowComponents/TemplateDesigner'
import { useContext, useEffect, useMemo, useState } from 'react'

import InputNode from "./ReactFlowComponents/CustomNodes/InputNode";        //add new node component here
import ProcedureNode from "./ReactFlowComponents/CustomNodes/ProcedureNode";
import DeleteNode from "./ReactFlowComponents/CustomNodes/DeleteNode";
import MergeNode from "./ReactFlowComponents/CustomNodes/MergeNode";
import ConditionNode from "./ReactFlowComponents/CustomNodes/ConditionNode";
import StorageNode from "./ReactFlowComponents/CustomNodes/StorageNode";

import StreamNode from "./ReactFlowComponents/CustomNodes/StreamNode"       //Advanced
import AggregatorNode from "./ReactFlowComponents/CustomNodes/AggregatorNode"
import IteratorNode from "./ReactFlowComponents/CustomNodes/IteratorNode"
import ConnectorInNode from "./ReactFlowComponents/CustomNodes/ConnectorInNode"
import ConnectorOutNode from "./ReactFlowComponents/CustomNodes/ConnectorOutNode"

import { useNavigate, useSearchParams } from 'react-router-dom';
import { templateDesignCon } from '../scripts/templateDesign';
import { authContext } from '../Contexts/AuthContext';
import CodeInsertionModal from './ReactFlowComponents/Instruments/CodeInsertionModal';
import { nodeEditContext } from '../Contexts/NodeEditContext';



export default function CreateTemplate(){

    const nodeTypes = useMemo(() => ({
        customInputNode : InputNode,        //Basic
        customProcedureNode : ProcedureNode,
        customDeleteNode : DeleteNode,
        customMergeNode : MergeNode,
        customConditionNode : ConditionNode,
        customStorageNode : StorageNode,

        customStreamNode : StreamNode,      //Advanced
        customAggregatorNode : AggregatorNode,
        customIteratorNode : IteratorNode,
        customConnectorInNode : ConnectorInNode,
        customConnectorOutNode : ConnectorOutNode
    }), [])

    /////////////////////////////////////////
    useEffect(() => {   //may resolve bug
        localStorage.setItem('nodes', '[]')
    }, [])

    const {setNodeData, setOpenEdit, setCode, setShowInsertModal, setSelectedModel} = useContext(nodeEditContext)
    useEffect(() => {   //may resolve bug in situation when user opened node edit window before unloading page
        setNodeData({nodeId : 0, data : {}})
        setOpenEdit(false)
        setCode('')
        setShowInsertModal(false)
        setSelectedModel(-1)

        console.log('nodeEditContext reset')
    }, [])
    /////////////////////////////////////////

    const [templateName, setTemplateName] = useState('New Template')

    const [searchParams] = useSearchParams()
    const templateId = searchParams.get('id')

    //For log out

    const {setReqBody} = useContext(authContext)

    //For importing template
    const [importTemplate, setImportTemplate] = useState({})

    const navigate = useNavigate()

    async function getTemplateById(){
        const res = await templateDesignCon.getTemplate(templateId)

        res.logOut == true && setReqBody(res)   //sending json with logOut : true to App.js through context

        if(res.error != undefined || res.message != undefined){
            //////////////////////////////////////
            localStorage.setItem('nodes', '[]')    //may resolve bug
            //////////////////////////////////////
            navigate('/template?id=0')
            //alert(res.error)
        }

        setTemplateName(res.template_name)
        setImportTemplate(res)
        /////////////////////////
        console.log(res)
        /////////////////////////
    }
    useEffect(() => {
        if(templateId != 0){
            getTemplateById()
        }
    } ,[templateId])

    return(
        <>
            <div id="newTemplate">
                <div id="innerHeader">
                    <p>
                        <input type="text" maxLength={50} placeholder={templateId == 0 ? 'New Template' : importTemplate.template_name} onChange={(e) => setTemplateName(e.target.value)}/>
                    </p>
                </div>
                <div id='mainCont'>
                    <ReactFlowProvider>
                        <div id='designField'>
                            {<TemplateDesigner 
                                nodeTypes={nodeTypes} 
                                templateName={templateName} 
                                templateId={templateId} 
                                importTemplate={importTemplate}
                            />}
                        </div>
                    </ReactFlowProvider>
                    <CodeInsertionModal />
                </div>
            </div>
        </>
    )
}