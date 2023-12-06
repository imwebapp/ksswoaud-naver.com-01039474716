import React from 'react';
import Image from 'next/image';
import Dialog from '../Dialog';

interface ModalChangePhoneSuccessProps {
  open: boolean;
  onClose: () => void;
  newPhone? : any
}

const ModalChangePhoneSuccess: React.FC<ModalChangePhoneSuccessProps> = ({ open, onClose,newPhone }) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <div className='flex flex-col justify-center items-center p-6 gap-3'>
        <Image src='/icons/success.svg' width={176} height={176} alt='' />
        <p className='font-bold'>휴대폰 번호변경 성공!</p>
        <p>
          당신의 새로운 번호는 <span className='font-bold'>{newPhone}</span>
        </p>
        <button onClick={onClose} className='w-full text-gray-800 bg-[#F2F2F5] px-3 py-2 my-3'>
          닫기
        </button>
      </div>
    </Dialog>
  );
};

export default ModalChangePhoneSuccess;
