import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Shadcn Card components
import { Link } from "react-router-dom";
import { getAvailableTests } from "@/services/testServices";
import { toast } from "sonner";

const Dashboard = () => {
  const [availableTests, setAvailableTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await getAvailableTests();
        const tests = response.tests;

        // Separate tests into available and completed
        const available = tests.filter(test => !test.endedAt);
        const completed = tests.filter(test => test.endedAt);

        setAvailableTests(available);
        setCompletedTests(completed);

        toast.success("Tests fetched successfully");
      } catch (error) {
        toast.error(error.message || error);
      }
      setLoading(false);
    };

    fetchTests();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Available Tests</h1>
        {loading ? <p>Loading tests...</p>
        : availableTests.length === 0 ? <p>No tests available</p>
        : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTests.map((test) => (
            <Card key={test.id} className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold truncate">{test.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700">{test.description}</p>
                <Link
                  to={`/permissions/${test.id}`}
                  className="block mb-4 text-blue-500"
                >
                  <Button className="w-full">
                    Start Test
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Completed Tests</h1>
        {loading ? <p>Loading tests...</p>
        : completedTests.length === 0 ? <p>No tests available</p>
        : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTests.map((test) => (
            <Card key={test.id} className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold truncate">{test.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700">{test.description}</p>
                <p className="text-gray-500">Completed on: {new Date(test.endedAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
