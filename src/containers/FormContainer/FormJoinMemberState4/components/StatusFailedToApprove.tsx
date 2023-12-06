import React from 'react';
import Button from '@/src/components/Button';
import Image from 'next/image';

interface StatusFailedToApproveProps {
  onClick: () => void;
}

const StatusFailedToApprove: React.FC<StatusFailedToApproveProps> = ({ onClick }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 px-10'>
      <Image src={'/icons/face-fail.svg'} width={145} height={144} alt='emoji face failed' />
      <p className='text-lg font-bold'>심사승인 실패</p>
      <p className='text-md'>정보확인 결과 심사에 탈락되셨습니다. 재가입 부탁드립니다.</p>
      <Button onClick={onClick} className='w-[120px] bg-transparent text-blue-400 border border-blue-400 '>
        <p className='font-medium text-blue-400'>Retry</p>
      </Button>
    </div>
  );
};

export default StatusFailedToApprove;
