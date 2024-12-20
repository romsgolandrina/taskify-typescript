import { Task } from "@/zustand/stores/task";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import SingleTask from "./SingleTask";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  droppableId: string;
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  droppableId,
  title,
}) => {
  return (
    <div className="flex-1">
      <h2 className="text-white text-2xl mb-4">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="w-full flex flex-col bg-[#32486d] p-4 rounded-md min-h-[300px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <SingleTask
                index={index}
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
