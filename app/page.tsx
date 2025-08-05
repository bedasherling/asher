// app/page.tsx
"use client"; // 👈 Required in Next.js App Router for components using state/hooks


// 📦 React state for interactivity
import { useState } from "react";

// 🎛️ Radix UI icons for cool button visuals
import {
  CheckIcon,
  Pencil1Icon,
  TrashIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

// 🔧 Utility for conditional classes
import clsx from "clsx";

// 🧠 UUID to uniquely identify each task
import { v4 as uuidv4 } from "uuid";

// 📘 Define the structure of a task (TypeScript FTW!)
type Task = {
  id: string;
  title: string;
  completed: boolean;
};

// 🧠 Our main to-do page component
export default function TodoPage() {
  // ✨ Local state for storing and interacting with tasks
  const [tasks, setTasks] = useState<Task[]>([]); // 🗃️ All tasks
  const [newTask, setNewTask] = useState("");     // 🆕 New task input
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // ✏️ ID of the task being edited
  const [editedTaskTitle, setEditedTaskTitle] = useState("");              // 📝 New title during editing

  // ➕ Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return; // 🛑 Don't allow empty tasks

    const newEntry: Task = {
      id: uuidv4(),
      title: newTask,
      completed: false,
    };

    // Add task to top of the list 📋
    setTasks([newEntry, ...tasks]);

    // Clear input field 🧹
    setNewTask("");
  };

  // ✅ Toggle completion of a task
  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // ❌ Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // ✏️ Start editing a task
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskTitle(task.title);
  };

  // 💾 Save the edited task title
  const saveEditedTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTaskId
        ? { ...task, title: editedTaskTitle }
        : task
    ));

    // Reset editing state ✨
    setEditingTaskId(null);
    setEditedTaskTitle("");
  };

  // 🌟 UI starts here!
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center p-8">
      {/* 📝 Page Title */}
      <h1 className="text-4xl font-bold mb-6">
        🎯 My Awesome To-Do List
      </h1>

      {/* 🆕 New Task Input Section */}
      <div className="flex w-full max-w-md mb-6 gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-3 rounded bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={addTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded"
          aria-label="Add task"
        >
          <PlusIcon />
        </button>
      </div>

      {/* 🗃️ Task List Section */}
      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-zinc-900 rounded px-4 py-3"
          >
            {/* 📌 Task Title / Editor */}
            <div
              className={clsx("flex-1 text-left cursor-pointer", {
                "line-through text-zinc-500": task.completed,
              })}
              onClick={() => toggleComplete(task.id)}
            >
              {editingTaskId === task.id ? (
                <input
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  className="bg-transparent border-b border-zinc-500 focus:outline-none text-white"
                />
              ) : (
                task.title
              )}
            </div>

            {/* 🛠️ Action Buttons */}
            <div className="flex gap-3 items-center">
              {editingTaskId === task.id ? (
                <button
                  onClick={saveEditedTask}
                  className="text-green-500 hover:text-green-400"
                  aria-label="Save task"
                >
                  <CheckIcon />
                </button>
              ) : (
                <button
                  onClick={() => startEditing(task)}
                  className="text-yellow-500 hover:text-yellow-400"
                  aria-label="Edit task"
                >
                  <Pencil1Icon />
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-400"
                aria-label="Delete task"
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}