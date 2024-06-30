import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import '../CreateDataRoute.css'
import { dataValidation } from '../../scripts/ServiceScripts/dataValidation'

export default function Insertion({route, setRoute, routeName, setRouteName, sample, setSample}){

    //navigation
    const navigate = useNavigate()

    //Json error
    const [errMes, setErrMes] = useState('')

    const [fix, setFix] = useState(false)

    //Smart JSON Parse algorithm
        //service algorithms
    function validateColumn(data){
        if(dataValidation.date(data)){return 'date'}
        if(dataValidation.number(data)){return 'number'}
        return 'string'
    }

    function analyzeJSON(json){
        let columns = []
        let columnNames = []
        let table = []
        try{
            const keys = Object.keys(json)
            keys.forEach((e) => {   //Getting unique columns
                const exemplar = json[e]
                Object.keys(json[e]).forEach((e) => {
                    if(columnNames.indexOf(e) == -1){
                        columnNames.push(e)
                        columns.push({
                            orig_name: e,
                            new_name: e,
                            format: validateColumn(exemplar[e]),
                            active : true
                        })
                    }
                })
            })
            keys.forEach((e) => {   //Producing data, that would be displayed in table on step 2
                const exemplar = json[e]
                let tableRow = {}
                columnNames.forEach((e) => {
                    tableRow[e] = (exemplar[e])
                })
                table.push(tableRow)
            })
            setErrMes('')   //removing error message
        }catch{setErrMes('Invalid JSON')}
        ////////////////////////
        console.log('columns', columns, '\ncolumnNames', columnNames, '\ntable', table)
        ////////////////////////
        setRoute({
            columns : columns,
            table : table
        })
    }
    //Sample handle
    useEffect(() => {
        try{
            const json = JSON.parse(sample)
            analyzeJSON(json)
        }catch{
            fix && setErrMes("Invalid JSON")
        }
        fix && sample.length == 0 && setErrMes("A Data Sample Wasn't Provided")
    }, [sample])

    /////////////////////////////////
    /*const json = (
        [{
            "CommSrvID": "1",
            "JobID": "31940346",
            "TimeCreated": "2024-05-07T01:19:17.050000",
            "RequestTypeID": "1",
            "UnitTypeID": "21",
            "CmdCount": 1,
            "SubscriberID": "1"
          }, {
            "CommSrvID": "1",
            "JobID": "31940342",
            "TimeCreated": "2024-05-07T01:13:18.093000",
            "RequestTypeID": "1",
            "UnitTypeID": "24",
            "CmdCount": 1,
            "SubscriberID": "1",
            'some' : 1,
            'some' : 'string1'
          }, {
            "CommSrvID": "1",
            "JobID": "31940327",
            "TimeCreated": "2024-05-07T00:00:16.960000",
            "RequestTypeID": "1",
            "UnitTypeID": "27",
            "CmdCount": "1",
            "SubscriberID": "1"
          }, {
            "CommSrvID": "1",
            "JobID": "31940344",
            "TimeCreated": "2024-05-07T01:15:17.150000",
            "RequestTypeID": "1",
            "UnitTypeID": "29",
            "CmdCount": "1",
            "SubscriberID": "1",
            "extra" : 250
          }]
    )
    useEffect(() => {
        analyzeJSON(json)
    }, [])*/
    //////////////////////////////////////////

    return(
        <>
            <p>
                <input type="text" maxLength={50} placeholder={routeName} className={routeName.length == 0 ? 'err' : ''} onChange={(e) => setRouteName(e.target.value)}/>
            </p>
            <div id='dividingLine'></div>
            <div id='insertCont'>
                <div id='firstStr'>
                    <p>Data Sample:</p>
                    <p id='pFormat'>Data Format:</p>
                    <div id='selectFormat'>
                        <select defaultValue={'JSON'}>
                            <option value={''}>Select</option>
                            <option value={'JSON'}>JSON</option>
                        </select>
                    </div>
                </div>
                <div id='dividingLine'></div>
                <textarea className={errMes != '' ? 'err' : ''} defaultValue={sample.length != 0 ? sample : ''} value={sample} onChange={(e) => {setSample(e.target.value), setFix(true)}}></textarea>
                <div id='errMes'>
                    <span>{errMes != '' && 'Error : '}</span>
                    <span id='mes'>{errMes}</span>
                </div>
            </div>
            <div id='buttonCont'>
                <button id='continue' onClick={() => (errMes.length == 0 && routeName.length != 0 && sample.length != 0) && navigate('revision')}>Continue</button>
            </div>
        </>
    )
}