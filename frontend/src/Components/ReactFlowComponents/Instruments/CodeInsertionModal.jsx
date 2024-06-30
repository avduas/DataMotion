import { useContext, useEffect, useState } from 'react'
import './CodeInsertionModal.css'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'

export default function CodeInsertionModal(){

    const {code, setCode, showInsertModal, setShowInsertModal} = useContext(nodeEditContext)

    const [textCode, setTextCode] = useState('')
    const [errMes, setErrMes] = useState('')

    useEffect(() => {
        try{code != '' ? setTextCode(code) : setTextCode('')
        }catch{}
    }, [code])

    const closeModal = () => {setShowInsertModal(false)}

    function insert(){
        try{
            setCode(textCode)
            setTextCode('')
            closeModal()
        }catch{closeModal()}
    }

    function onKey(e){    //closing on esc pressing
        e.keyCode == 27 && closeModal()
    }

    function modal(){
        return(
            <>
                <div id="modalBody" className='insertCode' onClick={() => {closeModal()}}></div>
                <div id="modal" className='insertCode' tabIndex='0' onKeyDown={(e) => onKey(e)}>
                    <p>Code Insertion :</p>
                    <div id='dividingLine'></div>
                    <textarea defaultValue={textCode} onChange={(e) => setTextCode(e.target.value)}></textarea>
                    <div id='errMes'>
                        <span>{errMes != '' && 'Error : '}</span>
                        <span id='mes'>{errMes}</span>
                    </div>
                    <div id='buttonCont'>
                        <button id='insert' onClick={() =>  {insert()}}>Insert</button>
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            {showInsertModal && modal()}
        </>
    )
}

