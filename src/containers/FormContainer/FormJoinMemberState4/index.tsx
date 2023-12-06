import Button from '@/src/components/Button'
import AvatarField from '@/src/components/FormField/AvatarField'
import InputField from '@/src/components/FormField/InputField'
import UploadIdCardField from '@/src/components/FormField/UploadIdCardField'
import ModalStatusApprove from '@/src/components/ModalStatusApprove'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import StatusFailedToApprove from './components/StatusFailedToApprove'
import StatusSuccessToApprove from './components/StatusSuccessToApprove'
import { UserType } from '@/src/interfaces'
import AuthAPI from '@/src/services/Auth'
import LoadingOverlay from '@/src/components/LoadingOVerlay'
import ModalVerifyPhone from '../../ModalVerifyPhone'
import { get, isEmpty } from 'lodash'
import { useCheckAccountExit } from '@/src/hooks/useCheckAccountExit'
import {
	IcBlock,
	IcEmail,
	IcPhone,
	IcSmile,
	IcTicket,
} from '@/src/components/Icon/IcForm'
import { useRouter, useSearchParams } from 'next/navigation'
import usePhone from '../usePhone'
import { enqueueSnackbar } from 'notistack'
const IconTikSuccess = () => {
	return (
		<svg
			className='mx-4'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_31_1755)'>
				<circle cx='12' cy='12' r='10' fill='#05A660' />
				<path
					d='M7 11.8519L11.375 16L17 8'
					stroke='white'
					strokeWidth='2.5'
					strokeLinecap='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_31_1755'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

const FormJoinMemberState4 = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [status, setStatus] = useState('')
	const [isOpenVerify, setOpenVerify] = useState(false)
	const {
		setError,
		setValue,
		watch,
		register,
		getValues,
		handleSubmit,
		trigger,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})
	const router = useRouter()
	const searchParams = useSearchParams()

	const {
		loading: loadingUser,
		checkAccountExit: checkUserExit,
		field: fieldUser,
	} = useCheckAccountExit()

	usePhone({ setValue })
	watch('phone')

	useEffect(() => {
		trigger()
	}, [getValues('phone')])

	const password = watch('password', '')

	const onSubmit = (data: any) => {
		const body = {
			...data,
			account_type: UserType.FREE_USER,
		}
		console.log('body ------->', body)

		AuthAPI.REGISTER({ ...body })
			.then((res) => {
				setStatus('success')
				setIsModalOpen(true)
			})
			.catch((er) => {
				setStatus('fail')
				setIsModalOpen(true)
				enqueueSnackbar(er.message, { variant: 'error' })
			})
	}
	const renderStatus = () => {
		switch (status) {
			case 'success':
				return (
					<StatusSuccessToApprove
						onClick={() => {
							router.push('/login')

							setIsModalOpen(false)
						}}
					/>
				)
			case 'fail':
				return (
					<StatusFailedToApprove
						onClick={() => {
							setStatus('')

							setIsModalOpen(false)
						}}
					/>
				)

			default:
				return <LoadingOverlay />
		}
	}

	const fieldError = (name: string) => get(errors, name)

	const getIcon = (name: string) => {
		return (
			!fieldError(name) &&
			!isEmpty(getValues(name)) && {
				suffixIcon: <IconTikSuccess />,
			}
		)
	}

	useEffect(() => {
		fieldUser.error &&
			setError('username', {
				message: '이미 있습니다. 다시 입력해주세요.',
			})
	}, [fieldUser])

	const subMess = (name: string) => (mess: string) => {
		return !fieldError(name) && !isEmpty(getValues(name)) && mess
	}

	const values = getValues()

	return (
		<div>
			<ModalStatusApprove
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			>
				{renderStatus()}
			</ModalStatusApprove>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col justify-center items-center w-full'
			>
				<div className='mb-5 mt-7'>
					<AvatarField register={register} name='avatar' setValue={setValue} />
				</div>

				<div className='mb-8 w-full'>
					<InputField
						prefixIcon={
							<div
								className={`${
									isEmpty(values.email)
										? 'text-[#D4D4D8]'
										: get(errors, 'email')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}`}
							>
								<IcEmail />
							</div>
						}
						register={register}
						{...getIcon('email')}
						name='email'
						required={true}
						label='아이디*'
						placeholder={'이메일형식 아이디 입력'}
						className='border-transparent'
						errors={errors}
						validations={{
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: '이메일 형식으로 입력해주세요',
							},
							required: true,
						}}
					/>
					<InputField
						prefixIcon={
							<div
								className={`${
									isEmpty(values.username)
										? 'text-[#D4D4D8]'
										: get(errors, 'username')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}`}
							>
								<IcSmile />
							</div>
						}
						register={register}
						name='username'
						required={true}
						label='닉네임*'
						placeholder={'2글자 이상'}
						className='border-transparent'
						errors={errors}
						validations={{
							validate: (e: string) => {
								checkUserExit({ username: e })
							},
							required: true,
						}}
					/>
					<InputField
						prefixIcon={
							<div
								className={`${
									isEmpty(values.password)
										? 'text-[#D4D4D8]'
										: get(errors, 'password')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}`}
							>
								<IcBlock />
							</div>
						}
						register={register}
						name='password'
						required={true}
						label='비밀번호*'
						placeholder={'비번 입력'}
						className='border-transparent'
						errors={errors}
					/>
					<InputField
						watch={watch}
						prefixIcon={
							<div
								className={`${
									isEmpty(values.comparePassword)
										? 'text-[#D4D4D8]'
										: get(errors, 'comparePassword')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}`}
							>
								<IcBlock />
							</div>
						}
						register={register}
						name='comparePassword'
						required={true}
						label='비밀번호 확인*'
						placeholder={'비번  재입력'}
						className='border-transparent'
						errors={errors}
						{...getIcon('comparePassword')}
						validations={{
							validate: (value: any) =>
								value === password || 'Passwords do not match',
							required: true,
						}}
					/>
					<p className='text-start text-[#05A660] font-bold mb-1 text-[12px]'>
						{subMess('comparePassword')('비밀번호가 일치합니다.')}
					</p>
					<div
						onClick={() => {
							setOpenVerify(true)
						}}
					>
						<InputField
							prefixIcon={
								<div
									className={`${
										isEmpty(values.phone)
											? 'text-[#D4D4D8]'
											: get(errors, 'phone')
											? 'text-[#FF5C5C]'
											: 'text-[#18181B]'
									}`}
								>
									<IcPhone />
								</div>
							}
							register={register}
							validations={{ required: true }}
							name='phone'
							readOnly
							required={true}
							label='전화번호*'
							placeholder={'전화번호'}
							className='border-transparent'
							errors={errors}
						/>
					</div>

					<InputField
						prefixIcon={
							<div
								className={`${
									isEmpty(values.referral_code)
										? 'text-[#D4D4D8]'
										: get(errors, 'referral_code')
										? 'text-[#FF5C5C]'
										: 'text-[#18181B]'
								}`}
							>
								<IcTicket />
							</div>
						}
						register={register}
						name='referral_code'
						label='추천인 초대코드'
						placeholder={'없다면 미입력가능'}
						className='border-transparent'
						errors={errors}
					/>
					<div>
						<UploadIdCardField
							register={register}
							name={'image_id_card'}
							setValue={setValue}
						/>
					</div>
				</div>
				<hr className='mb-[20px] w-screen' />

				<div className='w-full mt-10'>
					<Button
						type={'submit'}
						disabled={!isValid}
						onClick={() => setIsModalOpen(true)}
					>
						완료
					</Button>
				</div>
			</form>

			<ModalVerifyPhone
				type='join'
				open={isOpenVerify}
				onClose={() => setOpenVerify(false)}
			/>
		</div>
	)
}

export default FormJoinMemberState4
