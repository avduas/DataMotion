import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyleRightTop = {right : '2%', top : '13%', width : '18.5%', height : '23.5%', border : 'none', background : 'none'}
const handleStyleRightBottom = {right : '2%', top : '81%', width : '18.5%', height : '23.5%', border : 'none', background : 'none'}
const handleStyleLeft = {left : '0', top : '50%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '0%', top : '-18%'}

export default function ConditionNode(){
    
    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='target' position={Position.Left} style={handleStyleLeft} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/ConditionNode.svg' className='customNode' id='conditionNode'></img>
            <Handle type='source' position={Position.Right} style={handleStyleRightTop} id='a'/>
            <Handle type='source' position={Position.Right} style={handleStyleRightBottom} id='b'/>
        </>
    )
}