'use client'
import Dialog from '@/src/components/Dialog'

import Button from '@/src/components/Button'
import SelectPhoneNumberField from '@/src/components/FormField/SelectPhoneNumberField'
import IconBack from '@/src/components/Icon/IconBack'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '@/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import VerifyOTPDialog from '@/src/containers/VerifyOTPDialog'
import AuthAPI from '@/src/services/Auth'
import ModalResultStatusVerifyPhone from '../ModalResultStatusVerifyPhone'
import { LOGIN_TYPE } from '@/src/constants'
import { withoutLeading0 } from '@/src/utils/common'
import { ModalPhoneProvider } from './context'
import SearchParam from '@/src/utils/searchParam'

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

const ModalVerifyPhone = ({
	open,
	onClose = () => {},
	type = '',
}: {
	open: boolean
	onClose: () => void
	type?: string
}) => {
	const [stateErr, setStateError] = useState(0)
	const [openVerify, setOpenVerify] = useState(false)
	const [userConfirmOTP, setUserConfirmOTP] = useState<any | null>()
	const [userPhone, setUserPhone] = useState<any | null>()
	const [openResult, setOpenResult] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const searchType = useSearchParams()
	const pathname = usePathname()
	const codeCountry = searchParams.get('code')
	const params = new URLSearchParams(searchParams)

	const {
		reset,
		getValues,
		watch,
		setValue,
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({})

	const onSignin = async (phone: string) => {
		try {
			const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {
				size: 'invisible',
			})
			const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
			if (confirmation) {
				setUserConfirmOTP(confirmation)
				setOpenVerify(true)
			}
		} catch (error) {
			console.log('errr', error)
		}
	}

	const onSubmit = (data: any) => {
		const phone = `${data.countryCode}${withoutLeading0(data.phone)}`
		const searchRouter = new SearchParam()
		searchRouter
			.create(
				{
					phone,
				},
				params,
			)
			.push(router, pathname)

		AuthAPI.VERIFY_PHONE_NUMBER(phone)
			.then((res) => {
				if (!type) {
					if (res?.results?.object?.login_type === LOGIN_TYPE.IN_APP) {
						onSignin(phone)
						setOpenVerify(true)
					} else {
						setOpenResult(true)
					}
				} else {
					setOpenResult(true)
				}

				setUserPhone(res?.results?.object)
			})
			.catch((err) => {
				if (type) {
					const ob = {
						phone: phone,
					}
					onSignin(phone)
					setOpenVerify(true)

					setUserPhone(ob)
				} else {
					setStateError(1)
				}
			})
	}

	useEffect(() => {
		if (stateErr === 1) {
			setError('phone', {
				type: 'externalError',
				message: '없는 연락처입니다. 다시 입력해주세요.',
			})
		} else if (stateErr !== 0) {
			// router.push(`/forgot-password/result?type=${stateErr}`)
		}
	}, [stateErr])

	useEffect(() => {
		if (searchParams.get('status')) {
			onClose()
		}
	}, [searchParams.get('status')])

	return (
		<ModalPhoneProvider>
			<Dialog open={open} onClose={onClose} fullScreen fullWidth>
				<main className='text-center max-w-[502px] mx-auto'>
					<div className='p-4 flex flex-col gap-5'>
						<div
							className='w-full text-start flex justify-start mt-4 '
							onClick={() => onClose()}
						>
							<IcBack />
						</div>
						<div className='flex flex-col gap-2 items-start'>
							<p className='font-semibold text-[22px]'>비밀번호 찾기</p>
							<p className='font-normal text-[#6D727A]'>
								인증번호 전송을 위해 전화번호를 입력해주세요
							</p>
						</div>
						<form>
							<div>
								<SelectPhoneNumberField
									register={register}
									setValue={setValue}
									name='phone'
									required={true}
									errors={errors}
									validations={{
										pattern: {
											value: /\d+/,
											message: 'Phone number invalid',
										},
									}}
								/>
							</div>
							<div className='mt-32'>
								<Button
									type={'button'}
									disabled={!isValid}
									onClick={handleSubmit(onSubmit)}
								>
									전송하기
								</Button>
							</div>
						</form>
					</div>
					<div id='recaptcha' className='justify-center flex'></div>
					<VerifyOTPDialog
						type={type}
						userPhone={userPhone}
						userConfirmOTP={userConfirmOTP}
						open={openVerify}
						onClose={() => {
							onClose()
							setOpenVerify(false)
						}}
					/>
					<ModalResultStatusVerifyPhone
						open={openResult}
						onClose={() => {
							onClose()
							setOpenVerify(false)
							setOpenResult(false)
							reset()
						}}
						data={userPhone}
					/>
				</main>
			</Dialog>
		</ModalPhoneProvider>
	)
}

export default ModalVerifyPhone
