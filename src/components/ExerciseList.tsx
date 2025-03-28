import { useEffect, useReducer } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { method, useApi } from "./hooks/useApi";
import Progres from "./Progres";
import Set from "./Set";

interface Exercise {
  id: string;
  title: string;
  completed: boolean;
}

type Action =
  | { type: "SET_EXERCISES"; payload: Exercise[] }
  | { type: "TOGGLE_EXERCISE"; payload: string }
  | { type: "DELETE_EXERCISE"; payload: string }
  | { type: "RESET_PROGRESS"; payload: Exercise[] };

const reducer = (state: Exercise[], action: Action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return action.payload;
    case "TOGGLE_EXERCISE":
      return state.map((exercise) =>
        exercise.id === action.payload
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      );
    case "DELETE_EXERCISE":
      return state.filter((exercise) => exercise.id !== action.payload);
    case "RESET_PROGRESS":
      return action.payload; // Теперь загружаем новые данные с API
    default:
      return state;
  }
};

const ExerciseEditForm: React.FC = () => {
  const [exercises, dispatch] = useReducer(reducer, []);
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);

  const loadExercises = async () => {
    const res = await fetchData("/exercises", method.get);
    if (res?.data) {
      dispatch({ type: "SET_EXERCISES", payload: res.data });
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const toggleExercise = async (id: string) => {
    const updatedExercise = exercises.find((ex) => ex.id === id);
    if (!updatedExercise) return;

    try {
      await fetch(import.meta.env.VITE_PUBLIC_PATH + `/exercises/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !updatedExercise.completed }),
      });
      dispatch({ type: "TOGGLE_EXERCISE", payload: id });
    } catch (e) {
      console.log("Ошибка обновления:", e);
    }
  };

  const deleteExercise = async (id: string) => {
    try {
      await fetch(import.meta.env.VITE_PUBLIC_PATH + `/exercises/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_EXERCISE", payload: id });
    } catch (e) {
      console.log("Ошибка удаления:", e);
    }
  };

  const resetProgress = async () => {
    try {
      await Promise.all(
        exercises.map((exercise) =>
          fetch(import.meta.env.VITE_PUBLIC_PATH + `/exercises/${exercise.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: false }),
          })
        )
      );
      loadExercises(); // После сброса перезапрашиваем данные
    } catch (e) {
      console.log("Ошибка сброса прогресса:", e);
    }
  };

  return (
    <>
      <Progres
        completed={exercises.filter((ex) => ex.completed).length}
        total={exercises.length}
      />

      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
        >
          <Checkbox
            checked={exercise.completed}
            onCheckedChange={() => toggleExercise(exercise.id)}
            className="bg-gray-400"
          />
          <h4 className="text-black text-lg font-medium">{exercise.title}</h4>

          <RiDeleteBin2Fill
            className="text-red-500 cursor-pointer hover:text-red-700 ml-auto"
            size={20}
            onClick={() => deleteExercise(exercise.id)}
          />
        </div>
      ))}

      <Set resetProgress={resetProgress} />
    </>
  );
};

export default ExerciseEditForm;
