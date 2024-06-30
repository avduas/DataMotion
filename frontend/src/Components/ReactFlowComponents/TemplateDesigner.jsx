import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, useViewport, useOnSelectionChange } from "reactflow";
import './TemplateDesigner.css'
import 'reactflow/dist/style.css'
import { useCallback, useState, useMemo, useEffect, useContext } from "react";
import ControlsNodes from "./CustomControls/ControlsNodes";
import { node } from "prop-types";
import { templateDesignCon } from "../../scripts/templateDesign";
import ControlsGlobal from "./CustomControls/ControlsGlobal";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import NodeEdit from "./Instruments/NodeEdit";
import { nodeEditContext } from "../../Contexts/NodeEditContext";

export default function TemplateDesigner({nodeTypes, templateName, templateId, importTemplate}){
    //Import current view position

    const { x, y, zoom } = useViewport()
    useEffect(
        () => {
            //console.log(x, y, zoom)
        }, [x, y, zoom]
    )

    //Nodes and edges
    const [nodes, setNodes] = useState((localStorage.nodes != undefined && templateId == 0 && localStorage.nodes != '[null]') ? JSON.parse(localStorage.nodes) : [])
    const [edges, setEdges] = useState((localStorage.edges != undefined && templateId == 0) ? JSON.parse(localStorage.edges) : [])

        //Importing nodes if user is observing saved template
        
    useEffect(() => {
        try{
            setNodes(JSON.parse(importTemplate.template_data.template_data.nodes))
            setEdges(JSON.parse(importTemplate.template_data.template_data.edges))

            console.log('run')
        }catch{}
    }, [importTemplate])

        //Cleaning up localstorage before user leaves page for refreshed by user page
    useBeforeUnload(
        () => {
            localStorage.removeItem('nodes')
            localStorage.removeItem('edges')
        }
    )
    /*useEffect(() => {       //making the same but in original logic of react-router-dom
        if(true){   //bug fix (but would reload page after saving new template)
            console.log('clear storage')
            setNodes([])
            setEdges([])
        }
    }, [templateId])*/

    //OnChange functions
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []
    )
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []
    )
    const onConnect = useCallback(
        (params) => {
            //const edge = { ...params, type : 'custom-edge'}
            setEdges((eds) => addEdge(params, eds))
        }, []
    )
    ////////////////////////////
    useEffect(() => {
        localStorage.setItem('nodes', JSON.stringify(nodes) )
        localStorage.setItem('edges', JSON.stringify(edges) )
    }, [nodes, edges])
    ////////////////////////////

    //PURGING CONTENT

    function purgeContent(){
        setNodes([])
        setEdges([])
    }

    //SAVING TEMPLATE (for the first time)

    const navigate = useNavigate()

    async function createTemplate(){        //ALSO SAVING CHANGES
        //////Bug Fix/////////////////////////
        const saveNodes = nodes
        try{
        saveNodes.forEach((e) => {
            e.selected = false
            e.dragging = false
            e.positionAbsolute = e.position
        })
        console.log('save', templateId, saveNodes)
        setNodes(saveNodes)}catch{}
        //////////////////////////////////////

        const res = await templateDesignCon.create({
            template_id : templateId,
            template_name : templateName,
            template_data : {
                nodes : JSON.stringify(saveNodes),
                edges : JSON.stringify(edges)
            }
        })
        ////////////////
        console.log( await res)
        ////////////////
        if(res.template_id){
            navigate(`/template?id=${res.template_id}`)
        }
    }

    //DELETING TEMPLATE

    async function deleteTemplate(){
        const res = await templateDesignCon.deleteTemplate(templateId)
        //////////////////
        console.log(res)
        //////////////////
        if(res.message == 'Template deleted successfully') {
            localStorage.removeItem('nodes')
            localStorage.removeItem('edges')
            navigate('/templates')
        }
    }

    //ADDING NEW NODE

    const [selectedNodes, setSelectedNodes] = useState([])

    //Blocks node creation funcs////////////////////////
    function inputNodeExists(type){
        try{
            console.log(-1 != nodes.findIndex((e) => e.type == 'customConnectorInNode'))

            if(type != 'customConnectorInNode' && type != 'customInputNode'){ return false }
            return (-1 != nodes.findIndex((e) => e.type == 'customConnectorInNode' || e.type == 'customInputNode'))
        }catch{
            return false
        }
    }
    ////////////////////////////////////////////////////

    useOnSelectionChange({
        onChange : ({nodes, edges}) => {
            setSelectedNodes(nodes.map((node) => node.id))
        }
    })
    //////////////////////////
    useEffect(() => console.log(selectedNodes), [selectedNodes])
    //////////////////////////

    function generateNodeId(){          //generating unique id, that hadn't been used
        const IDs = nodes.map((e) => parseInt(e.id))
        IDs.sort((a, b) => b - a)

        const newId = ((IDs[0] + 1) + '' )

        return (newId != 'NaN' ? newId : '1')
    }
    function generateNodePosition(){    //generating position for new node

        if(selectedNodes[0] == undefined){    //use to generate position according to the last selected node
            if(nodes.length == 0){    //use to generate position according to the last generated node
                return { x: 100, y: 100 }
            }else{
                const nodePos = (nodes[nodes.length - 1]).position

                return { x : nodePos.x + 105, y : nodePos.y + 105}
            }
        }else{
            console.log('position', nodes.find((e) => e.id == selectedNodes[0]).position)
            
            const nodePos = nodes.find((e) => e.id == selectedNodes[0]).position

            return  { x : nodePos.x + 105, y : nodePos.y + 105}
        }
    }

    function addNode(type){             //adding node
        if(inputNodeExists(type)){  //blocks node creation if there is already created node of certain type somewhere
            alert("You've already created maximum amount of the input nodes")
            return
        }
        /////////////////
        console.log(type, generateNodeId())
        /////////////////
        setNodes([...nodes, {
            id: generateNodeId(),
            position: generateNodePosition(),
            type: type,
            data: { description : '' }
        }])
    }

    function deleteSelectedNodes(){     //deletes selected nodes
        try{
            setNodes(
                nodes.filter((e) => selectedNodes.indexOf(e.id) == -1)
            )
        }catch{} 
    }

    //HANDLING NODE EDITION IN SPECIAL MENU

    const {nodeData, setNodeData} = useContext(nodeEditContext)

    useEffect(() => {   //sets nodeData on node selection
        try{
            let data = {}
            let nodeId = 0
            let type = ''
            if(selectedNodes[0] != undefined){      //defining invoked node (now, as you can see, it's last selected)
                nodeId = selectedNodes[0]
                let node = nodes.find((e) => e.id == selectedNodes[0])
                data = node.data
                type = node.type
            }
        setNodeData(
            {
                nodeId : parseInt(nodeId),
                data : data,
                type : type
            }
        )}catch{
            setNodeData(
                {
                    nodeId : 0,
                    data : {},
                    type : ''
                })
        }
    }, [selectedNodes])

    function editNodeData(){
        let nodeIndex = nodes.findIndex((e) => e.id == nodeData.nodeId)
        let node = nodes.find((e) => e.id == selectedNodes[0])
        //Data transformation and rewriting before array of nodes editing have to be there//
        try{node.data = nodeData.data}catch{}
        //////////////////////////////////////
        setNodes([
            ...nodes.slice(0, nodeIndex),
            node,
            ...nodes.slice(nodeIndex + 1)
        ])
    }

    useEffect(() => {       //Changing data in specific node
        nodeData.nodeId != 0 && editNodeData()
    }, [nodeData])

    /////////////////////////////////////////   setting selected model
    const {selectedModel, setSelectedModel} = useContext(nodeEditContext)

    useEffect(() => {
        try{
            if(nodes != []){
                const index = nodes.findIndex((e) => e.type == 'customConnectorInNode')
                setSelectedModel(nodes[index].data.data_model)
                console.log(index, nodes[index].data.data_model)
            }
        }catch{setSelectedModel(-1)}
    }, [nodes, selectedNodes])

    /////////////////////////////////////////

    return (
        <>
            <div id="flowField">
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    minZoom={0.2}
                    //defaultNodes={[]}
                    //defaultEdges={[]}
                >
                    <Background />
                    <Controls position="top-left" style={{top : '2em', left : '0.43em'}}/>

                    <ControlsGlobal createTemplate={createTemplate} deleteNodes={deleteSelectedNodes} purgeContent={purgeContent} />
                    <ControlsNodes addNode={ addNode }/>
                    
                    <NodeEdit />
                </ReactFlow>
            </div>
        </>
    )
}