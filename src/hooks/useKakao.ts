import { useEffect } from 'react'

const useKakao = () => {
	useEffect(() => {}, [])

	const KakaoLogin = (payload: any) => {
		// @ts-ignore
		if (window?.Kakao) {
			// @ts-ignore
			window.Kakao.Auth.login({
				...payload,
			})
		}
	}
	return {
		KakaoLogin,
	}
}

export default useKakao
