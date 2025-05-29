"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getTasks, createTask, deleteTask } from "@/lib/api/tasks";

interface Task {
  id: number;
  name: string;
  status: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    getTasks(token)
      .then(setTasks)
      .catch((e) => setError(e.message));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return setError("Not authenticated");
    try {
      const created = await createTask({ name, status }, token);
      setTasks((prev) => [...prev, created]);
      setName("");
      setStatus("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return setError("Not authenticated");
    try {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleAdd}>
            <Input
              placeholder="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Status (e.g. pending, running, done)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <Button type="submit">Add Task</Button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tasks List</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-muted-foreground">No tasks.</div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="border rounded p-2 flex flex-col md:flex-row md:items-center md:gap-4">
                  <span><b>Name:</b> {t.name}</span>
                  <span><b>Status:</b> {t.status}</span>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
