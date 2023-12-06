import React from 'react'
import Dialog from '@/src/components/Dialog'
import InputField from '@/src/components/FormField/InputField'
import IconRemove from '@/src/components/Icon/IconRemove'
import { useForm } from 'react-hook-form'
import AuthAPI from '@/src/services/Auth'
import { generateMD5Hash } from '@/src/utils/common'

interface ModalChangePasswordProps {
	open: boolean
	onClose: () => void
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({
	open,
	onClose,
}) => {
	const {
		setError,
		watch,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
	})

	const onSubmit = (data: any) => {
		const body = {
			password: generateMD5Hash(data?.oldPassword),
			new_password: generateMD5Hash(data?.newPassword),
		}
		AuthAPI.CHANGE_PASSWORD({ ...body })
			.then((res) => onClose())
			.catch((err) => {
				setError('oldPassword', {
					type: 'externalError',
					message: 'Internal Server Error 500',
				})
			})
	}
	const password = watch('newPassword', '')

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' border='rounded-xl'>
			<div className='p-3 rounded-xl'>
				<div className='flex justify-between items-center py-1 my-2'>
					<p className='font-bold text-xl ml-2 '>닉네임</p>
					<div onClick={onClose}>
						<IconRemove />
					</div>
				</div>
				<div>
					<form className='w-[300px]' onSubmit={handleSubmit(onSubmit)}>
						<InputField
							type='password'
							register={register}
							name='oldPassword'
							placeholder={'입력해주세요.'}
							errors={errors}
							label='현재 비밀번호'
							rounded='rounded'
							className={' border-gray-300 rounded border border-black '}
						/>
						<InputField
							type='password'
							register={register}
							name='newPassword'
							placeholder={'입력해주세요'}
							errors={errors}
							label='닉네임'
							rounded='rounded'
							className={' border-gray-300 rounded border border-black '}
						/>
						<InputField
							type='password'
							register={register}
							name='passwordCompare'
							placeholder={'입력해주세요'}
							errors={errors}
							label='새로운 비밀번호 재입력 확인'
							rounded='rounded'
							className={' border-gray-300 rounded border border-black '}
							validations={{
								validate: (value: any) =>
									value === password || 'Passwords do not match',
							}}
						/>
						<div className='flex justify-center items-center gap-5 mt-10 mb-3'>
							<button
								onClick={() => onClose()}
								type='button'
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
					</form>
				</div>
			</div>
		</Dialog>
	)
}

export default ModalChangePassword
