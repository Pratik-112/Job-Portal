import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import JobCard from "@/components/job-card";
import { useSession } from "@clerk/clerk-react";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const session = useSession();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, searchQuery, company_id });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded ,location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  console.log(jobs);

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
        <div className="mt-4 grid gap-4 px-10 md:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-24">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  job={job}
                  key={job.id}
                  savedInit={job?.saved?.length > 0}
                ></JobCard> 
              );
            })
          ) : (
            <div> No Jobs Found! </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
