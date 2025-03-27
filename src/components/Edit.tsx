interface EditProps {
    setModal: (state: boolean) => void;
  }
  
  const Edit: React.FC<EditProps> = ({ setModal }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full transform transition-all scale-95 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Edit Exercise</h2>
          <p className="text-gray-600 mb-4">Измени название упражнения и нажми "Save"</p>
          <input
            type="text"
            placeholder="Новое название..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setModal(false)}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Edit;
  