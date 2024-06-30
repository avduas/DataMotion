import { useCallback, useContext } from 'react'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyle = {right : '0', top : '47%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '14%', top : '-1%'}

export default function InputNode(){

    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='source' position={Position.Right} style={handleStyle} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/InputNode.svg' className='customNode' id='inputNode'></img>
        </>
        
    )
}