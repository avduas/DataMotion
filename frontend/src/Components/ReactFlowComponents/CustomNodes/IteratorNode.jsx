import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyleLeft = {left : '0', top : '49%', width : '15%', height : '25%', border : 'none', background : 'none'}
const handleStyleRight = {right : '0', top : '49%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '12%', top : '-1%'}

export default function IteratorNode(){
    
    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='target' position={Position.Left} style={handleStyleLeft} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/IteratorNode.svg' className='customNode' id='iteratorNode'></img>
            <Handle type='source' position={Position.Right} style={handleStyleRight} />
            <div id='nodeLabel'>Iterator</div>
        </>
    )
}