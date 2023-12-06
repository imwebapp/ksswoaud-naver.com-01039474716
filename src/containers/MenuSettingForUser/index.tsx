'use client'

import IconArrowDown from '@/src/components/Icon/IconArrowDown'
import Image from 'next/image'
import PanelSetting from './PanelSetting'
import { authActions } from '@/src/stores/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import PopupTermInfomation from '../PopupTermInfomation'
import { SETTING_TYPE, TYPE_COMPANY_INFO } from '@/src/constants'
import { RootState } from '@/src/stores'
import { find, get } from 'lodash'
import useSetting from '@/src/hooks/useSetting'

const SettingLogout = () => {
	const { logout } = authActions
	const dispatch = useDispatch()
	const router = useRouter()
	return (
		<div
			className='rounded-lg shadow-custom'
			onClick={() => {
				dispatch(logout())
				router.replace('/login')
			}}
		>
			<div className='border-b border-[#F6F8FA] flex justify-between w-full p-3'>
				<div className='flex justify-center items-center gap-2 font-bold'>
					{/* <Image src='/icons/system.svg' width={24} height={24} alt='' /> */}
					로그아웃{' '}
				</div>
				<Image src='/icons/Arrows.svg' width={24} height={24} alt='' />
			</div>
		</div>
	)
}

const CardSocial = ({ setting }: { setting?: any }) => {
	const { getSocialLink } = useSetting()
	const value = getSocialLink(SETTING_TYPE.KAKAO_TALK_OPEN_CHAT_URL)

	return (
		<div className='rounded-lg w-[200px] flex flex-col gap-2 shadow-custom py-4 px-4  text-start text-sm ml-[20px] mr-[15px]'>
			<p className='font-semibold'>고객센터</p>
			<p className='font-normal'>평일 오전 11시 ~ 오후 7시</p>
			<p className='text-[10px]'>(주말, 공휴일 휴무/점심시간 불가)</p>
			<a href={value ?? '#'} target='_blank' rel='noopener noreferrer'>
				<button className='bg-yellow-400 w-[150px] px-2 rounded-md py-3 '>
					<div className='flex gap-2'>
						<Image src='/icons/comment.svg' width={24} height={24} alt='' />

						<p>카카오 상당톡</p>
					</div>
				</button>
			</a>
		</div>
	)
}

const CardDownloadApp = ({ setting }: { setting?: any }) => {
	const { getSocialLink } = useSetting()
	const urlApple = getSocialLink(SETTING_TYPE.APP_STORE_LINK)
	const urlGoogle = getSocialLink(SETTING_TYPE.CH_PLAY_LINK)
	return (
		<div className='rounded-lg w-[200px] flex flex-col gap-2 shadow-custom py-4 px-4  text-start text-sm mx-[15px] '>
			<p className='font-semibold'>앱 다운로드</p>

			<div className='flex flex-col gap-3 mt-3 w-[135px]'>
				<a href={urlApple ?? '#'} target='_blank' rel='noopener noreferrer'>
					<Image src='/icons/apple.svg' width={120} height={40} alt='' />
				</a>
				<a href={urlGoogle ?? '#'} target='_blank' rel='noopener noreferrer'>
					<Image src='/icons/chplay.svg' width={135} height={40} alt='' />
				</a>
			</div>
		</div>
	)
}

const ListCardInforSocial = () => {
	const setting = useSelector((state: RootState) => state.setting.data)

	return (
		<div
			className={` w-screen max-w-full ${
				isMobile ? 'no-scrollbar' : 'custom-scroll'
			}`}
		>
			<div
				className={`flex  mx-auto overflow-auto  py-3  ${
					isMobile ? 'no-scrollbar' : 'custom-scroll'
				}`}
			>
				<CardSocial setting={setting} />
				<CardDownloadApp setting={setting} />
			</div>
		</div>
	)
}

const listNote = [
	'이용약관',
	'개인정보처리방침',
	'위치정보 이용약관',
	'사업자정보 확인하기',
	'서비스 정보중개자로서, 서비스제공의 당사가 아니라는 사실을 고 지하며, 서비스의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 서비스 제공자에게 있으며, 건진 플랫폼입니다. 업소의 불법적 행위 와 관련된 일체의 민, 형사상 책임을 지지 않습니다',
]

const listNote1 = [
	{
		label: '이용약관',
		type: TYPE_COMPANY_INFO.TERM_OF_SERVICE,
	},
	{
		label: '개인정보처리방침',
		type: TYPE_COMPANY_INFO.POLICY,
	},
	{
		label: '위치정보 이용약관',
		type: TYPE_COMPANY_INFO.LOCATION_BASE_SERVICES,
	},
	{
		label: '사업자정보 확인하기',

		// type: TYPE_COMPANY_INFO.COMPANY_INPFO,
	},
]
const renderItems = (
	sts: boolean,
	setSts: Function,
	handleOpenPopup: any,
	dataContent: any,
) => {
	const getContentCompanyInfo: any = dataContent.filter(
		(v: any) => v?.type === TYPE_COMPANY_INFO.COMPANY_INPFO,
	)[0]
	return (
		<div className='grid grid-cols-2 gap-3 py-[15px] px-[15px]'>
			{listNote1.map((note, index) => {
				return (
					<div
						onClick={() => {
							note.type && handleOpenPopup(note.type)
							index === 3 && setSts(!sts)
						}}
						key={index}
						className='col-span-1 md:col-span-1 flex gap-1 font-medium text-[#27272A] font-[12px] w-max'
					>
						{note.label}
						{index === 3 && (
							<span className=' '>
								<IconArrowDown />
							</span>
						)}
					</div>
				)
			})}
			{sts && (
				<div className='col-span-2 font-[12px] text-[#52525B]'>
					<div
						className='text-[12px]'
						dangerouslySetInnerHTML={{
							__html: getContentCompanyInfo?.content,
						}}
					></div>
				</div>
			)}

			<div className='col-span-2 text-[12px] text-[#52525B]'>
				<p>
					서비스 정보중개자로서, 서비스제공의 당사가 아니라는 사실을 고 지하며,
					서비스의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 서비스
					제공자에게 있으며, 건진 플랫폼입니다. 업소의 불법적 행위 와 관련된
					일체의 민, 형사상 책임을 지지 않습니다,
				</p>
			</div>
		</div>
	)
}

const Bottom = () => {
	const [status, setStatus] = useState(true)
	const [isOpen, setOpen] = useState(false)
	const [type, setType] = useState()
	const handleOpenPopup = (v: any) => {
		setType(v)
		setOpen(true)
	}
	const dataContent = useSelector((state: RootState) => state.content.data)

	const getContentCompanyInfo: any = dataContent.filter(
		(v: any) => v?.type === TYPE_COMPANY_INFO.COMPANY_INPFO,
	)[0]
	return (
		<div className='text-xs text-start bg-[#F6F8FA] py-2 rounded-xl  mx-[20px] '>
			{renderItems(status, setStatus, handleOpenPopup, dataContent)}
			<PopupTermInfomation
				open={isOpen}
				onClose={() => setOpen(false)}
				typeCompany={type}
			/>
		</div>
	)
}

const MenuSettingForUser = () => {
	return (
		<div className='pb-[100px] max-w-[502px] mx-auto'>
			<div className='flex flex-col gap-5  px-5'>
				<PanelSetting />
				<SettingLogout />
			</div>
			<ListCardInforSocial />

			<Bottom />
		</div>
	)
}

export default MenuSettingForUser
