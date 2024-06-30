import './CustomControls.css'

export default function ControlsNodes( {addNode} ){
    const nodeTypes = [     //Add new node type and related icon here!
        /*{type : 'customInputNode' , img : '/templateDesigner/buttonIcons/downloadIcon.svg'},    //Basical version,
        {type : 'customDeleteNode', img : '/templateDesigner/buttonIcons/deleteIcon.svg'},
        {type : 'customMergeNode', img : '/templateDesigner/buttonIcons/mergeIcon.svg'},
        {type : 'customConditionNode', img : '/templateDesigner/buttonIcons/sortIcon.svg'},
        {type : 'customStorageNode', img : '/templateDesigner/buttonIcons/storageIcon.svg'},*/

        {type : 'customConnectorInNode', img : '/templateDesigner/buttonIcons/ConnectorInIcon.svg', title : 'Connector-In Node'},
        {type : 'customProcedureNode' , img : '/templateDesigner/buttonIcons/processorIcon.svg', title : 'Procedure Node'},
        {type : 'customStreamNode', img : '/templateDesigner/buttonIcons/StreamNodeIcon.svg', title : 'Stream Node'},   //For advanced version
        {type : 'customAggregatorNode', img : '/templateDesigner/buttonIcons/AggregatorNodeIcon.svg', title : 'Aggregator Node'},
        {type : 'customIteratorNode', img : '/templateDesigner/buttonIcons/IteratorNode.svg', title : 'Iterator Node'}, 
        {type : 'customConnectorOutNode', img : '/templateDesigner/buttonIcons/ConnectorOutIcon.svg', title : 'Connector-Out Node'}
    ]

    return(
        <>
            <div id="controlsNodes">
                {
                    nodeTypes.map((e) => {
                        return(
                            <div key={e.type} className="nodeOpt" title={e.title}>
                                <button onClick={() => addNode(e.type)} id={e.type}>
                                    <img src={e.img} alt={e.type} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}