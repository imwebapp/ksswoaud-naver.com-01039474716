import React from "react";
import Image from "next/image";

interface IconFacebookProps {
  label: string;
}

const IconFacebook: React.FC<IconFacebookProps> = ({ label }) => {
  return (
    <div className="flex flex-col w-fit gap-2">
      <Image
        src="/icons/facebook.svg"
        width={60}
        height={60}
        alt="Picture of the author"
      />
      <p className="text-[#71717A] text-[12px]">{label}</p>
    </div>
  );
};

export default IconFacebook;
