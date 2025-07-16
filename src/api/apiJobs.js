import supabaseClient from "@/utils/supabase"
// import { P } from "@clerk/clerk-react/dist/useAuth-D-mOWUVF";

export async function getJobs(token, {location, company_id, searchQuery} ){     // functions are written in camel case
    // It is called API bcoz it is like a waiter.

    const supabase = await supabaseClient(token)

    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

    if(location){
        query = query.eq("location", location);

    }

    if(company_id){
        query = query.eq("company_id", company_id);
        
    }

    if(searchQuery){
        query = query.ilike("title", `${searchQuery}`);
    }
    // until now we were just preparing the query.

    const {data, error} = await query;   // query is executed here, asynchronously

    if(error){
        console.error("Error fetching jobs: ", error);
        return null;
    }

    return data;

}     