'use client'

import { useState, useEffect } from 'react'

import { ReviewI } from '@/src/services/Review'
import ReviewApi from '@/src/services/Review'
import ReviewItem from '../ReviewItem'

interface ListShopReviewProps {
	id: string
}

export default function ListShopReview({ id }: ListShopReviewProps) {
	const [list, setList] = useState<ReviewI[]>()
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 20,
		total: 0,
	})

	const getListReview = async () => {
		const result = await ReviewApi.getList({
			fields: ['$all', { user: ['$all'] }],
			filter: { shop_id: id },
			page: pagination.page,
			limit: pagination.limit,
		})
	}

	useEffect(() => {
		getListReview()
	}, [])

	return <div></div>
}
