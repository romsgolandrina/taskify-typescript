import React, { useState } from "react";
import "./App.css";
import { FaTasks } from "react-icons/fa";
import InputField from "../components/customs/Forms/InputField";
import { Task } from "@/zustand/stores/task";
import TaskList from "../components/customs/Forms/TaskList";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: task, isDone: false },
      ]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add: Task;
    let active = [...tasks];
    let complete = [...completedTasks];

    if (source.droppableId === "TasksList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TasksList") {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app w-screen min-h-screen bg-[#213555] flex flex-col items-center">
        <span className="uppercase text-[40px] mt-[30px] text-white z-[1] text-center font-semibold flex items-center">
          <span className="text-[#f1a131] flex items-center gap-2">
            <FaTasks size={40} />
            Task
          </span>
          ify
        </span>

        <InputField
          task={task}
          setTask={setTask}
          handleAddTask={handleAddTask}
        />

        <div className="flex w-[95%] gap-8 mt-8">
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            droppableId="TasksList"
            title="Active Tasks"
          />
          <TaskList
            tasks={completedTasks}
            setTasks={setCompletedTasks}
            droppableId="CompletedList"
            title="Completed Tasks"
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
