import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyleLeft = {left : '0', top : '49%', width : '15%', height : '25%', border : 'none', background : 'none'}
const handleStyleRight = {right : '0', top : '49%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '12%', top : '-1%'}
const nodeLabel = {left : '30%', top : '85%'}

export default function ProcedureNode(){

    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='target' position={Position.Left} style={handleStyleLeft} />
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/ProcedureNode.svg' className='customNode' id='procedureNode'></img>
            <Handle type='source' position={Position.Right} style={handleStyleRight} />
            <div id='nodeLabel'>Worker</div>
        </>
    )
}