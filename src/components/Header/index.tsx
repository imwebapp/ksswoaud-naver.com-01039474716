import Image from 'next/image'
import Link from 'next/link'

import Navigation from '../Navigation'
import { LinkI } from '@/src/services/Link'
import MenuSetting from '../MenuSetting'
import { Motion } from '../Motion'
import dynamic from 'next/dynamic'
import { createBoardLink } from '@/src/utils/common'
const HeaderSearch = dynamic(() => import('../HeaderSearch'), {
	ssr: false,
})

export interface HeaderProps {
	links?: LinkI[]
	children?: React.ReactNode
	hiddenLink?: boolean
}

export default function Header({ links, children, hiddenLink }: HeaderProps) {
	const firstBoardHref =
		links && links[0]
			? createBoardLink(links[0].route, links[0].thema_id)
			: undefined

	return (
		<header
			className='max-h-[108px] flex items-center flex-col px-2.5 py-1.5 m-[0_auto]
      fixed top-0 left-0 right-0 w-full bg-white z-50 max-w-[502px]'
		>
			<div className='flex gap-3 w-full'>
				<div className='flex gap-2 items-center'>
					<MenuSetting />
					<Motion>
						<Link href='/' className='flex'>
							<Image
								src='/images/logo.jpg'
								alt='Logo'
								width={24}
								height={24}
								className='object-cover max-h-[24px]'
							/>
						</Link>
					</Motion>
				</div>
				<HeaderSearch firstBoardHref={firstBoardHref} />
			</div>
			{links && !hiddenLink ? <Navigation links={links} /> : null}
			{children}
		</header>
	)
}
