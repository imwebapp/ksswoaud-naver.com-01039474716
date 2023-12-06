import Image from "next/image";
import SuffixIcon from "../SuffixIcon";
import PrefixIcon from "../PrefixIcon";
import { FC } from "react";

interface SelectPhoneNumberProps {
  error?: boolean;
}
const SelectPhoneNumber: FC<SelectPhoneNumberProps> = ({ error }) => {
  const borderError = error
    ? "focus:outline-none border-red-500"
    : "focus:border-[#D7EAFA] focus:outline-none focus:border";
  return (
    <div className="flex flex-col w-full max-w-sm mx-auto p-2  bg-white">
      <div className="flex flex-col mb-2">
        <div className="relative">
          <PrefixIcon
            icon={
              <div className="flex justify-center items-center gap-2 px-2">
                <Image src={"/icons/kr.svg"} width={32} height={24} alt="" />
                <p className="text-sm">+82</p>
              </div>
            }
          />
          <input
            pattern="/^([0-9]){0,10}$/"
            id="phone"
            name="phone"
            type="number"
            placeholder="전화 번호"
            className={`text-sm sm:text-base bg-[#F6F8FA] relative w-full outline-1 border border-[#EAEFF3] rounded-2xl placeholder-gray-400 py-2 pr-2 pl-24 py-4 ${borderError} `}
          />
          <SuffixIcon />
        </div>
      </div>
    </div>
  );
};

export default SelectPhoneNumber;
