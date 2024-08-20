import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Shadcn Card components
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Mock API call to fetch available tests
    const fetchTests = async () => {
      const response = [
        {
          id: 1,
          name: "Math Test",
          description: "A test on basic math skills",
        },
        {
          id: 2,
          name: "Science Test",
          description: "A test on basic science knowledge",
        },
        // Add more tests here
      ];
      setTests(response);
    };
    fetchTests();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Available Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-semibold">{test.name}</h2>
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
    </div>
  );
};

export default Dashboard;
