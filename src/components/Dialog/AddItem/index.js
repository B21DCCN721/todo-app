import { useState } from "react";

function AddItem({ hide, cancel, apply }) {
  const [valueNote, setValueNote] = useState("");
  const handleCancel = () => {
    cancel(!hide);
  };
  const handleApply = () => {
    apply(!hide, valueNote);
  };
  return (
    <div className="w-full h-screen bg-gray-500/50 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-[500px] h-[290px] bg-white rounded-md">
        <h1 className="font-medium text-2xl my-3 text-center">New Note</h1>
        <div className="flex justify-center">
          <input
            placeholder="Nhập ghi chú mới"
            className="w-4/5 px-3 py-1 rounded border border-purple focus:outline-indigo-300 mx-auto"
            value={valueNote}
            autoFocus
            onChange={(e) => setValueNote(e.target.value)}
          />
        </div>
        <div className="w-4/5 flex justify-between mx-auto mt-5 mt-[150px]">
          <button
            className="border border-purple rounded w-[110px] h-[38px] text-lg text-purple font-medium hover:opacity-75"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="border border-purple rounded w-[110px] h-[38px] text-lg text-white bg-purple font-medium hover:opacity-75"
            disabled={valueNote===""}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
