'use client'
import BackButton from '@/src/components/BackButton'
import Button from '@/src/components/Button'
import InputField from '@/src/components/FormField/InputField'
import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import Section from '@/src/components/Section'
import AuthAPI from '@/src/services/Auth'
import UserApi from '@/src/services/User'
import { generateMD5Hash } from '@/src/utils/common'
import { trim } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const IcBack = () => {
	return (
		<svg
			width='24'
			height='25'
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M21 12.5781L4 12.5781'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='square'
				strokeLinejoin='round'
			/>
			<path
				d='M9.3 18.5781L3 12.5781L9.3 6.57812'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='square'
			/>
		</svg>
	)
}

const ResetPassword = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const {
		setValue,
		watch,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		// defaultValues: {
		// 	mail: searchParams.get('userid'),
		// 	password: '',
		// 	passwordCompare: '',
		// },
	})

	const onSubmit = (data: any) => {
		AuthAPI.RESET_PASSWORD({
			token: searchParams.get('token'),
			new_password: generateMD5Hash(trim(data.password)),
		})
			.then((res) => {
				router.push('/login')
			})
			.catch()
	}

	const password = watch('password', '')

	useEffect(() => {
		UserApi.GET_LIST_USER({
			fields: ['$all'],
			filter: [
				{
					id: searchParams.get('id'),
				},
			],
		}).then((res) => {
			setValue('email', res.results.objects.rows[0]?.email)
		})
	}, [])

	return (
		<main className='text-center'>
			<Section className='p-3 flex flex-col gap-5 pt-8 '>
				<div className='w-full text-end  flex mb-16 '>
					<div className='w-fit'>
						<IcBack />
					</div>
					<div
						className=' text-center text-[#71717A] font-bold'
						style={{
							width: 'calc(100% - 24px)',
						}}
					>
						<h1 className='text-[#71717A] font-bold '>비밀번호 재설정</h1>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className=' w-[350px] flex flex-col gap-2'
				>
					<InputField
						readOnly={true}
						register={register}
						name='email'
						placeholder={'번 없는 아이디인 경우 안내'}
						errors={errors}
						label='현재 아이디 입니다.'
						rounded='rounded '
						className={' border-gray-300 rounded border border-black'}
					/>
					<InputField
						register={register}
						name='password'
						required={true}
						placeholder={'입력해주세요.'}
						errors={errors}
						label='비밀번호'
						rounded='rounded'
						className={
							'bg-white border-gray-300 border rounded border-[#CBCBCB]'
						}
					/>
					<InputField
						register={register}
						name='passwordCompare'
						required={true}
						placeholder={'입력해주세요.'}
						errors={errors}
						label='비밀번호 확인'
						rounded='rounded'
						className={'bg-white border-gray-300 rounded border-[#CBCBCB]'}
						validations={{
							validate: (value: any) =>
								value === password || 'Passwords do not match',
						}}
					/>
					<div className='mt-5'>
						<Button type={'submit'} disabled={!isValid}>
							완료
						</Button>
					</div>
				</form>
			</Section>
		</main>
	)
}

export default ResetPassword
