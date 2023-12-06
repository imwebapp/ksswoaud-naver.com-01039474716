'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { classNames } from '@/src/utils/common'

export default function EventTab() {
	const pathname = usePathname()
	const router = useRouter()

	const linkClassName = (active?: boolean) =>
		classNames(
			'grow text-center text-xl font-bold py-2.5',
			active ? 'border-b-2 border-black' : null,
		)

	const handleClickCreateTab = () => {
		router.replace('/event/create')
	}

	const handleClickMyEventTab = () => {
		router.replace('/event/my-event')
	}

	return (
		<div className='flex [&>*]:grow'>
			<button
				className={linkClassName(pathname.includes('/event/create'))}
				onClick={handleClickCreateTab}
			>
				등록
			</button>
			<button
				className={linkClassName(pathname.includes('/event/my-event'))}
				onClick={handleClickMyEventTab}
			>
				진행중
			</button>
		</div>
	)
}
