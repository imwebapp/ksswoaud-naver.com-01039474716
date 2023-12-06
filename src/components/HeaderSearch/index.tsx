'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export interface HeadSearchProps {
	firstBoardHref?: string
}

export default function HeaderSearch({ firstBoardHref }: HeadSearchProps) {
	const router = useRouter()
	const pageSearchParams = useSearchParams()
	const pathname = usePathname()

	const keyword = pageSearchParams.get('keyword')

	const [value, setValue] = useState<string | undefined>()

	const handleSearch = () => {
		const params = new URLSearchParams(pageSearchParams)
		if (value) {
			params.set('keyword', value)
		} else {
			params.delete('keyword')
		}
		if (firstBoardHref && pathname === '/') {
			router.push(firstBoardHref + '?' + params.toString())
		} else {
			router.push(pathname + '?' + params.toString())
		}
	}

	useEffect(() => {
		if (keyword && keyword !== value) {
			setValue(keyword)
		}
	}, [keyword])

	return (
		<form
			className='grow relative'
			onSubmit={(e) => {
				handleSearch()
				e.preventDefault()
			}}
		>
			<input
				className='bg-[#F6F8FA] rounded-[100px] w-full px-4 py-2 pr-10 text-[#00F]'
				placeholder='어디를 찾고 있나요?'
				value={value}
				defaultValue={keyword ?? undefined}
				onChange={(e) => setValue(e.currentTarget.value)}
			/>
			<button
				className='absolute bg-[linear-gradient(148deg,_#5099FF_16.53%,_#005BDB_84.41%)]
        p-1 rounded-full top-2 right-2'
				type='submit'
			>
				<Image src='/icons/search.svg' alt='' width={16} height={16} />
			</button>
		</form>
	)
}
