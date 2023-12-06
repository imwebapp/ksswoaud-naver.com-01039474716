import React from "react";
import Image from "next/image";

interface IconGoogleProps {
  label: string;
}

const IconGoogle: React.FC<IconGoogleProps> = ({ label }) => {
  return (
    <div className="flex flex-col w-fit gap-2">
      <Image src="/icons/google.svg" width={60} height={60} alt={label} />
      <p className="text-[#71717A] text-[12px]">{label}</p>
    </div>
  );
};

export default IconGoogle;
