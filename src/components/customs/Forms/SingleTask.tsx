import React, { useRef, useState, useEffect } from "react";
import { Task } from "@/zustand/stores/task";
import { Draggable } from "@hello-pangea/dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<Props> = ({ index, task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, title: editTask } : t))
    );
    setEdit(false);
  };

  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleDone = () => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={handleEdit}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`w-full flex rounded-[20px] p-[20px] mt-[15px] bg-[#D8C4B6] transition-all duration-200 ${
            snapshot.isDragging ? "shadow-lg" : ""
          }`}
        >
          {edit ? (
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="flex-1 p-[5px] border-none text-[20px] focus:outline-none bg-transparent"
              ref={inputRef}
            />
          ) : task.isDone ? (
            <s className="flex-1 p-[5px] border-none text-[20px]">
              {task.title}
            </s>
          ) : (
            <span className="flex-1 p-[5px] border-none text-[20px]">
              {task.title}
            </span>
          )}
          <div className="flex gap-[10px]">
            <span
              className="cursor-pointer text-[25px] text-[#3E5879] hover:text-[#2a3e55] transition-colors"
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="cursor-pointer text-[25px] text-[#3E5879] hover:text-[#2a3e55] transition-colors"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </span>
            <span
              className="cursor-pointer text-[25px] text-[#3E5879] hover:text-[#2a3e55] transition-colors"
              onClick={handleDone}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
