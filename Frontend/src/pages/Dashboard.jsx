import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Dashboard</h2>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to the Test Dashboard
        </h1>
        <Link
          to="/permissions"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Test
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
