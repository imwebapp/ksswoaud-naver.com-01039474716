'use client'

import AvatarField from '@/src/components/FormField/AvatarField'
import InputField from '@/src/components/FormField/InputField'
import IconBackArrow from '@/src/components/Icon/IconBackArrow'
import IconRemove from '@/src/components/Icon/IconRemove'
import ModalChangePassword from '@/src/containers/ModalChangePassword'
import useData from '@/src/hooks/useData'
import UserApi from '@/src/services/User'
import { userActions } from '@/src/stores/user/userSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const IconCamera = () => {
	return (
		<div className='absolute right-0 -bottom-1  '>
			<Image src='/icons/camera-blue.svg' width={32} height={30} alt='' />
		</div>
	)
}

const EditProfile = () => {
	const [openChangePass, setOpenChangePass] = useState(false)
	const router = useRouter()
	const { userData } = useData()
	const { nickname, phone, avatar } = userData
	const dispatch = useDispatch()
	const { getUserProfile } = userActions

	const {
		getValues,
		setValue,
		setError,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})
	useEffect(() => {
		if (userData) {
			setValue('nickname', nickname)
			setValue('phone', phone)
			setValue('avatar', avatar)

			setValue('password', '***********')
		}
	}, [userData])

	const onSubmit = (data: any) => {
		console.log('data', data)
		UserApi.UPDATE_USER({
			id: userData?.id,
			nickname: data?.nickname,
			avatar: data?.avatar,
		})
			.then((res) => {
				dispatch(getUserProfile())

				router.push('/profile')
			})
			.catch((err) => {
				setError('nickname', {
					type: 'externalError',
					message: 'Internal Server Error 500',
				})
			})
	}
	return (
		<main className='max-w-[390px] mx-auto'>
			<div className='pb-8'>
				<div className='flex justify-between items-center p-4'>
					<p className='font-bold'>개인정보</p>
					<div onClick={() => router.back()}>
						<IconRemove />
					</div>
				</div>
				<hr />

				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=' mx-auto w-[350px] flex flex-col gap-2'
					>
						<div className='flex justify-center items-center py-10'>
							<AvatarField
								icon={
									<Image
										src='/icons/camera-blue.svg'
										width={20}
										height={20}
										alt=''
									/>
								}
								register={register}
								name='avatar'
								setValue={setValue}
								value={getValues('avatar')}
							/>
						</div>

						<InputField
							register={register}
							name='nickname'
							placeholder={'닉네임'}
							errors={errors}
							label='닉네임'
							rounded='rounded'
							className={
								' border-gray-300 rounded border border-black w-[350px] bg-white'
							}
						/>
						<InputField
							readOnly
							register={register}
							name='password'
							placeholder={'닉네임'}
							errors={errors}
							label='비밀번호'
							rounded='rounded'
							suffixIcon={
								<div
									className='text-sx flex justify-center items-center gap-2 px-2'
									onClick={() => setOpenChangePass(true)}
								>
									<p className='text-xs text-blue-500'>변경</p>
									<IconBackArrow />
								</div>
							}
							className={
								' border-gray-300 rounded border border-black w-[350px] bg-white'
							}
						/>
						<InputField
							readOnly
							register={register}
							name='phone'
							placeholder={'전화번호'}
							errors={errors}
							label='전화번호'
							rounded='rounded'
							className={
								' border-gray-300 rounded border border-black w-[350px] bg-white '
							}
							suffixIcon={
								<div
									className='text-sx flex justify-center items-center gap-2 px-2'
									onClick={() => router.push('/change-phone')}
								>
									<p className='text-xs text-blue-500'>변경</p>
									<IconBackArrow />
								</div>
							}
						/>
						<div className='fixed  bottom-0 left-0 w-full'>
							<div className='flex justify-center items-center gap-5 mt-10 max-w-[390px] mx-auto p-3'>
								<button
									type='button'
									onClick={() => router.back()}
									className='w-2/4 text-white bg-gray-900 py-2 px-4 rounded'
								>
									탈퇴하기
								</button>
								<button
									type='submit'
									className='text-white w-2/4 py-2 px-4 rounded bg-[#3366FF]'
								>
									적용
								</button>
							</div>
						</div>
					</form>
				</div>
				<ModalChangePassword
					open={openChangePass}
					onClose={() => setOpenChangePass(false)}
				/>
			</div>
		</main>
	)
}

export default EditProfile
