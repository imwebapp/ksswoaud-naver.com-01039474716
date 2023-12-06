import React from "react";
import Image from "next/image";

interface IconFacebookProps {}

const IconBack: React.FC<IconFacebookProps> = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        src="/icons/back.svg"
        width={8}
        height={8}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconBack;
