import React, { FC, useState, ChangeEvent } from "react";
import { TiTick } from "react-icons/ti";

interface CheckBoxProps {
  label?: string;
}

const CheckBox: FC<CheckBoxProps> = ({ label }) => {
  const [state, setState] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.checked);
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-row">
        <input
          type="checkbox"
          id="cb1"
          checked={state}
          onChange={handleChange}
          className="
          rounded
          appearance-none h-6 w-6 border
          checked:bg-gray-800
          transition-all duration-200 peer
        "
        />
        <div
          className="rounded h-6 w-6 absolute pointer-events-none flex justify-center items-center
        peer-checked:border-green-300  
        "
        >
          {state && <TiTick color={"white"} size={"1.5em"} />}
        </div>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default CheckBox;
