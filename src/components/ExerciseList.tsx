import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Edit from "./Edit";
import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { method, useApi } from "./hooks/useApi";

interface Exercise {
  id: string;
  title: string;
  completed: boolean;
}

const ExerciseEditForm: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH);

  useEffect(() => {
    fetchData("/exercises", method.get).then((res) => setExercises(res?.data));
  }, []);

  const DeleteBtn = async (id: string) => {
    console.log(`Trying to delete exercise with ID: ${id}`);
    try { 
      await fetch(import.meta.env.VITE_PUBLIC_PATH + `/exercises/${String(id)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
    } catch (e) {
      console.log(e);
      
    }
  }


  return (
    <>
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
        >
          <Checkbox checked={exercise.completed} className="bg-gray-400" />
          <h4 className="text-black text-lg font-medium">{exercise.title}</h4>

          <div className="flex gap-2 ml-auto">
            <Button
              onClick={() => setModal(true)}
              variant="outline"
              className="text-sm"
            >
              Edit
            </Button>

            <RiDeleteBin2Fill
              className="text-red-500 cursor-pointer hover:text-red-700 m-2"
              size={20}
              onClick={() => DeleteBtn(exercise.id)}
            />
          </div>
        </div>
      ))}

      {modal && <Edit setModal={setModal} />}
    </>
  );
};

export default ExerciseEditForm;
