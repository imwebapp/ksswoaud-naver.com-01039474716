'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { CategoryI } from '@/src/services/Category'
import { classNames } from '@/src/utils/common'

interface PostCategoryProps {
	categories?: CategoryI[]
}

export default function PostCategory({ categories }: PostCategoryProps) {
	const searchParams = useSearchParams()
	const category_id = searchParams.get('category_id')

	return (
		<div className='flex overflow-auto no-scrollbar'>
			<PostCategoryItem name='전체' active={!category_id} />
			{categories?.map((item, i) => (
				<PostCategoryItem
					key={i}
					name={item.name}
					id={item.id}
					active={category_id === item.id}
				/>
			))}
		</div>
	)
}

interface PostCategoryItemProps {
	id?: string
	name: string
	active?: boolean
}
const PostCategoryItem = ({ name, active, id }: PostCategoryItemProps) => {
	const pathName = usePathname()
	const router = useRouter()

	const handleClick = () => {
		if (!id) {
			router.push(pathName)
		} else {
			const params = new URLSearchParams()
			params.set('category_id', id)
			router.push(pathName + '?' + params.toString())
		}
	}

	return (
		<button
			className={classNames(
				'px-6 py-2 text-[#505050] text-sm rounded whitespace-nowrap',
				active ? 'bg-black text-white font-medium' : null,
			)}
			onClick={handleClick}
		>
			{name}
		</button>
	)
}
