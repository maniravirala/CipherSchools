import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PermissionPage = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [micStatus, setMicStatus] = useState("checking"); // 'ok', 'error', 'checking'
  const [cameraStatus, setCameraStatus] = useState("checking"); // 'ok', 'error', 'checking'
  const {id} = useParams();

  const checkPermissions = () => {
    // Reset status to checking
    setMicStatus("checking");
    setCameraStatus("checking");

    // Check for camera permissions
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setIsCameraOn(true);
        setCameraStatus("ok");
      })
      .catch(() => {
        setCameraStatus("error");
      });

    // Check for microphone permissions
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setMicStatus("ok");
      })
      .catch(() => {
        setMicStatus("error");
      });
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const statusIcon = (status) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="text-green-500" />;
      case "error":
        return <XCircle className="text-red-500" />;
      case "checking":
      default:
        return <Loader2 className="animate-spin text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="w-full md:w-1/2 flex justify-center h-80">
        {isCameraOn ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg border-2 border-gray-300"
            videoConstraints={{
              width: 1280,
              height: 420,
              facingMode: "user",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg text-gray-500">Loading camera...</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl">Environment Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              {statusIcon(cameraStatus)}
              <p className="text-lg">
                Camera: {cameraStatus === "ok" ? "OK" : "Error"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {statusIcon(micStatus)}
              <p className="text-lg">
                Microphone: {micStatus === "ok" ? "OK" : "Error"}
              </p>
            </div>
            {cameraStatus === "ok" && micStatus === "ok" ? (
              <Link to={`/test-page/${id}`}>
                <Button className="w-full mt-4">
                  Proceed to Test
                </Button>
              </Link>
            ) : (
              <Button
                onClick={checkPermissions}
                variant="destructive"
                className="w-full"
              >
                Retry
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PermissionPage;
