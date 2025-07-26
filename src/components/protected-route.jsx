import React from "react";
import { useUser } from "@clerk/clerk-react";
import {Navigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import { BarLoader } from "react-spinners";

const ProtectedRoute = function ({children}){

    const {isSignedIn, user, isLoaded} = useUser();
    const location = useLocation();
   
    // Show loading state while user data is being fetched
    if (!isLoaded) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }
    
    // Redirect to sign-in if user is not authenticated
    if (!isSignedIn) {
        return <Navigate to = "/?sign-in=true" />;
    }
    
    // Redirect to onboarding if user hasn't selected a role
    if(user && !user?.unsafeMetadata?.role && location.pathname !== "/onboarding"){
        return <Navigate to = "/onboarding"/>
    }
    
    return children;
    
}

export default ProtectedRoute