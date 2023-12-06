'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

import FilterDialog from '../../FilterDialog'
import { CategoryI } from '@/src/services/Category'
import { TagI } from '@/src/services/Tag'
import { createQueryParams, mergeQueryParams } from '@/src/utils/common'
import { useAppSelector } from '@/src/stores/hook'
import { ACCOUNT_TYPE } from '@/src/constants'

interface JumpUpButtonButtonProps {
	categories?: CategoryI[]
	tags?: TagI[]
	selectedCategories?: string[]
	selectedTags?: string[]
}

export default function JumpUpButtonGroup({
	categories,
	tags,
	selectedCategories,
	selectedTags,
}: JumpUpButtonButtonProps) {
	const userData = useAppSelector((state) => state.user.profile)

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const [open, setOpen] = useState(false)

	const handleChangeFilter = (categories: string[], tags: string[]) => {
		const queryParams = createQueryParams({ categories, tags }, params)
		router.push(mergeQueryParams(pathname, queryParams))
	}

	return (
		<div className='fixed bottom-20 right-7 z-50'>
			{userData.account_type &&
			userData.account_type === ACCOUNT_TYPE.BIZ_USER ? (
				<Link href={`/advertising-jump-up/store?from=${pathname}`}>
					<button
						className='bg-[linear-gradient(183deg,#343434_2.52%,#221A33_104.38%)]
            flex mb-3 p-2.5 text-white rounded-[100px] w-full justify-center'
					>
						<Image src='/icons/arrow-up-1.svg' alt='' width={24} height={24} />
						<span>점프업</span>
					</button>
				</Link>
			) : null}
			<button
				className='bg-white text-black flex rounded-[100px] p-2.5
        shadow w-full justify-center'
				onClick={() => setOpen(true)}
			>
				<Image src='/icons/filter-black.svg' alt='' width={24} height={24} />
				<span>필터</span>
			</button>
			{open ? (
				<FilterDialog
					open={open}
					onClose={() => setOpen(false)}
					categories={categories}
					tags={tags}
					selectedCategories={selectedCategories}
					selectedTags={selectedTags}
					onSubmit={handleChangeFilter}
				/>
			) : null}
		</div>
	)
}
