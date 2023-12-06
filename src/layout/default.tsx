'use client'
import { useRouter } from 'next/navigation'

import FixedComponent from '../components/FixedComponent'
import ChevronLeftIcon from '../components/Icon/ChevronLeftIcon'

export interface DefaultLayoutProps {
	title?: string
	children?: React.ReactNode
}

export default function DefaultLayout({ title, children }: DefaultLayoutProps) {
	const router = useRouter()

	const handleGoBack = () => {
		router.back()
	}

	return (
		<div className='pt-8'>
			<FixedComponent position='top'>
				<div className='flex items-center gap-3 px-3 py-2.5 font-bold bg-white'>
					<button onClick={handleGoBack}>
						<ChevronLeftIcon />
					</button>
					{title}
				</div>
			</FixedComponent>
			{children}
		</div>
	)
}
