import LoginContainer from '@/src/containers/LoginContainer'
import { memo } from 'react'
import { Metadata } from 'next'

export const metadata : Metadata = {
	title: '로그인',
	description: '환영합니다! 로그인 페이지에 접속하여 부산 출장 마사지, 부산 출장 안마, 부산 홈타이, 해운대 출장 마사지, 서면 출장 마사지와 관련된 개인 정보를 안전하게 관리하고 최신 소식 및 특별 혜택을 놓치지 마세요. 더불어, 회원 전용 콘텐츠와 부산 출장 마사지 예약 서비스를 이용하여 더욱 간편하게 특별한 혜택과 서비스를 만나보세요. 원활하고 빠른 로그인으로 여러분만의 특별한 경험을 시작하세요.',
	alternates: {
		canonical: `/login`,
	}
}
const LoginPage = () => {
	return <LoginContainer />
}

export default memo(LoginPage)
