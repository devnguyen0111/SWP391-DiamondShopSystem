import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LocationTracker() {
    let location = useLocation()

    useEffect(()=>{
        
        sessionStorage.setItem('location', location.pathname)
    }, [location])
    
    return null;
}

export default LocationTracker;