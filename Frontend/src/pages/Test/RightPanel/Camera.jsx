import Webcam from "react-webcam";

const Camera = () => {
    return (
        <div className="mt-4 flex justify-center">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          className="rounded-lg border-2 border-gray-300"
          videoConstraints={{
            height: 200,
            facingMode: "user",
          }}
        />
      </div>
    );
}

export default Camera;