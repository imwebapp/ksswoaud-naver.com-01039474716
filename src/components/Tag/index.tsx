import { classNames } from '@/src/utils/common'
import React from 'react'

interface TagProps {
	title?: string
	color?: string
	size?: string
	rounded?: string
	bg?: string
}

const Tag = ({ title, color, size, rounded, bg }: TagProps) => {
	const classStyle = `inline-flex items-center justify-center  py-1   ${bg} ${rounded} ${color} ${size}`

	return <div className={classStyle}>{title}</div>
}

export default Tag
