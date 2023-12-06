


import React from "react";
import Image from "next/image";

interface IconTicketProps {
}

const IconTicket: React.FC<IconTicketProps> = () => {
  return (
    <div className="flex flex-col w-fit">
      <Image
        src="/icons/ticket.svg"
        width={24}
        height={24}
        alt="Picture of the author"
      />
    </div>
  );
};

export default IconTicket;
