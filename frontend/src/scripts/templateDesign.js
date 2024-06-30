import { conSettings } from "./conSettings"

export const templateDesignCon = {
    //Prepositions
    domain : conSettings.domain,    //Domain
    conErr : 'Connection error acquired, we are sorry',
    protocol : conSettings.conProtocol,
    //Functions

    create : async function(json){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/template_create`, {
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
    getTemplate : async function(id){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/template_get/${id}`, {
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
    },
    getAllTemplates : async function(id){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/template_get`, {
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
    },
    deleteTemplate : async function(id){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/template_del/${id}`, {
                method : 'DELETE',
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