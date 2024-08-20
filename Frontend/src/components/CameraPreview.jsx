import { useEffect, useRef } from 'react';

const CameraPreview = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    getCameraStream();
  }, []);

  return (
    <div className="flex justify-center items-center h-full bg-gray-800">
      <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg shadow-lg" />
    </div>
  );
};

export default CameraPreview;
 