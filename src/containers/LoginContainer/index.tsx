'use client'

import BackButton from '@/src/components/BackButton'
import Button from '@/src/components/Button'
import CheckboxField from '@/src/components/FormField/CheckboxField'
import InputField from '@/src/components/FormField/InputField'
import IconArrowDown from '@/src/components/Icon/IconArrowDown'
import IconEmail from '@/src/components/Icon/IconEmail'
import IconFacebook from '@/src/components/Icon/IconFacebook'
import IconGoogle from '@/src/components/Icon/IconGoogle'
import IconLock from '@/src/components/Icon/IconLock'
import IconRemove from '@/src/components/Icon/IconRemove'
import IconTalk from '@/src/components/Icon/IconTalk'
import Section from '@/src/components/Section'
import Link from 'next/link'

import useLogin from './useLogin'
import { useEffect, useState } from 'react'
import ModalVerifyPhone from '../ModalVerifyPhone'
import ModalAuditCertification from '../ModalAuditCertification'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { get, isEmpty } from 'lodash'
import PopupTermInfomation from '../PopupTermInfomation'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/stores'
import { SETTING_TYPE, TYPE_COMPANY_INFO } from '@/src/constants'
import useSetting from '@/src/hooks/useSetting'

const IcsEmail = () => {
	return (
		<svg
			width='22'
			height='18'
			viewBox='0 0 22 18'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.94358 0.25H13.0564C14.8942 0.249984 16.3498 0.249972 17.489 0.403135C18.6614 0.560763 19.6104 0.89288 20.3588 1.64124C21.1071 2.38961 21.4392 3.33856 21.5969 4.51098C21.75 5.65019 21.75 7.10583 21.75 8.94359V9.05641C21.75 10.8942 21.75 12.3498 21.5969 13.489C21.4392 14.6614 21.1071 15.6104 20.3588 16.3588C19.6104 17.1071 18.6614 17.4392 17.489 17.5969C16.3498 17.75 14.8942 17.75 13.0564 17.75H8.94359C7.10583 17.75 5.65019 17.75 4.51098 17.5969C3.33856 17.4392 2.38961 17.1071 1.64124 16.3588C0.89288 15.6104 0.560763 14.6614 0.403135 13.489C0.249972 12.3498 0.249984 10.8942 0.25 9.05642V8.94358C0.249984 7.10582 0.249972 5.65019 0.403135 4.51098C0.560763 3.33856 0.89288 2.38961 1.64124 1.64124C2.38961 0.89288 3.33856 0.560763 4.51098 0.403135C5.65019 0.249972 7.10582 0.249984 8.94358 0.25ZM4.71085 1.88976C3.70476 2.02502 3.12511 2.27869 2.7019 2.7019C2.27869 3.12511 2.02502 3.70476 1.88976 4.71085C1.75159 5.73851 1.75 7.09318 1.75 9C1.75 10.9068 1.75159 12.2615 1.88976 13.2892C2.02502 14.2952 2.27869 14.8749 2.7019 15.2981C3.12511 15.7213 3.70476 15.975 4.71085 16.1102C5.73851 16.2484 7.09318 16.25 9 16.25H13C14.9068 16.25 16.2615 16.2484 17.2892 16.1102C18.2952 15.975 18.8749 15.7213 19.2981 15.2981C19.7213 14.8749 19.975 14.2952 20.1102 13.2892C20.2484 12.2615 20.25 10.9068 20.25 9C20.25 7.09318 20.2484 5.73851 20.1102 4.71085C19.975 3.70476 19.7213 3.12511 19.2981 2.7019C18.8749 2.27869 18.2952 2.02502 17.2892 1.88976C16.2615 1.75159 14.9068 1.75 13 1.75H9C7.09318 1.75 5.73851 1.75159 4.71085 1.88976ZM4.42383 4.51986C4.68901 4.20165 5.16193 4.15866 5.48014 4.42383L7.63903 6.22291C8.57199 7.00038 9.21973 7.53842 9.76658 7.89013C10.2959 8.23059 10.6549 8.34488 11 8.34488C11.3451 8.34488 11.7041 8.23059 12.2334 7.89013C12.7803 7.53842 13.428 7.00038 14.361 6.22291L16.5199 4.42383C16.8381 4.15866 17.311 4.20165 17.5762 4.51986C17.8413 4.83807 17.7983 5.31099 17.4801 5.57617L15.2836 7.40658C14.3973 8.14523 13.6789 8.74392 13.0448 9.15172C12.3843 9.57653 11.7411 9.84488 11 9.84488C10.2589 9.84488 9.61567 9.57653 8.95518 9.15172C8.32112 8.74392 7.60272 8.14524 6.71636 7.40658L4.51986 5.57617C4.20165 5.31099 4.15866 4.83807 4.42383 4.51986Z'
				fill='currentColor'
			/>
		</svg>
	)
}

const IcsLock = () => {
	return (
		<svg
			width='22'
			height='22'
			viewBox='0 0 22 22'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11 12.25C11.4142 12.25 11.75 12.5858 11.75 13V17C11.75 17.4142 11.4142 17.75 11 17.75C10.5858 17.75 10.25 17.4142 10.25 17V13C10.25 12.5858 10.5858 12.25 11 12.25Z'
				fill='currentColor'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M4.25 8.30277V7C4.25 3.27208 7.27208 0.25 11 0.25C14.7279 0.25 17.75 3.27208 17.75 7V8.30277C17.9768 8.31872 18.1906 8.33948 18.3918 8.36652C19.2919 8.48754 20.0497 8.74643 20.6517 9.34835C21.2536 9.95027 21.5125 10.7081 21.6335 11.6082C21.75 12.4752 21.75 13.5775 21.75 14.9451V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H6.94513C5.57754 21.75 4.47522 21.75 3.60825 21.6335C2.70814 21.5125 1.95027 21.2536 1.34835 20.6516C0.746434 20.0497 0.487541 19.2919 0.366524 18.3918C0.249964 17.5248 0.24998 16.4225 0.250001 15.0549V14.9451C0.24998 13.5775 0.249964 12.4752 0.366524 11.6082C0.487541 10.7081 0.746434 9.95027 1.34835 9.34835C1.95027 8.74643 2.70814 8.48754 3.60825 8.36652C3.80938 8.33948 4.02317 8.31872 4.25 8.30277ZM5.75 7C5.75 4.10051 8.10051 1.75 11 1.75C13.8995 1.75 16.25 4.10051 16.25 7V8.25344C15.8765 8.24999 15.4784 8.24999 15.0549 8.25H6.94513C6.52161 8.24999 6.12353 8.24999 5.75 8.25344V7ZM3.80812 9.85315C3.07435 9.9518 2.68577 10.1322 2.40901 10.409C2.13225 10.6858 1.9518 11.0743 1.85315 11.8081C1.75159 12.5635 1.75 13.5646 1.75 15C1.75 16.4354 1.75159 17.4365 1.85315 18.1919C1.9518 18.9257 2.13225 19.3142 2.40901 19.591C2.68577 19.8678 3.07435 20.0482 3.80812 20.1469C4.56347 20.2484 5.56459 20.25 7 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 13.5646 20.2484 12.5635 20.1469 11.8081C20.0482 11.0743 19.8678 10.6858 19.591 10.409C19.3142 10.1322 18.9257 9.9518 18.1919 9.85315C17.4365 9.75159 16.4354 9.75 15 9.75H7C5.56459 9.75 4.56347 9.75159 3.80812 9.85315Z'
				fill='currentColor'
			/>
		</svg>
	)
}

const CardSocial = () => {
	const { getSocialLink } = useSetting()
	const value = getSocialLink(SETTING_TYPE.KAKAO_TALK_OPEN_CHAT_URL)
	return (
		<div className='rounded-lg max-w-[200px] flex flex-col gap-2 shadow-custom py-4 px-4  text-start text-sm max-w-full'>
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

const CardDownloadApp = () => {
	const { getSocialLink } = useSetting()
	const urlApple = getSocialLink(SETTING_TYPE.APP_STORE_LINK)
	const urlGoogle = getSocialLink(SETTING_TYPE.CH_PLAY_LINK)
	return (
		<div className='rounded-lg max-w-[200px] flex flex-col gap-2 shadow-custom py-4 px-4  text-start text-sm max-w-full'>
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
	return (
		<div className='flex justify-center items-center'>
			<div className='flex max-w-full overflow-auto no-scrollbar py-3 gap-3.5 px-1'>
				<CardSocial />
				<CardDownloadApp />
			</div>
		</div>
	)
}

const LoginContainer = () => {
	const {
		loading,
		watch,
		getValues,
		isAdult,
		onSubmit,
		register,
		errors,
		isValid,
		handleSubmit,
		resetField,
		redirectMemberPolicy,
	} = useLogin()
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
	const [onpenModal, setOpenModal] = useState(false)
	const [openModalAudit, setOpenModalAudit] = useState(isAdult ? true : false)
	const router = useRouter()
	const ListIconSocial = [
		<div key='google-ic' onClick={() => redirectMemberPolicy('google')}>
			<IconGoogle label='Google' key='google-ic' />
		</div>,
		<div key='facebook-ic' onClick={() => redirectMemberPolicy('facebook')}>
			<IconFacebook label='Facebook' />
		</div>,
		<IconTalk
			label='KakaoTalk'
			key='KakaoTalk-ic'
			onClick={() => redirectMemberPolicy('kakao')}
		/>,
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
	useEffect(() => {
		setOpenModal(false)
		return () => {
			setOpenModalAudit(false)
		}
	}, [])

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
						서비스 정보중개자로서, 서비스제공의 당사가 아니라는 사실을 고
						지하며, 서비스의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각
						서비스 제공자에게 있으며, 건진 플랫폼입니다. 업소의 불법적 행위 와
						관련된 일체의 민, 형사상 책임을 지지 않습니다,
					</p>
				</div>
			</div>
		)
	}

	const username = watch('username')

	const password = watch('password')

	return (
		<main className='text-center'>
			<div className='py-3 px-[16px] flex flex-col gap-5 pb-10'>
				<div className='w-full text-end p-5 flex justify-end'>
					<div onClick={() => router.push('/')}>
						<IconRemove />
					</div>
				</div>
				<div>
					<p className='font-bold '>로그인하고 더 많은 정보를 확인하세요.</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col w-full max-w-[390px] mx-auto gap-3'
				>
					<InputField
						watch={watch}
						resetField={resetField}
						prefixIcon={
							<div
								className={`flex items-center justify-center px-[10px]  ${
									isEmpty(username)
										? 'text-[#D4D4D8]'
										: get(errors, 'username')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}  `}
							>
								<IcsEmail />

								<div className='z-10 flex justify-center items-center px-[10px] h-[24px]'>
									<Image src='/icons/hr.svg' width={2} height={26} alt='' />
								</div>
							</div>
						}
						register={register}
						// validations={{
						// 	pattern: {
						// 		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						// 		message: 'Email invalidate',
						// 	},
						// }}
						name='username'
						required={true}
						placeholder={'이메일형식 아이디입니다.'}
						className='border-transparent'
						errors={errors}
					/>
					<InputField
						watch={watch}
						resetField={resetField}
						prefixIcon={
							<div
								className={`flex items-center justify-center px-[10px]  ${
									isEmpty(password)
										? 'text-[#D4D4D8]'
										: get(errors, 'password')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}  `}
							>
								<IcsLock />
								<div className='z-10  flex justify-center items-center px-[10px] h-[24px]'>
									<Image src='/icons/hr.svg' width={2} height={26} alt='' />
								</div>
							</div>
						}
						// type='password'
						register={register}
						name='password'
						required={true}
						placeholder={'비번 입력바랍니다.'}
						className='border-transparent'
						errors={errors}
					/>
					<div className='my-3'>
						<CheckboxField
							type={'checkbox'}
							register={register}
							name='terms'
							label={'로그인 상태 유지'}
							errors={errors}
							defaultChecked={true}
							required={true}
						/>
					</div>

					<Button
						type={'submit'}
						disabled={!isValid}
						className='h-[52px]'
						rounded='rounded-[10px]'
					>
						완료
					</Button>
				</form>
				<div className='flex justify-center items-center gap-2  mt-[30px]'>
					<div className='line-gradient'></div>
					<p className='text-[#52525B] text-base font-medium'>또는 로그인</p>
					<div className='line-gradient transform rotate--180'></div>
				</div>
				<div className='mx-auto flex gap-[60px] justify-center items-center  mt-[30px]'>
					{ListIconSocial}
				</div>

				<div className='flex flex-col gap-4 font-medium mt-[60px] text-[#27272A]'>
					<p onClick={() => setOpenModal(true)}>비밀번호 찾기</p>
					<Link href={'/join-membership?type=default'}>회원가입 바로가기</Link>
				</div>
				<div className='px-[10px] my-[10px]'>
					<ListCardInforSocial />
				</div>
				<div className='text-xs text-start bg-[#F6F8FA] p-2 rounded-xl '>
					{renderItems(status, setStatus, handleOpenPopup, dataContent)}
					<PopupTermInfomation
						open={isOpen}
						onClose={() => setOpen(false)}
						typeCompany={type}
					/>
				</div>
			</div>

			<ModalVerifyPhone open={onpenModal} onClose={() => setOpenModal(false)} />
			<ModalAuditCertification
				open={openModalAudit}
				onClose={() => setOpenModalAudit(false)}
			/>
		</main>
	)
}

export default LoginContainer
