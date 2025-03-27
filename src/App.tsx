import ExerciseForm from "./components/ExerciseForm";
import ExerciseList from "./components/ExerciseList";
import Progres from "./components/Progres";
import Set from "./components/Set";
import { ThemeProvider } from "@/components/theme-provider"

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <>
      <div>
        <div className="space-y-4 p-4">
          <ExerciseForm />
          <ExerciseList />
          <div className="flex gap-5">
          <Progres/>
          <Set />
          </div>
        </div>
      </div>
    </>
    </ThemeProvider>
  );
};

export default App;
