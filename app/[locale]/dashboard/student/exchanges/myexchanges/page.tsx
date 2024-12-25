"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/data-table";

// Define the Task interface
interface Task {
  id: string;
  name: string;
  typeofexchange: string;
  createddate: boolean;
  enddate: boolean;
  status: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = [
  {
    id: 1,
    name: "arati",
    typeofexchange: "asdsn",
    createddate: 9 - 8 - 90,
    enddate: 9 - 8 - 90,
  },
  {
    id: 2,
    name: "arati",
    typeofexchange: "asdsn",
    createddate: 9 - 8 - 90,
    enddate: 9 - 8 - 90,
  },
];

const HomePage: React.FC = () => {
  // Explicitly set the type for tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the API
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data: Task[]) => setTasks(data)); // Ensure fetched data is typed as Task[]
  }, []);

  const handleUpdate = async (task: Task) => {
    // Update the task via API
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, task }),
    });

    // Update the state
    setTasks(
      (prev) => prev.map((t) => (t.id === task.id ? task : t)) // Update the specific task
    );
  };

  const handleDelete = async (id: string) => {
    // Delete the task via API
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // Update the state by filtering out the deleted task
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DataTable data={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
  );
};

export default HomePage;
