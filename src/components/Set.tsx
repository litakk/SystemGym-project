import { MdOutlineSettingsBackupRestore } from "react-icons/md";

interface SetProps {
  resetProgress: () => void;
}

const Set: React.FC<SetProps> = ({ resetProgress }) => {
  return (
    <button
      onClick={resetProgress}
      className="flex w-[30%] items-center gap-3 p-4 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition active:scale-95"
    >
      <MdOutlineSettingsBackupRestore className="text-xl text-gray-600 dark:text-gray-300" />
      Сбросить данные прогресса
    </button>
  );
};

export default Set;
