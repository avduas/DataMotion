import { useCallback, useContext } from 'react'
import './CustomNodes.css'
import { Handle, Position } from 'reactflow'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

const handleStyleLeftTop = {left : '2%', top : '13%', width : '18.5%', height : '23.5%', border : 'none', background : 'none'}
const handleStyleLeftBottom = {left : '2%', top : '81%', width : '18.5%', height : '23.5%', border : 'none', background : 'none'}
const handleStyleRight = {right : '0', top : '50%', width : '15%', height : '25%', border : 'none', background : 'none'}

const editStyle = {right : '5%', top : '-18%'}

export default function MergeNode(){

    const { openEdit, setOpenEdit} = useContext(nodeEditContext)

    return(
        <>
            <Handle type='target' position={Position.Left} style={handleStyleLeftTop} id='a'/>
            <Handle type='target' position={Position.Left} style={handleStyleLeftBottom} id='b'/>
            <img src='/templateDesigner/svg/Edit.svg' className='editButton' onClick={() => setOpenEdit(!openEdit)} style={editStyle}></img>
            <img src='/templateDesigner/svg/MergeNode.svg' className='customNode' id='mergeNode'></img>
            <Handle type='source' position={Position.Right} style={handleStyleRight} />
        </>
    )
}