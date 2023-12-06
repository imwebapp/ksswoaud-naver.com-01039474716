


import React from "react";
import Image from "next/image";

interface IconSmileProps {
}

const IconSmile: React.FC<IconSmileProps> = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        src="/icons/smile.svg"
        width={24}
        height={24}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconSmile;
