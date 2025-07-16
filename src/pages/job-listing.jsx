import React, {useEffect, useState} from 'react'
import { getJobs } from '@/api/apiJobs'
import { BarLoader } from 'react-spinners'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import JobCard from '@/components/job-card'

const JobListing = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const[company_id, setCompany_id] = useState("");
  const {isLoaded} = useUser();

  const { data:jobs, loading:loadingJobs}= useFetch(getJobs,{location, company_id, searchQuery } );
  console.log(jobs);
  if(!isLoaded){
     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />

  }
  


  return (
    <div>
      <h1 className="gradient-title font-extrabold text-7xl text-center pb-8">
        {" "}
        Latest Jobs{" "}
      </h1>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className = "mt-4 grid gap-4 px-10 md:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-24">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard job = {job} key = {job.id} ></JobCard>;
            })
          ) : (
            <div> No Jobs Found! </div>
          )}
        </div>
      )}
    </div>
  );
  
  

  console.log(dataJobs);
  
  // console.log()

  

  

  return (
    <>JObs</>
  )
}

export default JobListing;