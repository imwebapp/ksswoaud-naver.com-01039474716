'use client'

import Countdown from '@/src/components/Countdown'
import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import ModalChangePhoneSuccess from '@/src/components/ModalChangePhoneSuccess'
import useData from '@/src/hooks/useData'
import get from 'lodash/get'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '@/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import UserApi from '@/src/services/User'
import { useRouter } from 'next/navigation'
interface InputNumberFieldProps {
	name: string
	type?: string
	label?: string
	placeholder?: string
	required?: boolean
	register: Function
	validations?: Record<string, unknown>
	errors: Record<string, any>
}

declare global {
	interface Window {
		recaptcha: any
	}
}

const InputNumberField: React.FC<InputNumberFieldProps> = (props) => {
	const {
		name,
		type = 'text',
		label = '',
		placeholder = '',
		required,
		register,
		validations,
		errors,
		...rest
	} = props
	const fieldError = get(errors, name)
	const borderError = fieldError
		? 'focus:outline-none border-red-500'
		: 'focus:border-[#D7EAFA] focus:outline-none focus:border'

	return (
		<div className='form-control'>
			<div className='flex flex-col w-full max-w-sm mx-auto p-2  bg-white'>
				<div className='flex flex-col mb-2'>
					<div className='relative'>
						<input
							{...register(name, {
								...(required && { required: 'Field is required' }),
								...validations,
							})}
							{...rest}
							type='number'
							placeholder='전화 번호'
							className={`text-sm sm:text-base  relative w-full outline-1 border border-[#EAEFF3] rounded-xl placeholder-gray-400 py-2 pr-2 pl-4 py-4 focus:border-[#D7EAFA] ${borderError}`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const ChangePhone = () => {
	const [openOtp, setOpenOtp] = useState(false)
	const [isResend, setIsResend] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const { userData } = useData()
	const { phone, id } = userData
	const [userConfirmOTP, setUserConfirmOTP] = useState<any | null>()
	const [typeCount, setTypeCount] = useState(false)
	const [newPhone, setNewPhone] = useState(null)
	const {
		setError,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})

	const router = useRouter()

	const onSignin = async (ph: string) => {
		try {
			const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {
				size: 'invisible',
			})
			const phone = `+84${ph}`
			const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
			if (confirmation) {
				setUserConfirmOTP(confirmation)
				// setOpenVerify(true)
			}
		} catch (error) {
			setTypeCount(true)
			console.log('errr', error)
		}
	}

	const onSubmit = async (data: any) => {
		if (data.code) {
			const respone = await userConfirmOTP.confirm(data.code)
			const token = await respone.user?.getIdToken()
			if (respone) {
				//  call api
				UserApi.UPDATE_USER({
					id: id,
					phone: data.phone,
				})
					.then((res) => {
						setNewPhone(res?.results?.object?.phone)
						setOpenModal(true)
					})
					.catch((err) => {
						setError('code', {
							type: 'externalError',
							message: '인증번호 실패 다시 시도해주세요.',
						})
					})
			} else {
				setTypeCount(true)
			}
		} else {
			onSignin(data?.phone)
		}
	}
	return (
		<main className=''>
			<div className='flex justify-start items-center gap-3 p-2 py-8'>
				<IconArrowLeft />
				<p className='font-bold'>휴대폰 번호 변경하기</p>
			</div>
			<hr />
			<div className='py-3 flex flex-col gap-3 px-3'>
				<p className='font-bold'>새로운 휴대폰 번호를 입력해주세요</p>
				<p>현재 등록된 휴대폰 번호는 {phone} 이에요</p>
			</div>
			<div>
				<form className='px-2' onSubmit={handleSubmit(onSubmit)}>
					<InputNumberField
						register={register}
						name='phone'
						required={true}
						errors={errors}
					/>
					{userConfirmOTP && (
						<>
							<div className='px-2' onClick={() => setTypeCount(false)}>
								<div
									className={`text-sm text-center sm:text-base w-full outline-1 border border-[#EAEFF3] rounded-xl  py-2 pr-2 pl-4 py-4  ${
										isResend ? 'text-blue-400 bg-[#EBF3FF]' : ''
									} ${
										!typeCount ? '' : 'text-blue-600 font-semibold bg-[#EBF3FF]'
									}`}
								>
									<div className={'flex justify-center items-center gap-2'}>
										인증문자 다시 받기{' '}
										<Countdown initialCountdown={typeCount ? 240 : 60} />
									</div>
								</div>
							</div>
							<div className='my-2'>
								<p className='text-start pl-2 font-bold'>
									인증번호 입력해주세요.
								</p>
								<InputNumberField
									register={register}
									name='code'
									required={true}
									errors={errors}
								/>
							</div>
						</>
					)}

					<button
						type={'submit'}
						disabled={!isValid}
						className={` w-full py-2 px-4 rounded  mt-10 ${
							!isValid
								? 'bg-[#EDEDED] text-[#70777F]'
								: 'bg-[#3366FF] text-white'
						}`}
					>
						전송하기
					</button>
				</form>
				<div id='recaptcha' className='justify-center flex'></div>
			</div>
			<ModalChangePhoneSuccess
				open={openModal}
				newPhone={newPhone}
				onClose={() => {
					router.push('/profile/edit')
					setOpenModal(false);
				}}
			/>
		</main>
	)
}

export default ChangePhone
