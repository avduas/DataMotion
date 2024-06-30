import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'


const handleStyle = {right : '0', top : '47%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '14%', top : '-1%'}

import './CustomNodes.css'

export default function ConnectorInNode(){

    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='source' position={Position.Right} style={handleStyle} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/ConnectorInNode.svg' className='customNode' id='connectorInNode'></img>
            <div id='nodeLabel'>Connector-In</div>
        </>
        
    )
}