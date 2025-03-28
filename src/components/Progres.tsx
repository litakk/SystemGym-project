import { GiProgression } from "react-icons/gi";

interface ProgresProps {
  completed: number;
  total: number;
}

const Progres: React.FC<ProgresProps> = ({ completed, total }) => {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg shadow-md bg-white">
      <GiProgression className="text-xl text-gray-600" />
      <h3 className="text-lg font-semibold text-gray-800">
        Прогресс: {completed}/{total} упражнений выполнено
      </h3>
    </div>
  );
};

export default Progres;
