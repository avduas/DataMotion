import ReactFlow from "reactflow";
import { useMemo } from "react";
import InputNode from "./CustomNodes/InputNode";
import ProcedureNode from "./CustomNodes/ProcedureNode";
import DeleteNode from "./CustomNodes/DeleteNode";
import MergeNode from "./CustomNodes/MergeNode";
import ConditionNode from "./CustomNodes/ConditionNode";
import StorageNode from "./CustomNodes/StorageNode";

export default function CustomNodes(){
    const customTypes = {
        customInputNode : InputNode,
        customProcedureNode : ProcedureNode,
        customDeleteNode : DeleteNode,
        customMergeNode : MergeNode,
        customConditionNode : ConditionNode,
        customStorageNode : StorageNode
    }

    const nodeTypes = useMemo(() => ({customInputNode : InputNode}), [])

    return(
        nodeTypes
    )
}