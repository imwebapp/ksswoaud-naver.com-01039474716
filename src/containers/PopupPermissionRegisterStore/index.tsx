import { useEffect } from 'react'

import Dialog from '@/src/components/Dialog'
import KakaoIcon from '@/src/components/Icon/KakaoIcon'
import WarningIcons from '@/src/components/Icon/WarningIcons'
import useSetting from '@/src/hooks/useSetting'
import { SETTING_TYPE } from '@/src/constants'

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

interface PopupPermissionRegisterStoreProps {
	open?: boolean
	onClose?: () => void
}

const PopupPermissionRegisterStore: React.FC<
	PopupPermissionRegisterStoreProps
> = ({ open = false, onClose = () => {} }) => {
	const { getSocialLink } = useSetting()
	const value = getSocialLink(SETTING_TYPE.KAKAO_TALK_OPEN_CHAT_URL)

	const handleClickKakaoButton = () => {
		if (value) {
			window.open(value)
		}
	}

	useEffect(() => {}, [])

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth='sm'
			fullWidth
			className='mx-[15px] rounded-[12px]'
		>
			<div className='px-4 flex flex-col gap-5 pt-[30px] pb-[30px] justify-center items-center max-w-[502px] mx-auto'>
				<WarningIcons />
				<div className='text-center font-medium text-[20px]'>
					<p>운영자에게 문의해 주세요</p>
					<p>현재 매장을 등록할 수 있는 권한이</p>
					<p>없습니다</p>
				</div>
				<div className='p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] rounded mb-5'>
					<button
						className='flex items-center gap-2 py-2 px-4 bg-[#FDDD00] text-black
            rounded font-medium'
						onClick={handleClickKakaoButton}
					>
						<KakaoIcon />
						<span>카카오톡 문의 (터치)</span>
					</button>
				</div>
				<button
					onClick={onClose}
					className='w-[96px] h-[48px] border !border-[#4490FA] text-[#4490FA] font-medium'
				>
					닫기
				</button>
			</div>
		</Dialog>
	)
}

export default PopupPermissionRegisterStore
