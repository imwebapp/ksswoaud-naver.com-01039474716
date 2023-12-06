'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { classNames } from '@/src/utils/common'

interface PostDetailTabProps {
	comment: number
}

export default function PostDetailTab({ comment }: PostDetailTabProps) {
	const router = useRouter()
	const pathName = usePathname()
	const searchParams = useSearchParams()

	const handleClickReviewTab = () => {
		const params = new URLSearchParams()
		params.set('tab', 'review')
		router.replace(pathName + '?' + params.toString())
	}

	const handleClickDetailTab = () => {
		router.replace(pathName)
	}

	const isComment = searchParams.get('tab') === 'review'

	return (
		<div className='flex text-xl font-bold'>
			<Board3DetailTab
				name='내용'
				active={!isComment}
				onClick={handleClickDetailTab}
			/>
			<Board3DetailTab
				name={`리뷰 ${comment}`}
				active={isComment}
				onClick={handleClickReviewTab}
			/>
		</div>
	)
}

interface Board3DetailTabProps {
	name: string
	active?: boolean
	onClick?: () => void
}

const Board3DetailTab = ({ name, active, onClick }: Board3DetailTabProps) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				'grow text-center py-2.5 border-b-2',
				active ? 'bg-[#00B9FF] border-b-[#5099FF]' : null,
			)}
		>
			{name}
		</button>
	)
}
