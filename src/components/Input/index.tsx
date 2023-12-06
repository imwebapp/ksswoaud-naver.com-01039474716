"use client";

import React, { FC, useState } from "react";
import PrefixIcon from "../PrefixIcon";
import SuffixIcon from "../SuffixIcon";

interface InputProps {
  label?: string;
  error?: string;
  prefixICon?: any;
}
const Input: FC<InputProps> = ({
  label,
  error = false,
  prefixICon,
  ...rest
}) => {
  const [state, setState] = useState("");
  const borderError = error
    ? "focus:outline-none border-red-500"
    : "focus:border-gray-900 focus:outline-none focus:border";

  const onChange = (e: any) => {
    setState(e?.target?.value);
  };
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto p-2  bg-white">
      <div className="flex flex-col mb-2">
        <div className="relative">
          <PrefixIcon icon={prefixICon} />
          <input
            {...rest}
            value={state}
            onChange={onChange}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className={`text-sm sm:text-base bg-[#F6F8FA] relative w-full outline-1 border border-white rounded-2xl placeholder-gray-400 py-2 pr-2 pl-12 py-4 ${borderError} `}
          />
          <SuffixIcon />
        </div>
      </div>
    </div>
  );
};
export default Input;
