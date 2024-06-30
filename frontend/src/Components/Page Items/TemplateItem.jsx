import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../Templates.css'

export default function TemplateItem( {data, deleteTemplate} ){
    const [showOptions, setShowOptions] = useState(false)
    const [showOptionsMenu, setShowOptionsMenu] = useState(false)

    const navigate = useNavigate()

    function dateParsing(raw){
        const date = new Date(raw)
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }
    
    return(
        <>
            <div className='templateItem' onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => {setShowOptions(false); setShowOptionsMenu(false)}}>
                <div id='itemCont'>
                    <div id='numbOfElem'>
                        <img src='/templates/Template.svg'></img>
                        <div><span>{data.elements}</span></div>
                    </div>
                    <div id='textCont'>
                        <div id='templateName'>
                            <div>{data.template_name}</div>
                        </div>
                        <div id='dividingLine'></div>
                        <div id='dateName'>
                            <div id='name'><span>Created by : </span>{`${data.first_name} ${data.last_name}`}</div>
                            <div id='date'><span>Last Modified : </span>{dateParsing(data.last_modified_at)}</div>
                        </div>
                    </div>
                    <button id='options'  className={showOptions ? 'active' : ''} onClick={() => setShowOptionsMenu(!showOptionsMenu)}>
                        <img src='/templates/Options.svg'></img>
                    </button>
                    <div id='optionsMenu' className={showOptionsMenu ? 'active' : ''}>
                        <div>
                            <button onClick={() => navigate(`/template?id=${data.template_id}`)}>
                                <img src='/templates/Edit.svg'></img>
                                <span>Edit</span></button>
                            <div id='dividingLine'></div>
                            <button onClick={() => navigate(`/new_pipeline?template_id=${data.template_id}`)}>
                                <img src='/templates/NewPipeline.svg'></img>
                                <span>New Pipeline</span></button>
                            <div id='dividingLine'></div>
                            <button onClick={() => deleteTemplate(data.template_id)}>
                                <img src='/templates/Delete.svg'></img>
                                <span>Delete</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}