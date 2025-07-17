import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "./ui/card";
import { CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJob } from "@/api/apiJobs";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/use-fetch";

const JobCard = ({
  job,
  savedInit = false,
  isMyJob = false,
  onJobSaved = () => {},
  
}) => {
  
  const[saved, setSaved] = useState(savedInit);

  const { fn:fnSavedJob ,data:savedJob, loading:loadingSavedJob} = useFetch(saveJob, {alreadySaved: saved});

  const{user} = useUser();

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id:user.id,
      job_id:job.id,
      
    });
    onJobSaved();   // after saving job, we are going to take some action(like actually seeing the whislist, we will work on it later)
  };

  useEffect(()=>{
    if(savedJob !== undefined){
      
      setSaved(savedJob?.length>0);
    }
  }, [savedJob])

  


  return (
    <Card className ="rounded-sm " >
      <CardHeader className=" ">
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {!isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className = "flex flex-col gap-4 flex-1">
        <div className = "flex justify-between ">
            {job.company && <img src = {job.company.logo_url} className = "h-6" />}
            <div className = "flex items-center gap-2">
                <MapPinIcon size = {15} />  {job.location}
            </div>
        </div>
        <hr/>
        {
            job.description.substring(0,job.description.indexOf('.'))
        }
      </CardContent>

      <CardFooter className ="flex gap-2">
        <Link to = {`/job/${job.id}`} className = "flex-1">
            <Button variant = "secondary" className = " w-full rounded">
                More Details
            </Button>
        </Link>

        {
          !isMyJob &&(
            <Button
              variant = "outline"
              className = "w-15 cursor-pointer"
              onClick = {handleSaveJob}
              disabled = {loadingSavedJob}
            >
              {saved?(
                <Heart  size ={24} stroke = "red" fill = "red"></Heart>):
                <Heart  size = {24} ></Heart>
              }
            </Button>
          )
        }
      </CardFooter>
    </Card>
  );
};

export default JobCard;
