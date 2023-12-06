import Dialog from '@/src/components/Dialog'
import PinControl from '@/src/components/PinControl'
import { useEffect } from 'react'

const IcBack = () => {
	return (
		<svg
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect x='0.5' y='0.5' width='39' height='39' rx='9.5' stroke='#F0F5F9' />
			<path
				d='M22.5 25L17.5 20L22.5 15'
				stroke='#697896'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

interface VerifyOTPDialogProps {
	open?: boolean
	onClose?: () => void
	userConfirmOTP?: (otp: string) => void
	userPhone?: any
	type?: string
}

const VerifyOTPDialog: React.FC<VerifyOTPDialogProps> = ({
	open = false,
	onClose = () => {},
	userConfirmOTP = () => {},
	userPhone,
	type = '',
}) => {
	return (
		<Dialog open={open} onClose={onClose} fullScreen fullWidth>
			<div className='p-4 flex flex-col gap-5 pt-8 max-w-[502px] mx-auto'>
				<div className='w-full text-start flex justify-start' onClick={onClose}>
					<div onClick={() => onClose()}>
						<IcBack />
					</div>
				</div>

				<div className='flex flex-col justify-start items-start'>
					<div className='font-bold text-[22px]'>
						<p>전화 인증</p>
					</div>
					<div className='text-[#6D727A] mt-1'> {userPhone?.phone}</div>
					<div className='text-[#6D727A] mt-1'>
						번호로 코드를 보내드렸습니다
					</div>
				</div>
				<div>
					<PinControl
						type={type}
						userPhone={userPhone}
						userConfirmOTP={userConfirmOTP}
						context={{
							onClose: onClose,
						}}
					/>
				</div>
			</div>
		</Dialog>
	)
}

export default VerifyOTPDialog
