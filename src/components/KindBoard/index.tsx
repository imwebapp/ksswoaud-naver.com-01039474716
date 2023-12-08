'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { classNames } from '@/src/utils/common'
import FilterDialog from '../FilterDialog'
import LocationDialog from '../LocationDialog'
import StationDialog from '../StationDialog'
import { CategoryI } from '@/src/services/Category'
import { TagI } from '@/src/services/Tag'
import { createQueryParams, mergeQueryParams } from '@/src/utils/common'

interface KindBoardProps {
	selectedCategories?: string[]
	selectedTags?: string[]
	categories?: CategoryI[]
	tags?: TagI[]
	line?: string
	station?: string
	province?: string
	district?: string
}

export default function KindBoard({
	categories,
	tags,
	selectedCategories,
	selectedTags,
	line,
	station,
	province,
	district,
}: KindBoardProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams)

	const [openFilter, setOpenFilter] = useState(false)
	const [openLocation, setOpenLocation] = useState(false)
	const [openStation, setOpenStation] = useState(false)

	const handleChangeFilter = (categories: string[], tags: string[]) => {
		// chỉ chọn 1 thì sử dụng _params , còn nếu chọn nhiều hơn 1 thì dùng params
		const _params = new URLSearchParams()
		const queryParams = createQueryParams({ categories, tags }, _params)
		router.push(mergeQueryParams(pathname, queryParams))
	}

	const handleChangeStation = (
		location: string,
		line: string,
		station: string,
	) => {
		// chỉ chọn 1 thì sử dụng _params , còn nếu chọn nhiều hơn 1 thì dùng params
		const _params = new URLSearchParams()
		const queryParams = createQueryParams({ location, line, station }, _params)
		router.push(mergeQueryParams(pathname, queryParams))
	}

	const handleChangeLocation = (province: string, district: string) => {
		// chỉ chọn 1 thì sử dụng _params , còn nếu chọn nhiều hơn 1 thì dùng params
		const _params = new URLSearchParams()
		const queryParams = createQueryParams({ province, district }, _params)
		router.push(mergeQueryParams(pathname, queryParams))
	}

	const handleChangeOrderDistance = () => {
		// const _params = new URLSearchParams()
		// if (_params.has('orderBy')) {
		// 	_params.delete('orderBy')
		// 	router.push(mergeQueryParams(pathname, _params.toString()))
		// } else {
		// 	const queryParams = createQueryParams({ orderBy: 'distance' }, _params)
		// 	router.push(mergeQueryParams(pathname, queryParams))
		// }
		router.push(pathname)
	}

	return (
		<div className='flex px-4 py-3 bg-[#F6F8FA] justify-around'>
			<KindBoardItem
				name='내주변'
				icon='/icons/location.svg'
				activeIcon='/icons/location-active.svg'
				active={searchParams.size === 0}
				onClick={handleChangeOrderDistance}
			/>
			<KindBoardItem
				name='지역선택'
				icon='/icons/locate.svg'
				activeIcon='/icons/locate-active.svg'
				active={!!province || !!district}
				onClick={() => setOpenLocation(true)}
			/>
			<KindBoardItem
				name='지하철'
				icon='/icons/train.svg'
				activeIcon='/icons/train-active.svg'
				active={!!line || !!station}
				onClick={() => setOpenStation(true)}
			/>
			<KindBoardItem
				name='필터'
				icon='/icons/filter.svg'
				activeIcon='/icons/filter-active.svg'
				onClick={() => setOpenFilter(true)}
				active={!!selectedCategories || !!selectedTags}
			/>
			{openFilter ? (
				<FilterDialog
					open={openFilter}
					onClose={() => setOpenFilter(false)}
					selectedCategories={selectedCategories}
					selectedTags={selectedTags}
					categories={categories}
					tags={tags}
					onSubmit={handleChangeFilter}
				/>
			) : null}
			{openLocation ? (
				<LocationDialog
					open={openLocation}
					onClose={() => setOpenLocation(false)}
					province={province}
					district={district}
					onSubmit={handleChangeLocation}
				/>
			) : null}
			{openStation ? (
				<StationDialog
					open={openStation}
					onClose={() => setOpenStation(false)}
					onSubmit={handleChangeStation}
					line={line}
					station={station}
				/>
			) : null}
		</div>
	)
}

interface KindBoardItemProps {
	icon: string
	activeIcon: string
	name: string
	active?: boolean
	onClick?: () => void
}

function KindBoardItem({
	icon,
	activeIcon,
	name,
	active,
	onClick,
}: KindBoardItemProps) {
	return (
		<button className='flex flex-col items-center gap-1' onClick={onClick}>
			<div className='w-11 h-11 border rounded-full p-1 bg-white'>
				<div
					className={classNames(
						'w-full h-full rounded-full flex items-center justify-center',
						active
							? 'bg-[linear-gradient(148deg,_#5099FF_16.53%,_#005BDB_84.41%)]'
							: 'bg-[#F6F8FA]',
					)}
				>
					<Image
						src={active ? activeIcon : icon}
						alt=''
						width={24}
						height={24}
					/>
				</div>
			</div>
			<span
				className={classNames(
					!active ? 'text-[#8B8B8B] font-normal' : 'text-black font-medium',
					'text-xs',
				)}
			>
				{name}
			</span>
		</button>
	)
}
