import React from "react";
import Image from "next/image";

const IconRemove: React.FC = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image src="/icons/remove.svg" width={25} height={24} alt="icon remove" />
    </div>
  );
};

export default IconRemove;
