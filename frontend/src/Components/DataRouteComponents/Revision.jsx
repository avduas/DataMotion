import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import '../CreateDataRoute.css'
import { dataValidation } from '../../scripts/ServiceScripts/dataValidation'
import DataRouteCreateModal from './DataRouteCreateModal'
import { DataRoutesCon } from '../../scripts/dataRoutes'
import { authContext } from '../../Contexts/AuthContext'

export default function Revision({route, setRoute, routeName, setRouteName, sample}){

    const [selectedColumn, setSelectedColumn] = useState('')    //column selection

    const [update, setUpdate] = useState(false) //fixing delayed render
    
    const navigate = useNavigate() //navigation

    //Handling data format change

    const [selectedFormat, setSelectedFormat] = useState('')
    const [showModal, setShowModal] = useState(false)

    //Handling selection of column

    function selectColumn(e){
        if(selectedColumn == e.orig_name){
            setSelectedColumn(''); 
            setSelectedFormat('')
            setNewName('')
        }else{ 
            setSelectedColumn(e.orig_name); 
            e.active ? setSelectedFormat(e.format) : setSelectedFormat('disable')
            setNewName(e.new_name)
        }
    }
    //Handling name change
    const [newName, setNewName] = useState('')
    
    function changeColumnName(){
        try{
            let newRoute = route

            const columnIndex = route.columns.findIndex((elem) => elem.orig_name == selectedColumn)

            newRoute.columns[columnIndex].new_name = newName
            newName == '' && (newRoute.columns[columnIndex].new_name = newRoute.columns[columnIndex].orig_name)
            setRoute(newRoute)
            
            //
            console.log(route)
            console.log(route.columns.findIndex((elem) => elem.orig_name == selectedColumn))
            //
        }catch{}
    }
    //Handling format change
    function collectDataByColumn(){
        try{
            return route.table.map((e) => {return e[selectedColumn]})
        }catch{
            return []
        }
    }

    function validateTableData(){
        const tableData = collectDataByColumn()
        let response = true

        switch(selectedFormat){
            case 'date' :
                tableData.forEach((e) => {if(!dataValidation.date(e)){response = false}})
                break
            case 'number' :
                tableData.forEach((e) => {if(!dataValidation.number(e)){response = false}})
                break
            case 'string' :
                tableData.forEach((e) => {if(!dataValidation.string(e)){response = false}})
                break
            default : 
                response = true
        }
        return response
    }

    function changeFormat(){
        let newRoute = route

        const columnIndex = route.columns.findIndex((elem) => elem.orig_name == selectedColumn)

        const isFormatDiffers = () => {
            try{return !(route.columns[columnIndex].format == selectedFormat)}catch{return 'e\drd'}
        }

        if(selectedFormat != 'disable'){
            !validateTableData() ? (isFormatDiffers() && setShowModal(true)) : newRoute.columns[columnIndex].format = selectedFormat   //for format change
            
        }else{
            newRoute.columns[columnIndex].active = false    //making column inactive
            setSelectedFormat('')
        }
        if(selectedFormat != 'disable'){newRoute.columns[columnIndex].active = true}


        setRoute(newRoute)
    }
    function modalChangeFormat(){   //getting envoked by clicking on specific button in modal
        let newRoute = route
        try{
            newRoute.columns[route.columns.findIndex((elem) => elem.orig_name == selectedColumn)].format = selectedFormat
        }catch{}
        setRoute(newRoute)
        setUpdate(!update)
    }
    function onFormatCancel(){
        try{setSelectedFormat(route.columns[route.columns.findIndex((elem) => elem.orig_name == selectedColumn)].format)}catch{}
    }

    //Updating values accordingly
    function applyChanges(){
        /*newName != '' &&*/ changeColumnName()
        selectedFormat != '' && changeFormat()
        setUpdate(!update)
    }

    function findNewName(){     //for input placeholder
        try{return route.columns[route.columns.findIndex((elem) => elem.orig_name == selectedColumn)].new_name
        }catch{return ''}
    }
    function isColumnActive(){
        try{
            return route.columns[route.columns.findIndex((elem) => elem.orig_name == selectedColumn)].active
        }catch{
            return false
        }
    }
    //////Leads to frequent rerendering///////
    useEffect(() => applyChanges(), [newName, selectedFormat])
    //////////////////////////////////////////

    //////////////
    useEffect(()=>{console.log(selectedFormat)}, [selectedFormat])
    //////////////

    //Data Preview

    function generateTBody(){
        function spreadRow(row){
            return(
                <>
                    {Object.keys(row).map((e) => {
                        return(
                            <td key={e}>{row[e]}</td>
                        )})}
                </>
            )
        }

        return(
            route.table.map((row) => {
                return(
                    <tr>
                        {spreadRow(row)}
                    </tr>
                )})
        )
    }

    //Create DataRoute
    const {setReqBody} = useContext(authContext)

    async function createRoute(){
        const json = route
        json.sample = sample
        json.route_name = routeName

        const res = await DataRoutesCon.create(json)
        ///////////////////
        console.log('route', json)
        ///////////////////
        res.logOut == true && setReqBody(res)

        navigate('/data_routes')
    }

    return(
        <>
            <p><div>{routeName}</div></p>
            <div id='dividingLine'></div>
            <div id='reviseCont'>
                {/*<div id='firstStr'></div>*/}
                <div id='dataPreview'>
                    <p>Data Preview:</p>
                    <div id='tableCont'>
                        <table>
                            <thead>
                                {route.columns.map((e) => {
                                    return <th className={selectedColumn == e.orig_name ? 'selected' : (e.active ? 'active' : 'nonActive')} onClick={() => {selectColumn(e)}}>{e.new_name}</th>
                                })}
                            </thead>
                            <tbody>
                                {generateTBody()}
                            </tbody>
                        </table>
                    </div>
                    
                </div>

                <div id='editCont'>
                        <div id='nameChange'>
                            <p>Column Name : </p>
                            <input type="text" maxLength={50} placeholder={selectedColumn != '' ? findNewName() : 'Select a column'} onChange={(e) => {setNewName(e.target.value)}} value={newName}></input>
                        </div>
                        <div id='typeChange'>
                            <p>Column Data Format : </p>
                            <div id='radioInputs'>
                                <div><input type='radio' id='string'  checked={selectedFormat == 'string'} value={'string'} onChange={(e) => selectedColumn != '' && setSelectedFormat(e.target.value)}></input><label htmlFor='string'>String</label></div>
                                <div><input type='radio' id='number' checked={selectedFormat == 'number'} value={'number'} onChange={(e) => selectedColumn != '' && setSelectedFormat(e.target.value)}></input><label htmlFor='number'>Number</label></div>
                                <div><input type='radio' id='date' checked={selectedFormat == 'date'} value={'date'} onChange={(e) => selectedColumn != '' && setSelectedFormat(e.target.value)}></input><label htmlFor='date'>Date</label></div>
                                <div><input type='radio' id='disable' checked={!isColumnActive()} value={'disable'} onChange={(e) => selectedColumn != '' && setSelectedFormat(e.target.value)}></input><label htmlFor='disable'>Don't import column (skip)</label></div>

                                <div id='applyButton'>
                                    <button onClick={() => applyChanges()}>Apply Changes</button>
                                </div>
                            </div>
                        </div>
                </div>
                
            </div>
            <div id='buttonCont'>
                    <button id='back' onClick={() =>  navigate('..')}>Back</button>
                    <button id='continue' onClick={() => createRoute()}>Create</button>
            </div>
            {showModal && <DataRouteCreateModal closeModal={() => setShowModal(false)} modalChangeFormat={modalChangeFormat} onFormatCancel={onFormatCancel}/>}
        </>
    )
}