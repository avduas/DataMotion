import '../CreateDataRoute.css'


export default function DataRouteCreateModal({ closeModal, modalChangeFormat, onFormatCancel}){

    return(
        <>
            <div id="modalBody" onClick={() => {closeModal(); onFormatCancel()}}></div>
            <div id="modal">
                <div id='mes'>Provided data is not corresponding with the format, you tried to select. Are you sure ?</div>
                <div id='buttonCont'>
                    <button id='no' onClick={() =>  {closeModal(); onFormatCancel()}}>No</button>
                    <button id='yes' onClick={() =>  {closeModal(); modalChangeFormat()}}>Yes</button>
                </div>
            </div>
        </>
    )
}