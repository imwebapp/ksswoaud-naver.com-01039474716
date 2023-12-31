import { FC } from "react";

const BottomSheet : FC = () => {
  return (
    <>
      <div className="flex ">
        <input
          type="checkbox"
          id="drawer-toggle"
          className="relative sr-only peer"
        />
        <label
          htmlFor="drawer-toggle"
          className="absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64 z-40"
        >
          <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
          <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
        </label>
        <div className="fixed bottom-0 left-0 z-20 w-full h-64 transition-all duration-500 transform -translate-y-full bg-red-400 shadow-lg peer-checked:translate-y-0">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold">Drawer</h2>
            <p className="text-gray-500">This is a drawer.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
