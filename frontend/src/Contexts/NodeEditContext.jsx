import { createContext, useState} from "react";

export const nodeEditContext = createContext(null)

export function NodeEditContext({children}){

    const [nodeData, setNodeData] = useState({nodeId : 0, data : {}})
    const [openEdit, setOpenEdit] = useState(false)

    const [code, setCode] = useState('')
    const [showInsertModal, setShowInsertModal] = useState(false)

    const [selectedModel, setSelectedModel] = useState(-1)

    return(
        <>
            <nodeEditContext.Provider value = {{nodeData, setNodeData, openEdit, setOpenEdit, code, setCode, showInsertModal, setShowInsertModal, selectedModel, setSelectedModel}}>
                {children}
            </nodeEditContext.Provider>
        </>
    )
}