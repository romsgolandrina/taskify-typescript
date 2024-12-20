import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import "./styles.css";

interface InputFieldProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  task,
  setTask,
  handleAddTask,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        handleAddTask(e);
        inputRef.current?.blur();
      }}
      className="w-[95%] flex items-center relative mt-[30px]"
    >
      <input
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        className="input__box w-full border-none py-[20px] px-[30px] rounded-[50px] bg-[#D8C4B6] text-[#3E5879] font-semibold"
      />
      <Button
        type="submit"
        className="input__submit absolute rounded-full bg-[#3E5879] text-white w-[50px] h-[50px] m-[12px] right-0 border-none text-[15px] uppercase"
      >
        Add
      </Button>
    </form>
  );
};

export default InputField;
