import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "./ui/card";
import { CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const JobCard = ({
  job,
  savedInit = false,
  isMyJob = false,
  onJobSaved = () => {},
  onJob,
}) => {
  const { user } = useUser();

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

        <Heart size = {20} stroke="red" fill = "red"></Heart>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
