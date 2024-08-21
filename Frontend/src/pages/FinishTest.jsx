import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

const FinishTest = () => {

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
        />
      <div className="text-center z-10">
        <h1 className="text-3xl font-bold">Test Submitted!</h1>
        <p className="mt-4 text-lg">Thank you for completing the test. Your answers have been submitted successfully.</p>
        <p className="mt-2 text-md">Please check your email for the results.</p>
        <Button asChild className="mt-8"><Link to="/">Go to Dashboard</Link></Button>
      </div>
    </div>
  );
};

export default FinishTest;
