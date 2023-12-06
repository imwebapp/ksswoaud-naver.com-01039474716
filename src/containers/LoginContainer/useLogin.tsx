import { RootState } from '@/src/stores'
import { authActions } from '@/src/stores/auth/authSlice'
import { generateMD5Hash } from '@/src/utils/common'
import { trim } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const useLogin = () => {
	const settingAdmin = useSelector((state: RootState) => state.settingAdmin)
	const isLogin = useSelector((state: RootState) => state.auth?.isLogin)
	const errorLogin = useSelector((state: RootState) => state.auth?.error)
	const loading = useSelector((state: RootState) => state.auth?.loading)

	const isAdult = settingAdmin?.object?.status
	const { login } = authActions
	const dispatch = useDispatch()
	const router = useRouter()
	const {
		setError,
		getValues,
		resetField,
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onChange',
	})
	const onSubmit = (data: any) => {
		const value = {
			username: trim(data.username),
			password: generateMD5Hash(trim(data.password)),
		}
		dispatch(login({ ...value }))
	}

	const redirectMemberPolicy = (param: string) => {
		router.push(`/join-membership?type=${param}`)
	}

	useEffect(() => {
		isLogin && router.push('/')
	}, [isLogin])

	useEffect(() => {
		if (isDirty && errorLogin) {
			if ((errorLogin as any).message.includes('username')) {
				setError('username', {
					type: 'externalError',
					message: '아이디가 존재하지 않습니다',
				})
			}
			if ((errorLogin as any).message.includes('password')) {
				setError('password', {
					type: 'externalError',
					message: '비밀번호가 틀렸습니다',
				})
			}
		}
	}, [errorLogin])

	return {
		loading,
		isAdult,
		handleSubmit,
		onSubmit,
		register,
		errors,
		isValid,
		resetField,
		getValues,
		redirectMemberPolicy,
		watch,
	}
}

export default useLogin
