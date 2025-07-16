import React, {useState, useEffect} from "react";
import { useSession } from "@clerk/clerk-react";
// custom hook for fetching data from jobs table.

// What's happening, I will tell u in short ->
// we are taking session from the clerk. Now, to transmit this session between front-end and backend(supabase) securely, we convert that token into JWT token. This token is used by supabase to confirm the identity of user and hence the user can access the data from supabase.
// session is current login activity/session of user authenticated by Clerk. Session object and user object are different in clerk.
const useFetch = (cb, options = {}) =>{
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const {session} = useSession();

    useEffect(()=>{
        const fn = async(...args)=>{
            setLoading(true);
            setError(null);
    
            try{
                const supabaseAccessToken = await session?.getToken?.({
                    template:'supabase'
                  })
    
                const response = await cb(supabaseAccessToken, options, ...args)
                setData(response);
                setError(null);
                
            }
            catch(error){
                setError(error);
            }
            finally{
                 setLoading(false);
            }

        }


        fn();
    }, [session, options.location, options.company_id, options.searchQuery])


    

    return { loading, error, data};
};

export default useFetch;

