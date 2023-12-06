'use client'

import { useState } from 'react'

import { MentorI } from '@/src/services/Mentor'
import MentorItem from '../MentorItem'
import ImageDialog from '../ImagesDialog'

interface ListMentorProps {
	mentors: MentorI[]
}

export default function ListMentor({ mentors }: ListMentorProps) {
	const [openPreview, setOpenPreview] = useState(false)
	const [index, setIndex] = useState(0)

	const images = mentors.map((item) => {
		if (item.images && item.images.length) {
			return item.images[0]
		} else return ''
	})

	const handlePreview = (index: number) => {
		setOpenPreview(true)
		setIndex(index)
	}

	return (
		<div>
			<ImageDialog
				open={openPreview}
				onClose={() => setOpenPreview(false)}
				images={images}
				index={index}
				fit
				className='pt-0 max-w-[calc(100%-50px)]'
			/>
			{mentors.map((item, index) => (
				<MentorItem
					key={index}
					data={item}
					index={index}
					onClick={handlePreview}
				/>
			))}
		</div>
	)
}
