import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function StorageCleaner(){
    let location = useLocation()
    useEffect(() => {
        localStorage.removeItem('nodes')
        localStorage.removeItem('edges')
    }, [location])

    return <></>
}