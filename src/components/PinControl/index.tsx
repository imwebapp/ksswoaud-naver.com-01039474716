'use client'
import { isEmpty, isNaN } from 'lodash'
import Styles from './PopupChangePin.module.css'
import { useState } from 'react'
import Button from '../Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchParam from '@/src/utils/searchParam'

function PinControl({
	userConfirmOTP = () => {},
	userPhone,
	type = '',
	context,
}: {
	userConfirmOTP: any
	userPhone: any
	type: string
	context?: any
}) {
	const [codeOTP, setCodeOTP] = useState<string[]>(new Array(6).fill(''))
	const [errors, setErrors] = useState('')
	const searchParams = useSearchParams()
	const { onClose } = context
	const router = useRouter()
	const pathname = usePathname()
	const codeCountry = searchParams.get('code')
	const params = new URLSearchParams(searchParams)

	const handleChangeCodePIN = (element: HTMLInputElement, index: number) => {
		const listInputOtp =
			document && document.getElementsByClassName('otp_verify')
		if (isNaN(Number(element.value))) return false

		setCodeOTP((prevCodeOTP) =>
			prevCodeOTP.map((d, idx) => (idx === index ? element.value : d)),
		)
		if (element.nextSibling instanceof HTMLInputElement) {
			element.nextSibling.focus()
		} else {
			;(listInputOtp[0] as HTMLInputElement).focus()
			;(listInputOtp[0] as HTMLInputElement).select()
		}
	}

	const isValid = codeOTP.some((v) => isEmpty(v))

	const onSubmit = async () => {
		const otp = codeOTP.join('')
		try {
			const respone = await userConfirmOTP.confirm(otp)
			console.log('respone', respone)
			const token = await respone.user?.getIdToken()
			console.log('teoken', token)
			if (respone) {
				if (type) {
					const searchRouter = new SearchParam()
					searchRouter.create(
						{
							status: 'done',
						},
						params,
					).push(router,pathname)

					onClose()
				} else {
					router.push(
						`/reset-password?userid=${userPhone?.username}&id=${userPhone?.id}&token=${token}`,
					)
				}
			}
		} catch (error) {
			console.log('error', error)
			setErrors('인증번호 틀렸어요. 다시 보내기 누르신 후 재입력해주세요')
		}
	}
	return (
		<div className={Styles.PopupDigits}>
			<div className={Styles.PopupDigits_form}>
				<div className={Styles.PopupDigits_form_input}>
					{codeOTP.map((data, index) => {
						return (
							<input
								className='otp_verify outline-none'
								type='number'
								name='codeOTP'
								maxLength={1}
								key={index}
								value={data}
								onChange={(e) => handleChangeCodePIN(e.target, index)}
								onFocus={(e) => {
									e.target.classList.add('focus')
								}}
								onBlur={(e) => {
									e.target.classList.remove('focus')
								}}
							/>
						)
					})}
				</div>
				{isEmpty(errors) ? null : (
					<div className='w-full'>
						<p className='text-red-500 text-xs w-[290px] text-start'>
							{errors}
						</p>
					</div>
				)}
			</div>
			<div>
				<p className='text-[#6D727A] font-medium'>
					코드를 받지 못하셨습니까?{' '}
					<span
						onClick={() => {
							setCodeOTP(new Array(6).fill(''))
							setErrors('')
						}}
						className='text-[#0162F2] font-bold'
					>
						다시 보내기
					</span>
				</p>
			</div>
			<div className='mt-8'>
				<Button type={'submit'} disabled={isValid} onClick={onSubmit}>
					완료
				</Button>
			</div>
		</div>
	)
}

export default PinControl
