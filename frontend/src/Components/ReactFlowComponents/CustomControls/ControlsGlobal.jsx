import './CustomControls.css'

export default function ControlsGlobal( {createTemplate, deleteNodes, purgeContent} ){
    const nodeTypes = [     //Add new comand type and related icon here!
        {type : 'customCreate' , img : '/templateDesigner/buttonIcons/saveCommandIcon.svg', func : createTemplate, title : 'Save Template'},
        {type : 'customPurge' , img : '/templateDesigner/buttonIcons/purgeCommandIcon.svg', func : purgeContent, title : 'Purge Contents'},
        {type : 'customDelete', img : '/templateDesigner/buttonIcons/deleteCommandIcon.svg', func : deleteNodes, title : 'Delete Selected Nodes'}
    ]

    return(
        <>
            <div id="controlsGlobal">
                {
                    nodeTypes.map((e) => {
                        return(
                            <div key={e.type} className="nodeOpt" title={e.title}>
                                <button onClick={() => e.func()}>
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