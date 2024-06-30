import { useContext, useEffect, useState } from 'react'
import './NodeEdit.css'
import { nodeEditContext } from '../../../Contexts/NodeEditContext'
import { DataRoutesCon } from '../../../scripts/dataRoutes'

export default function NodeEdit(){
    const [showEdit, setShowEdit] = useState(false)     //to show panel or not
    const [showInputs, setShowInputs] = useState(true)  //to show inputs or to display a specific message on panel

    //States for inputs

    const [description, setDescription] = useState('')
    const [selectedColumns, setSelectedColumns] = useState([])  //selected dimensions
    const [metrics, setMetrics] = useState([])
    const [textCode, setTextCode] = useState('')

    const [modelOut, setModelOut] = useState('') //for connector out

    //Handling node data changes
    const {nodeData, setNodeData, openEdit, setOpenEdit, code, setCode, showInsertModal, setShowInsertModal, selectedModel, setSelectedModel} = useContext(nodeEditContext)

    useEffect(() => {       //handling interaction with editButton element in custom nodes
        setShowEdit(openEdit)
    }, [openEdit])

    useEffect(() => {
        try{
            setDescription(nodeData.data.description)
            nodeData.data.columns != undefined && selectedModel == nodeData.data.data_model ? setSelectedColumns(nodeData.data.columns) : setSelectedColumns([])
            nodeData.data.metrics != undefined && selectedModel == nodeData.data.data_model ? setMetrics(nodeData.data.metrics) : setMetrics([])
            nodeData.data.data_model != undefined && nodeData.data.data_model != -1 ? setSelectedModel(nodeData.data.data_model) : setSelectedModel(-1)
            nodeData.data.code != undefined ? setCode(nodeData.data.code) : setCode('')
            nodeData.data.model_out != undefined ? setModelOut(nodeData.data.model_out) : setModelOut('')
            setShowInputs(nodeData.nodeId != 0)     //switching condition of the inputs depending on node id
        }catch{} 
        ///////////////
        console.log(nodeData)
        ///////////////
    }, [nodeData])

    //Node Properties Titles
    const propNames = {
        customConnectorInNode : 'Connector-In Properties :',
        customProcedureNode : 'Procedure Properties :',
        customAggregatorNode : 'Aggregator Properties :',
        customIteratorNode : 'Iterator Properties :',
        customStreamNode : 'Stream Properties :',
        customConnectorOutNode : 'Connector-Out Properties :'
    }

    //NodeType active menu switcher
    const activeMenu = {    //Switching active menu(s)
        showDataModel : ['customConnectorInNode'],
        showSourceCode : ['customProcedureNode'],
        showColumns : ['customAggregatorNode'],
        showIteratorCode : ['customIteratorNode'],
        showStreamingColumns : ['customStreamNode'],
        showOutModel : ['customConnectorOutNode']
    }
    const inspectActiveMenu = (menu) => {
        try{
            return (activeMenu[menu].indexOf(nodeData.type) != -1)
        }catch{
            return false
        }
    }

    //Edition extra interface///////////////////////////////////////////////////////////////////////////////
        //Data Models
    const [dataModels, setDataModels] = useState([])

    async function getDataModels(){   //need to be extended after completion of BE data routes (data models)
        try{
            const res = await DataRoutesCon.getAllRoutes()

            Array.isArray(res) ? setDataModels(res) : ''
            /*setDataModels([
                {
                    "route_id" : 3,
                    "route_name" : "IOT Device Network Registration",
                    "columns": [
                    {
                        "orig_name": "CommSrvID",
                        "new_name": "CommSrvID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "JobID",
                        "new_name": "JobID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "TimeCreated",
                        "new_name": "TimeCreated",
                        "format": "date",
                        "active": true
                    },
                    {
                        "orig_name": "RequestTypeID",
                        "new_name": "RequestTypeID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "UnitTypeID",
                        "new_name": "UnitTypeID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "CmdCount",
                        "new_name": "CmdCount",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "SubscriberID",
                        "new_name": "SubscriberID",
                        "format": "number",
                        "active": true
                    }
                ]},
                {
                    "route_id" : 4,
                    "route_name" : "IOT Online Commands",
                    "columns": [
                    {
                        "orig_name": "CommSrvID",
                        "new_name": "CommSrvID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "JobID",
                        "new_name": "JobID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "TimeCreated",
                        "new_name": "TimeCreated",
                        "format": "date",
                        "active": true
                    }
                ]},
                {
                    "route_id" : 5,
                    "route_name" : "Smart Device Network Metrics",
                    "columns": [
                    {
                        "orig_name": "CommSrvID",
                        "new_name": "CommSrvID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "RequestTypeID",
                        "new_name": "RequestTypeID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "UnitTypeID",
                        "new_name": "UnitTypeID",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "CmdCount",
                        "new_name": "CmdCount",
                        "format": "number",
                        "active": true
                    },
                    {
                        "orig_name": "SubscriberID",
                        "new_name": "SubscriberID",
                        "format": "number",
                        "active,": true
                    },
                ]},
                {
                    "route_id" : 6,
                    "route_name" : "Smart Meter Readings (Water)",
                    "columns" : [
                        {
                            "orig_name": "SiteID",
                            "new_name": "SiteID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "MunicipalID",
                            "new_name": "MunicipalID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "ReadingID",
                            "new_name": "ReadingID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "MeterCount",
                            "new_name": "MeterCount",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "MeterID",
                            "new_name": "MeterID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "TransponderID",
                            "new_name": "TransponderID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "ConcID",
                            "new_name": "ConcID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "Port",
                            "new_name": "Port",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "Address",
                            "new_name": "Address",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "UnitType",
                            "new_name": "UnitType",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "Status",
                            "new_name": "Status",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "MeterStatus",
                            "new_name": "MeterStatus",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "FactorID",
                            "new_name": "FactorID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "Type",
                            "new_name": "Type",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "ReadTime",
                            "new_name": "ReadTime",
                            "format": "date",
                            "active": true
                        },
                        {
                            "orig_name": "Read",
                            "new_name": "Read",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "BackRead",
                            "new_name": "BackRead",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "MeterCurrentState",
                            "new_name": "MeterCurrentState",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "IDType",
                            "new_name": "IDType",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "PulsesBased",
                            "new_name": "PulsesBased",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "RepeaterID",
                            "new_name": "RepeaterID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "DownlinkRSSI",
                            "new_name": "DownlinkRSSI",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "UplinkRSSI",
                            "new_name": "UplinkRSSI",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "OriginalRead",
                            "new_name": "OriginalRead",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "TransmittingUnitTypeID",
                            "new_name": "TransmittingUnitTypeID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "DeviceTypeID",
                            "new_name": "DeviceTypeID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "UserCode",
                            "new_name": "UserCode",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "Consumption",
                            "new_name": "Consumption",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "MinutesSincePrevRead",
                            "new_name": "MinutesSincePrevRead",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "ReferenceID",
                            "new_name": "ReferenceID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "ReferenceTypeID",
                            "new_name": "ReferenceTypeID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "RowTypeID",
                            "new_name": "RowTypeID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "ReadMethodID",
                            "new_name": "ReadMethodID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "RowTypeSequenceID",
                            "new_name": "RowTypeSequenceID",
                            "format": "number",
                            "active": true
                        },
                        {
                            "orig_name": "CommentCodes",
                            "new_name": "CommentCodes",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "MessageToOffice",
                            "new_name": "MessageToOffice",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "DeviceID",
                            "new_name": "DeviceID",
                            "format": "string",
                            "active": true
                        },
                        {
                            "orig_name": "DateCreated",
                            "new_name": "DateCreated",
                            "format": "date",
                            "active": true
                        }
                    ]}, {
                        "route_id" : 9,
                        "route_name" : "Smart Meter Readings w/Consumption",
                        "columns": [
                            {
                                "orig_name": "CommSrvID",
                                "new_name": "CommSrvID",
                                "format": "number",
                                "active": true
                            },
                            {
                                "orig_name": "JobID",
                                "new_name": "JobID",
                                "format": "number",
                                "active": true
                            },
                            {
                                "orig_name": "TimeCreated",
                                "new_name": "TimeCreated",
                                "format": "date",
                                "active": false
                            },
                            {
                                "orig_name": "RequestTypeID",
                                "new_name": "RequestTypeID",
                                "format": "number",
                                "active": true
                            },
                            {
                                "orig_name": "UnitTypeID",
                                "new_name": "UnitTypeID",
                                "format": "number",
                                "active": true
                            },
                            {
                                "orig_name": "CmdCount",
                                "new_name": "CmdCount",
                                "format": "number",
                                "active": true
                            },
                            {
                                "orig_name": "SubscriberID",
                                "new_name": "SubscriberID",
                                "format": "number",
                                "active": true
                            }
                        ]}
                ])*/
        }catch{}
    }
    useEffect(() => {
        getDataModels()
    }, [nodeData])

    //for agregator node

    function chooseColumn(name){    //Choose dimensions
        if(metrics.findIndex((e) => e.name == name) != -1){return}
        if(selectedColumns.findIndex((e) => e.name == name) == -1){setSelectedColumns([...selectedColumns, {name : name, aggregative : 99}])
        }else{setSelectedColumns([
            ...selectedColumns.slice(0, selectedColumns.findIndex((e) => e.name == name)),
            ...selectedColumns.slice(selectedColumns.findIndex((e) => e.name == name) + 1)
        ])}
    }
    function chooseAllColumns(){    //Choose all dimensions
        try{
            let chosenColumns = []
            dataModels[dataModels.findIndex((e) => e.route_id == selectedModel)].columns.forEach((e) => e.active == true && chosenColumns.push({name : e.orig_name, aggregative : 99}))
            setSelectedColumns(chosenColumns)
                
        }catch{console.log('err')}
    }
    //////////////
    useEffect(() => {
        console.log('selected columns', selectedColumns)
    }, [selectedColumns])
    //////////////
    function chooseMetrics(name){   //Choose metrics
        if(selectedColumns.findIndex((e) => e.name == name) != -1 || selectedColumns.length == 0){return}
        if(metrics.findIndex((e) => e.name == name) == -1){setMetrics([...metrics, {name : name, aggregative : 1}])
        }else{setMetrics([
            ...metrics.slice(0, metrics.findIndex((e) => e.name == name)),
            ...metrics.slice(metrics.findIndex((e) => e.name == name) + 1)
        ])}
    }
    function disabledDimension(name){
        return (metrics.findIndex((e) => e.name == name) != -1) ? ' disabled' : ''
    }
    function disabledMetric(name){
        return (selectedColumns.findIndex((e) => e.name == name) != -1 || selectedColumns.length == 0) ? ' disabled' : ''
    }
    function chooseMetricAction(name, status){
        try{
            let newMetrics = metrics
            const index = newMetrics.findIndex((e) => e.name == name)
            index != -1 && (newMetrics[index].aggregative = status)
            setMetrics(newMetrics)
        }catch{}
    }
    function defaultOption(name){
        try{
            const index = metrics.findIndex((e) => e.name == name)
            console.log(metrics, index ,metrics[index].aggregative)
            if(index != -1){
                return metrics[index].aggregative
            }else{return 0}
        }catch{return 0}
    }
    

    useEffect(() => {
        selectedColumns.length == 0 && setMetrics([])
    }, [selectedColumns])

    function displayColumns(){  //displays columns in case of choosing aggregator node
        try{
            if(selectedModel != -1){ return (<>
                <div id='dimensions'>
                    <p className='inputP'>Dimensions :</p>
                    <div id='selectionCont'>
                        {dataModels[dataModels.findIndex((e) => e.route_id == selectedModel)].columns.map((e) => {
                            if(e.active){ return(
                                <div className={'columnItem' + disabledDimension(e.orig_name)} key={e.orig_name}>
                                    <input type='checkbox' value={e.orig_name} checked={selectedColumns.findIndex((elem) => elem.name == e.orig_name) != -1} onClick={() => chooseColumn(e.orig_name)}></input>
                                    <div id='columnName'>{e.new_name}</div>
                                    <div id='columnType'><div>{e.format}</div></div>
                                </div>
                            )}
                        })}
                    </div>
                </div>
                <div id='metrics'>
                    <p className='inputP'>Metrics :</p>
                    <div id='selectionCont'>
                        {dataModels[dataModels.findIndex((e) => e.route_id == selectedModel)].columns.map((e) => {
                            if(e.active){ return(
                                <div className={'columnItem' + disabledMetric(e.orig_name)} key={e.orig_name}>
                                    <input type='checkbox' value={e.orig_name} checked={metrics.findIndex((elem) => elem.name == e.orig_name) != -1} onClick={() => chooseMetrics(e.orig_name)}></input>
                                    <div id='modelName'>{e.new_name}</div>
                                    <div id='columnType'><div>{e.format}</div></div>
                                    <div id='selectAction'>
                                        {metrics.findIndex((elem) => elem.name == e.orig_name) != -1 && <select defaultValue={defaultOption(e.orig_name)} onChange={(elem) => chooseMetricAction(e.orig_name, elem.target.value)}>
                                            {/*<option value={'0'}>Inactive</option>*/}
                                            <option value={'1'}>COUNT</option>
                                            <option value={'2'}>SUM</option>
                                            <option value={'3'}>AVERAGE</option>
                                            <option value={'4'}>MIN</option>
                                            <option value={'5'}>MAX</option>
                                        </select>}
                                    </div>
                                </div>
                            )}
                        })}
                    </div>
                </div>
            </>)}
            return(
                <div id='emptyMes'>Please, choose the data model</div>
            )
        }catch{
            return(
                <div id='emptyMes'>Please, choose the data model</div>
            )
        }
    }

    function displayStream(){   //displays for stream
        try{
            if(selectedModel != -1){
                //Interface generating
                return(<>
                <div id='dimensions'>
                    <p className='inputP'>Dimensions :</p>
                    <div id='selectionCont'>
                        {dataModels[dataModels.findIndex((e) => e.route_id == selectedModel)].columns.map((e) => {
                            if(e.active){ return(
                                <div className={'columnItem' + disabledDimension(e.orig_name)} key={e.orig_name}>
                                    <input type='checkbox' value={e.orig_name} checked={selectedColumns.findIndex((elem) => elem.name == e.orig_name) != -1} onChange={() => chooseColumn(e.orig_name)}></input>
                                    <div id='columnName'>{e.new_name}</div>
                                    <div id='columnType'><div>{e.format}</div></div>
                                </div>
                            )}
                        })}
                    </div>
                </div>
            </>)}
            return(
                <div id='emptyMes'>Please, choose the data model</div>
            )
        }catch{
            return(
                <div id='emptyMes'>Please, choose the data model</div>
            )
        }
    }
    useEffect(() => {   //'Selecting' all columns on initialization Stram node edition menu
        nodeData.type == 'customStreamNode' && (nodeData.data.columns == undefined || nodeData.data.columns == [] || nodeData.data.data_model != selectedModel)  && chooseAllColumns()
    }, [nodeData])

    useEffect(() => {nodeData.type != 'customStreamNode' && setSelectedColumns([])}, [selectedModel])    //cleaning selected columns on model switch (condition may cause issues!)

    //For ConnectorOut Node

    function displayOutModel(){
        try{
            return(<>
                <p className='inputP'>Data Model :</p>
                <div id='selectionCont'>
                    {dataModels.map((e) => {
                        return(
                            <div className={'modelItem' + (modelOut == e.route_id ? ' selected' : '')} key={e.route_id} onClick={() => setModelOut(e.route_id)}>
                                {/*<input type='radio' value={e.route_id} checked={selectedModel == e.route_id} onChange={() => setSelectedModel(e.route_id)}></input>*/}
                                <div id='modelName'>{e.route_name}</div>
                                <div id='numColumns'>Columns : {(e.columns.filter((e) => e.active == true)).length}</div>
                            </div>
                        )
                    })}
                </div>
            </>)
        }catch{
            return(
                <div id='emptyMes'>Error</div>
            )
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //FUNCTIONS

    //UPDATE
    function updateNode(){
        setNodeData({
            nodeId : nodeData.nodeId,
            data : {
                description : description,  //universal for all types of nodes
                data_model : selectedModel,
                columns : selectedColumns,
                metrics : metrics,
                code : code,
                model_out : modelOut
            },
            type : nodeData.type
        })
    }

    function onKey(e){    //saving changes on enter pressed
        (nodeData.nodeId != 0 && e.keyCode == 13) && updateNode();
        (showEdit && e.keyCode == 27) && setOpenEdit(false)
    }
    ////////////////////////////////////////    //save on Insertion
    useEffect(() => {
        updateNode()
    }, [showInsertModal])
    ////////////////////////////////////////

    return(
        <>
            <button id="openEdit" tabIndex='0' onKeyDown={(e) => onKey(e)} className={`${showEdit ? 'active' : 'nonActive'}`} onClick={() => setOpenEdit(!openEdit)}>
                <img src="/navbar/settings_icon.svg" alt="" />
            </button>
            <div id="nodeEdit" tabIndex='0' onKeyDown={(e) => onKey(e)} className={`${showEdit ? 'active' : 'nonActive'}`}>
                { showInputs && (<div id='imports'>
                    <div id='importsCont'>
                        {nodeData.type != undefined && <p className='inputP' id='nodeProp'>{propNames[nodeData.type]}</p>}

                        { inspectActiveMenu('showDataModel') && (<div id='chooseModel'>
                            <p className='inputP'>Data Model :</p>
                            <div id='selectionCont'>
                                {dataModels.map((e) => {
                                    return(
                                        <div className={'modelItem' + (selectedModel == e.route_id ? ' selected' : '')} key={e.route_id} onClick={() => setSelectedModel(e.route_id)}>
                                            {/*<input type='radio' value={e.route_id} checked={selectedModel == e.route_id} onChange={() => setSelectedModel(e.route_id)}></input>*/}
                                            <div id='modelName'>{e.route_name}</div>
                                            <div id='numColumns'>Columns : {(e.columns.filter((e) => e.active == true)).length}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)}

                        { inspectActiveMenu('showSourceCode') && (<div id='srcCode'>
                            <div>
                                <p className='inputP'>Source Code :</p>
                                {(nodeData.data.code != undefined && nodeData.data.code != '') && <img src='/templateDesigner/svg/fileChecked.svg'></img>}
                                <button onClick={() => {setShowInsertModal(true)}}>Insert</button>
                            </div>
                        </div>)}

                        { inspectActiveMenu('showIteratorCode') && (<div id='srcCode'>
                            <div>
                                <p className='inputP'>Source Code :</p>
                                {(nodeData.data.code != undefined && nodeData.data.code != '') && <img src='/templateDesigner/svg/fileChecked.svg'></img>}
                                <button onClick={() => {setShowInsertModal(true)}}>Insert</button>
                            </div>
                        </div>)}

                        { inspectActiveMenu('showColumns') && (<div id='aggregator'>
                                {displayColumns()}
                        </div>)}
                        {inspectActiveMenu('showStreamingColumns') && <div id='stream'>
                                {displayStream()}
                        </div>}

                        {inspectActiveMenu('showOutModel') && <div id='chooseModel'>
                            {displayOutModel()}
                        </div>}
                        
                        <div id='description'>
                            <p className='inputP'>Description :</p>
                            <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div id='buttonCont'><button id='saveChanges' onClick={() => updateNode()}>Save Changes</button></div>
                </div>)}

                {  !showInputs && (
                    <div id='chooseSmth'>
                        Please, choose the node
                    </div>

                )}
            </div>
        </>
    )
}