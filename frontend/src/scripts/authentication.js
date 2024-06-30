import { conSettings } from "./conSettings"

export const authenticationObj = {
    //Prepositions
    domain : conSettings.domain,    //Domain
    conErr : 'Connection error acquired, we are sorry',
    protocol : conSettings.conProtocol,
    //Functions

    //Login function

    login : async function(json){
        try{
            let response = await fetch(`${this.protocol}://${this.domain}/api/login`, {
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
    }
}