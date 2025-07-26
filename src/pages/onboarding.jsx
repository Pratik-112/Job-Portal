import React,{useEffect} from "react";
import { useUser } from "@clerk/clerk-react";
import {BarLoader} from "react-spinners"
import {Button} from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
const OnBoarding = ()=>{

    const {user, isLoaded} = useUser();
    const navigate = useNavigate();
    
    console.log(user);
    
    useEffect(()=>{      // useEffect runs atleast one time. And it runs always for once when component is rendered.
        if( isLoaded && user?.unsafeMetadata?.role){
            navigate(
                user?.unsafeMetadata?.role === "Recruiter"? "/post-job" : "/jobs"
            )
        }
    },[user, isLoaded, navigate])

    if(!isLoaded){     // understood a lot of things
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    }

    const handleRoleSelection = async(role)=>{
        await user.update({
            unsafeMetadata:{role},
        })
        .then(()=>{
            navigate(role === "Recruiter" ? "/post-job" : "/jobs");
        })
        .catch((err)=>{
            console.log("Error updating role:", err );
        })
    }

    return(
        <div className = "flex justify-center flex-col mt-10 mb-30 items-center">
            <h2 className = "gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">I am a...</h2>
            <div className = "grid mt-16 grid-cols-2  mt-16 gap-10 w-full md:px-40">
            
                <Button variant = "blue" onClick={
                    ()=>handleRoleSelection("Candidate")
                } className = "h-30 text-2xl">Candidate</Button>

                <Button onClick = { ()=>handleRoleSelection("Recruiter")
                }variant = "destructive"  className = "h-30 text-2xl">Recruiter</Button>
            </div>
        </div>



    )
}

export default OnBoarding;