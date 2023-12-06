import React from 'react';
import Button from '@/src/components/Button';
import Image from 'next/image';

interface StatusSuccessToApproveProps {
  onClick: () => void;
}

const StatusSuccessToApprove: React.FC<StatusSuccessToApproveProps> = ({ onClick }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 px-10'>
      <Image src={'/icons/success.svg'} width={145} height={144} alt='emoji face failed' />
      <p className='text-lg font-bold'>회원가입 접수완료</p>
      <p className='text-md'>
        회원님이 성인임을 확인 후 승인될 예정입니다. 확인 후 로그인해주세요.
        (12시간안에 승인 예정)
      </p>
      <Button
        onClick={onClick}
        className='w-[120px] bg-transparent text-gray-400 border border-gray-400 '
      >
        <p className='font-medium text-black'>닫기</p>
      </Button>
    </div>
  );
};

export default StatusSuccessToApprove;
