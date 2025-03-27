import { GiProgression } from "react-icons/gi";


interface ProgresProps {
    
}
 
const Progres: React.FC<ProgresProps> = () => {
    return ( 
        <>
        <div>


<div className="flex items-center gap-3 p-4 border rounded-lg shadow-md bg-white">

<GiProgression className="text-xl text-gray-600"/>
    <h3 className="text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer">Прогресс: 1/3 упражнений выполнено</h3>
</div>


        </div>
        </>
     );
}
 
export default Progres;