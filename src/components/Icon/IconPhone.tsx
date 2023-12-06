import React from "react";
import Image from "next/image";

interface IconPhoneProps {}

const IconPhone: React.FC<IconPhoneProps> = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        src="/icons/phone.svg"
        width={20}
        height={20}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconPhone;
