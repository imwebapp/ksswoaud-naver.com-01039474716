import { useRouter } from 'next/navigation'

import { useAppSelector } from '../stores/hook'

export const useCheckLogin = () => {
	const router = useRouter()

	const userData = useAppSelector((state) => state.user.profile)

	return () => {
		if (!userData.id) {
			router.push('/login')
		}
		return !!userData.id
	}
}
