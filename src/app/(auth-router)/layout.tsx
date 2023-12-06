import { AuthenContextWrapper } from '@/src/context/contextAuthenProvider'

export default function AuthGroupLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <AuthenContextWrapper>{children}</AuthenContextWrapper>
}
