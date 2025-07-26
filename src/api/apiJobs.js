import supabaseClient from "@/utils/supabase"


// Get jobs from supabase (for that, this is API)
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
        query = query.ilike("title", `%${searchQuery}%`);
    }
    // until now we were just preparing the query.

    const {data, error} = await query;   // query is executed here, asynchronously

    if(error){
        console.error("Error fetching jobs: ", error);
        return null;
    }

    return data;

}     



// Save the jobs in saved_jobs table in supabase. For that purpose, this is API.
export async function saveJob(token, {alreadySaved}, saveData ){     // functions are written in camel case
    // It is called API bcoz it is like a waiter.

    const supabase = await supabaseClient(token);

    if(alreadySaved){
        const{data, error:deleteError} = await supabase.from("saved_jobs").delete().eq("job_id",saveData.job_id);

        if(deleteError){
            console.error("Error Deleting Saved Job:", deleteError);
            return null;
        }

        return data;
    }
    else{
        const{data, error:insertError} = await supabase.from("saved_jobs").insert([saveData]).select();

        if(insertError){
            console.error("Error during saving job:", insertError)
            return null;
        }

        return data

    }


}     