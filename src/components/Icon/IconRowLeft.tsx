import React from "react";
import Image from "next/image";

interface IconArrowLeftProps {
}

const IconArrowLeft: React.FC<IconArrowLeftProps> = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        src="/icons/arrow-left.svg"
        width={24}
        height={25}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconArrowLeft;
