import React from "react";
import { useUser } from "@clerk/clerk-react";
import {Navigate, Outlet} from "react-router-dom"
import {useLocation} from "react-router-dom";
const ProtectedRoute = function ({children}){

    const {isSignedIn, user, isLoaded} = useUser();
    const location = useLocation();
   
    
    if(isLoaded && !isSignedIn && isSignedIn !== undefined){
        return <Navigate to = "/?sign-in=true" />;
    }
    
    if(user && !user?.unsafeMetadata?.role && location.pathname !== "/onboarding"){
        return <Navigate to = "/onboarding"/>
    }

    // if(user !== undefined && user?.unsafeMetadata?.role && user?.unsafeMetadata?.role === "Recruiter"){

    // }

   


    
    return children;
    
}

export default ProtectedRoute