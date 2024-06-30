export const dataValidation = {
    number : (data) => {
        try{
            return !isNaN(parseFloat(data)) && isFinite(data)
        }catch{
            return false
        }
    },
    date : (data) => {
        try{
            let regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([Zz]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/i;
            return regex.test(data)
        }catch{
            return false
        }
    },
    string : (data) => {
        try{
            return true
        }catch{
            return false
        }
    }
}