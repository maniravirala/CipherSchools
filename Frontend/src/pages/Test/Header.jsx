import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";

const Header = ({ data, handleSubmitTest, duration }) => {    

  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleSubmitTest();
    }

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitTest]);

  return (
    <header className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-sky-600 to-indigo-800 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="size-10 rounded-full bg-gray-200 flex justify-center items-center text-gray-500 text-xl font-bold">
          {data.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
        <span className="font-semibold text-lg">{data.name}</span>
      </div>
      <div className="">
        <span className="font-semibold text-lg">{data.testName}</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex flex-col justify-center items-center">
          <span className="font-semibold text-sm">Time Remaining</span>
          <span className="mt-1 px-6 py-1 rounded-lg font-semibold text-lg bg-gray-200 bg-opacity-20">
            {formatTime(timeLeft)}
          </span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" className="font-medium text-xl">
              Submit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmitTest}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* <Button
          variant="secondary"
          onClick={handleSubmitTest}
          className="font-medium text-xl"
        >
          Submit
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
