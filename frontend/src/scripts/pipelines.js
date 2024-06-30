import { conSettings } from "./conSettings"

export const pipelineFetchObj = {
    //Prepositions
    domain : conSettings.domain,    //Domain
    conErr : 'Connection error acquired, we are sorry',
    protocol : conSettings.conProtocol,
    //Functions

    create : async function(json){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/pipeline_post`, {
                method : 'POST',
                mode : 'cors',   //may change
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : 'include',
                body : JSON.stringify(json)
            })
            response = await response.json()
            ///////////////////////////
            console.log(response)
            ///////////////////////////
            return response
        }
        catch{return this.conErr}
    },
    getAllPipelines : async function(){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/pipeline_get`, {
                method : 'GET',
                mode : 'cors',   //may change
                credentials : 'include'
            })
            response = await response.json()
            ///////////////////////////
            console.log(response)
            ///////////////////////////
            return response
        }
        catch{return this.conErr}
    }
}