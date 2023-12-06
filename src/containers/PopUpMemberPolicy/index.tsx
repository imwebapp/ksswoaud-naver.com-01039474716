'use client'
import React, { useEffect, useState } from 'react'

import BackButton from '@/src/components/BackButton'
import Button from '@/src/components/Button'
import CheckboxField from '@/src/components/FormField/CheckboxField'
import IconProtect from '@/src/components/Icon/IconProtect'
import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import { useForm } from 'react-hook-form'
import { useGoogleLogin } from '@react-oauth/google'
import AuthAPI from '@/src/services/Auth'
import { FacebookLoginClient } from '@greatsumini/react-facebook-login'
import Dialog from '@/src/components/Dialog'
import { authActions } from '@/src/stores/auth/authSlice'
import { useDispatch } from 'react-redux'
import useKakao from '@/src/hooks/useKakao'
import { useAppContext } from '@/src/context'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/navigation'
import PopupTermInfomation from '../PopupTermInfomation'
import { TYPE_COMPANY_INFO } from '@/src/constants'

const PopUpMemberPolicy = ({
	open,
	onClose = () => {},
	type = '',
}: {
	open: boolean
	onClose: () => void
	type?: string
}) => {
	const { logout, login, loginSuccess, loginStatus } = authActions
	const { KakaoLogin } = useKakao()
	const dispatch = useDispatch()
	const { setValue, watch, register, handleSubmit } = useForm({
		mode: 'onChange',
	})
	const router = useRouter()

	const [disabled, setDisabled] = useState<boolean | undefined>(true)
	const [checkAll, setCheckAll] = useState(false)
	const context = useAppContext()
	const [termDilalog, setTermDialog] = useState<string | undefined>()
	const { setDataSNS, dataSNS } = context
	useEffect(() => {
		loadFB()
	}, [])

	const loadFB = async () => {
		FacebookLoginClient.clear()
		await FacebookLoginClient.loadSdk('en_US')
		FacebookLoginClient.init({
			appId: `${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}`,
			version: 'v9.0',
		})
	}

	const handleLoginWithGoogle = useGoogleLogin({
		onSuccess: (respone) => {
			console.log('respone', respone)
			AuthAPI.LOGIN_GOOGLE({ googleToken: respone?.access_token })
				.then((res) => {
					console.log('resss google', res)
					const payload = res?.results?.object
					if (!isEmpty(payload.nickname) && !isEmpty(payload.phone)) {
						dispatch(
							loginSuccess({
								data: payload,
								token: res?.results?.token,
							}),
						)
						router.push('/')
					} else {
						setDataSNS({
							data: payload,
							token: res?.results?.token,
						})
						onClose()
					}
				})
				.catch(() => onClose())
		},
		onError: (err) => {
			onClose()
			console.log('err login google', err)
		},
	})
	const handleLoginFacebook = (v: any) => {
		if (v.status === 'connected') {
			AuthAPI.LOGIN_FACEBOOK({
				facebookToken: v?.authResponse?.accessToken,
			})
				.then((res) => {
					const payload = res?.results?.object
					if (!isEmpty(payload.nickname) && !isEmpty(payload.phone)) {
						dispatch(
							loginSuccess({
								data: payload,
								token: res?.results?.token,
							}),
						)
						router.push('/')
					} else {
						setDataSNS({
							data: payload,
							token: res?.results?.token,
						})
						onClose()
					}
				})
				.catch((err) => {
					console.log('err', err)
					onClose()
				})
		}
		return
	}

	const handleLoginKakao = (v: any) => {
		if (v?.access_token) {
			AuthAPI.LOGIN_KAKAO({
				kakaotalkToken: v?.access_token,
			})
				.then((res) => {
					const payload = res?.results?.object
					if (!isEmpty(payload.nickname) && !isEmpty(payload.phone)) {
						dispatch(
							loginSuccess({
								data: payload,
								token: res?.results?.token,
							}),
						)
						router.push('/')
					} else {
						setDataSNS({
							data: payload,
							token: res?.results?.token,
						})
						onClose()
					}
				})
				.catch(() => onClose())
		}
	}

	const onSubmit = (data: any) => {
		switch (type) {
			case 'google':
				handleLoginWithGoogle()

				break
			case 'facebook':
				FacebookLoginClient.login(handleLoginFacebook, {
					scope: 'public_profile',
				})
				break
			case 'kakao':
				KakaoLogin({
					scope: 'profile_image',
					success: handleLoginKakao,
				})
				break
			default:
				onClose()
				break
		}
	}

	watch((v) => {
		const list = Object.keys(v)
		const t = list.some((j) => v[j] === true)
		const k = list.slice(0, list.length - 1).every((k, i) => v[k] === true)

		setCheckAll(k)
		setDisabled(t ? undefined : true)
	})

	const term5 = watch('terms5')

	useEffect(() => {
		if (checkAll) {
			setValue('terms5', true)
		} else {
			setValue('terms5', false)
		}
	}, [checkAll])

	const handleCheckAll = () => {
		const list = ['terms', 'terms1', 'terms2', 'terms3', 'terms4']

		if (term5) {
			list.map((i) => setValue(i, false))
		} else {
			list.map((i) => setValue(i, true))
		}
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth fullScreen>
			<div className='px-3 max-w-[502px] mx-auto'>
				<div className='w-full text-start flex justify-start p-5'>
					<BackButton icon={<IconArrowLeft />} />
				</div>
				<div className='flex justify-center items-center'>
					<IconProtect />
				</div>
				<div className='flex flex-col gap-5 w-fit mx-auto'>
					<p className='font-bold text-2xl'>가입 이용약관</p>
					<form
						className='flex flex-col gap-5 '
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='flex flex-col gap-5 mb-20'>
							<CheckboxField
								type={'checkbox'}
								register={register}
								name='terms'
								label={
									<p className='font-normal'>
										(필수){' '}
										<span
											className='text-red-600 underline'
											onClick={() =>
												setTermDialog(TYPE_COMPANY_INFO.TERM_OF_SERVICE)
											}
										>
											서비스 이용약관에
										</span>{' '}
										동의합니다.
									</p>
								}
							/>
							<CheckboxField
								type={'checkbox'}
								register={register}
								name='terms1'
								label={
									<p className='font-normal'>
										(필수)
										<span
											className='text-red-600 underline'
											onClick={() => setTermDialog(TYPE_COMPANY_INFO.POLICY)}
										>
											개인정보처리방침
										</span>
										에 동의합니다.
									</p>
								}
							/>
							<CheckboxField
								type={'checkbox'}
								register={register}
								name='terms2'
								label={
									<p className='font-normal'>
										(필수)
										<span
											className='text-red-600 underline'
											onClick={() =>
												setTermDialog(TYPE_COMPANY_INFO.LOCATION_BASE_SERVICES)
											}
										>
											위치기반서비스
										</span>
										에 동의합니다.
									</p>
								}
							/>
							<CheckboxField
								type={'checkbox'}
								register={register}
								name='terms3'
								label={
									<p className='font-normal'>
										(선택)
										<span className='text-red-600 underline'>
											홍보 및 마케팅 목적 개인정보 수집 이용
										</span>
										에 동의
									</p>
								}
							/>
							<CheckboxField
								type={'checkbox'}
								register={register}
								name='terms4'
								label={
									<p className='font-normal'>
										(선택)
										<span className='text-red-600 underline'>
											광고성 정보 수신
										</span>{' '}
										동의
									</p>
								}
							/>
						</div>
						<hr />
						<div>
							<CheckboxField
								onClick={handleCheckAll}
								type={'checkbox'}
								register={register}
								name='terms5'
								label={
									<p className='font-bold'>위에 항목에 전부 동의합니다.</p>
								}
							/>
							<Button type={'submit'} disabled={disabled} className='my-5'>
								완료
							</Button>
						</div>
					</form>
				</div>
				<div id='fb-root'></div>
			</div>
			<PopupTermInfomation
				open={!!termDilalog}
				typeCompany={termDilalog}
				onClose={() => setTermDialog(undefined)}
			/>
		</Dialog>
	)
}

export default PopUpMemberPolicy
