import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./Darkbtn";
import { method, useApi } from "./hooks/useApi";
import { useState, useRef } from "react";
interface ExerciseFormProps {}

const ExerciseForm: React.FC<ExerciseFormProps> = () => {
  const [input, setInput] = useState("");
  const [compl, setCompl] = useState(false);
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);

  const Submit = (e: Reac.FormEvent) => {
    e.preventDefault()
    const AddExercise = {
      id: String(Date.now()),
      title: input,
      completed: compl,
    };

    fetchData("/exercises", method.post, AddExercise)
      .then(() => {
        setInput("");
        setCompl(false)
      })
      .catch((err: unknown) => console.error("Ошибка при добавлении", err));
    console.log(input);
  };

  return (
    <div className="w-full p-7">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="font-bold text-xl text-gray-900 dark:text-gray-100">
          Приложение для планирования и отслеживания тренировок
        </h1>
        <ModeToggle />
      </div>
      <br />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={compl}
          onChange={() => setCompl(!compl)}
          className="w-5 h-5"
        />

        <Input
          type="text"
          placeholder="Введите упражнение..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300"
        />
        <Button
          type="submit"
          onClick={Submit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default ExerciseForm;
