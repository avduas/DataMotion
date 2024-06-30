import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyle = {left : '0', top : '49%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '-3%', top : '-1%'}

export default function StorageNode(){
    
    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='target' position={Position.Left} style={handleStyle} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/StorageNode.svg' className='customNode' id='storageNode'></img>
        </>
    )
}