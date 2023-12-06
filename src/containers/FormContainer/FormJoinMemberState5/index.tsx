import Button from '@/src/components/Button'
import AvatarField from '@/src/components/FormField/AvatarField'
import InputField from '@/src/components/FormField/InputField'
import IconTicket from '@/src/components/Icon/IconTicket'
import { UserType } from '@/src/interfaces'
import AuthAPI from '@/src/services/Auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import ModalVerifyPhone from '../../ModalVerifyPhone'
import {
	IcBlock,
	IcEmail,
	IcPhone,
	IcSmile,
} from '@/src/components/Icon/IcForm'
import { get, isEmpty } from 'lodash'
import { useCheckAccountExit } from '@/src/hooks/useCheckAccountExit'
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

const FormJoinMemberState5 = () => {
	const {
		setError,
		setValue,
		register,
		getValues,
		handleSubmit,
		watch,
		trigger,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})
	const [onpenModal, setOpenModal] = useState(false)
	const {
		loading: loadingUser,
		checkAccountExit: checkUserExit,
		field: fieldUser,
	} = useCheckAccountExit()

	const router = useRouter()
	const onSubmit = (data: any) => {
		console.log('data', data)
		const body = {
			...data,
			account_type: UserType.BIZ_USER,
		}

		AuthAPI.REGISTER({ ...body })
			.then((res) => {
				router.push('/login')
			})
			.catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
	}
	usePhone({ setValue })
	watch('phone')

	useEffect(() => {
		trigger()
	}, [getValues('phone')])

	const fieldError = (name: string) => get(errors, name)
	const getIcon = (name: string) => {
		return (
			!fieldError(name) &&
			!isEmpty(getValues(name)) && {
				suffixIcon: <IconTikSuccess />,
			}
		)
	}
	const subMess = (name: string) => (mess: string) => {
		return !fieldError(name) && !isEmpty(getValues(name)) && mess
	}

	useEffect(() => {
		fieldUser.error &&
			setError('username', {
				message: '이미 있습니다. 다시 입력해주세요.',
			})
	}, [fieldUser])
	const values = getValues()

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col justify-center items-center  w-full'
			>
				<div className='mb-5 mt-7'>
					<AvatarField register={register} name='avatar' />
				</div>

				<div className='mb-8  w-full'>
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
						{...getIcon('email')}
						register={register}
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
						label='매장명*'
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
						validations={{ required: true }}
						placeholder={'비번 입력'}
						className='border-transparent'
						errors={errors}
					/>
					<InputField
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
						placeholder={'비번 재입력'}
						className='border-transparent'
						errors={errors}
						{...getIcon('comparePassword')}
						validations={{
							validate: (value: any) =>
								value === values.password || '비밀번호가 일치 하지 않습니다.',
							required: true,
						}}
					/>
					<p className='text-start text-[#05A660] font-bold mb-1 text-[12px]'>
						{subMess('comparePassword')('비밀번호가 일치합니다.')}
					</p>
					<div
						onClick={() => {
							setOpenModal(true)
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
							name='phone'
							required={true}
							readOnly
							label='전화번호*'
							validations={{ required: true }}
							placeholder={'전화번호 입력 미입력가능'}
							className='border-transparent'
							errors={errors}
						/>
					</div>

					<InputField
						prefixIcon={<IconTicket />}
						register={register}
						name='kakao'
						label='카카오톡'
						placeholder={'아이디 입력해주세요.미입력가능'}
						className='border-transparent'
						errors={errors}
					/>
					<InputField
						prefixIcon={<IconTicket />}
						register={register}
						name='tax'
						label='텔레그램'
						placeholder={'아이디 입력해주세요.미입력가능'}
						className='border-transparent'
						errors={errors}
					/>
				</div>
				<hr className='mb-[20px] w-screen' />

				<div className='w-full'>
					<Button type={'submit'} disabled={!isValid}>
						완료
					</Button>
				</div>
			</form>
			<ModalVerifyPhone
				type='join'
				open={onpenModal}
				onClose={() => setOpenModal(false)}
			/>
		</div>
	)
}

export default FormJoinMemberState5
