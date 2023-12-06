import Button from '@/src/components/Button'
import AvatarField from '@/src/components/FormField/AvatarField'
import InputField from '@/src/components/FormField/InputField'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalVerifyPhone from '../../ModalVerifyPhone'
import { useCheckAccountExit } from '@/src/hooks/useCheckAccountExit'
import { IcPhone, IcSmile, IcTicket } from '@/src/components/Icon/IcForm'
import { get, isEmpty } from 'lodash'
import usePhone from '../usePhone'
import AuthAPI from '@/src/services/Auth'
import { useRouter, useSearchParams } from 'next/navigation'
import UserApi from '@/src/services/User'
import useData from '@/src/hooks/useData'
import { ACCOUNT_TYPE } from '@/src/constants'
import { userActions } from '@/src/stores/user/userSlice'
import { useDispatch } from 'react-redux'
import { useAppContext } from '@/src/context'
import { authActions } from '@/src/stores/auth/authSlice'
import { enqueueSnackbar } from 'notistack'

const FormJoinMemberState1 = () => {
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
	const values = getValues()
	const { userData } = useData()
	const router = useRouter()
	const { getUserProfile } = userActions
	const dispatch = useDispatch()
	const {
		loading: loadingUser,
		checkAccountExit: checkUserExit,
		field: fieldUser,
	} = useCheckAccountExit()
	const context = useAppContext()
	const { setDataSNS, dataSNS } = context
	const { logout, login, loginSuccess, loginStatus } = authActions

	const onSubmit = (data: any) => {
		UserApi.UPDATE_USER(
			{
				id: dataSNS?.data?.id,
				nickname: isEmpty(data?.username)
					? dataSNS?.data?.nickname
					: data?.username,
				phone: isEmpty(data?.phone) ? dataSNS?.data?.phone : data?.phone,
				referral_code: data?.referral_code,
				account_type: ACCOUNT_TYPE.FREE_USER,
				avatar: isEmpty(data.avatar) ? dataSNS?.data?.avatar : data?.avatar,
			},
			{
				Authorization: `Bear ${dataSNS?.token}`,
			},
		)
			.then(() => {
				const newData = {
					...dataSNS?.data,
					nickname: isEmpty(data?.username)
						? dataSNS?.data?.nickname
						: data?.username,
					phone: isEmpty(data?.phone) ? dataSNS?.data?.phone : data?.phone,
					referral_code: data?.referral_code,
					account_type: ACCOUNT_TYPE.FREE_USER,
					avatar: isEmpty(data.avatar) ? dataSNS?.data?.avatar : data?.avatar,
				}
				dispatch(getUserProfile())
				dispatch(
					loginSuccess({
						data: { ...newData },
						token: dataSNS.token,
					}),
				)
				setDataSNS(null)
				router.refresh()
				router.push('/')
			})
			.catch((error) => enqueueSnackbar(error.message, { variant: 'error' }))
	}

	usePhone({ setValue })
	watch('phone')

	useEffect(() => {
		trigger()
	}, [getValues('phone')])

	useEffect(() => {
		fieldUser.error &&
			setError('username', {
				message: '이미 있습니다. 다시 입력해주세요.',
			})
	}, [fieldUser])

	return (
		<div>
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
					<div onClick={() => setOpenModal(true)}>
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
							readOnly
							name='phone'
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
				</div>
				<hr className='mb-[20px] w-screen' />

				<div className='w-full'>
					<Button
						type={'submit'}
						disabled={!isValid}
						className='max-w-[502px] mx-auto !rounded-[8px]'
					>
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

export default FormJoinMemberState1
