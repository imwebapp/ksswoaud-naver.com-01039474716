import Image from 'next/image'

import Dialog from '../Dialog'
import { classNames } from '@/src/utils/common'
import { CategoryI } from '@/src/services/Category'
import { TagI } from '@/src/services/Tag'
import { useState } from 'react'

interface FilterDialogProps {
	open: boolean
	selectedCategories?: string[]
	selectedTags?: string[]
	categories?: CategoryI[]
	tags?: TagI[]
	onClose: () => void
	onSubmit?: (categories: string[], tags: string[]) => void
}

export default function FilterDialog({
	open,
	categories,
	tags,
	onClose,
	onSubmit,
	...props
}: FilterDialogProps) {
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		props.selectedCategories ?? [],
	)
	const [selectedTags, setSelectedTags] = useState<string[]>(
		props.selectedTags ?? [],
	)

	const handleSelectCategory = (id: string) => {
		if (selectedCategories.includes(id)) {
			setSelectedCategories(selectedCategories.filter((item) => item !== id))
		} else {
			setSelectedCategories([...selectedCategories, id])
		}
	}

	const handleSelectTag = (id: string) => {
		if (selectedTags.includes(id)) {
			setSelectedTags(selectedTags.filter((item) => item !== id))
		} else {
			setSelectedTags([...selectedTags, id])
		}
	}

	const handleReset = () => {
		setSelectedTags([])
		setSelectedCategories([])
	}

	const handleSubmit = () => {
		onClose()
		onSubmit && onSubmit(selectedCategories, selectedTags)
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			bottom
			fullWidth
			maxWidth='md'
			borderTop
		>
			<div className='relative max-h-[calc(100vh-100px)] overflow-auto '>
				<div className='px-4 py-3 flex justify-between border-b sticky top-0 bg-white'>
					<p className='text-xl'>필터</p>
					<button onClick={onClose}>
						<Image src='/icons/close.svg' alt='' height={24} width={24}></Image>
					</button>
				</div>
				<div className='p-4 pb-16'>
					<div>
						<p className='font-medium'>카테고리</p>
						<div className='flex flex-wrap gap-4 py-4'>
							<FilterItem
								name='전체'
								active={!selectedCategories || selectedCategories.length === 0}
								onClick={() => setSelectedCategories([])}
							/>
							{categories?.map((item, index) => (
								<FilterItem
									key={index}
									active={selectedCategories.includes(item.id)}
									name={item.name}
									onClick={() => handleSelectCategory(item.id)}
								/>
							))}
						</div>
					</div>
					<div className='border-t pt-4'>
						<p className='font-medium'>해시태그</p>
						<div className='flex flex-wrap gap-4 py-4'>
							<FilterItem
								name='전체'
								active={!selectedTags || selectedTags.length === 0}
								onClick={() => setSelectedTags([])}
							/>
							{tags?.map((item, index) => (
								<FilterItem
									key={index}
									name={item.name}
									active={selectedTags.includes(item.id)}
									onClick={() => handleSelectTag(item.id)}
								/>
							))}
						</div>
					</div>
				</div>
				<div className='flex p-4 gap-3 border-t sticky bottom-0 bg-white'>
					<button
						className='border rounded border-[#5099FF] grow py-3 text-[#5099FF]
            font-medium'
						onClick={handleReset}
					>
						초기화
					</button>
					<button
						className='grow border rounded bg-[linear-gradient(148deg,_#5099FF_16.53%,_#005BDB_84.41%)]
            text-white font-medium'
						onClick={handleSubmit}
					>
						적용
					</button>
				</div>
			</div>
		</Dialog>
	)
}

interface FilterItemProps {
	name: string
	active?: boolean
	onClick?: () => void
}

const FilterItem = ({ name, active, onClick }: FilterItemProps) => {
	return (
		<button
			className={classNames(
				'border rounded-[100px] px-4 py-2.5',
				active ? 'bg-black text-white' : 'null',
			)}
			onClick={onClick}
		>
			{name}
		</button>
	)
}
