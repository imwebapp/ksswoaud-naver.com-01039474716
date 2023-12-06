'use client'

import { useState, useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'

import ReviewInput from '../ReviewInput'
import ReviewItem from '../ReviewItem'
import FixedComponent from '../FixedComponent'
import { classNames } from '@/src/utils/common'
import { useAppSelector } from '@/src/stores/hook'
import ReviewApi, { ReviewI, ReviewPayload } from '@/src/services/Review'

interface ListReviewProps {
	shop_id?: string
	post_id?: string
	owner_id?: string
	blackInput?: boolean
}

export default function ListReview({
	shop_id,
	post_id,
	owner_id,
	blackInput,
}: ListReviewProps) {
	const userData = useAppSelector((state) => state.user.profile)

	const inputRef = useRef<HTMLInputElement>(null)
	const [reviews, setReviews] = useState<ReviewI[]>()
	const [parentId, setParentId] = useState<string>()
	const [isPrivate, setIsPrivate] = useState(false)
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 20,
		total: 0,
	})

	const getListReview = async () => {
		const response = await ReviewApi.getList({
			fields: ['$all'],
			filter: {
				shop_id,
				post_id,
				parent_id: null,
			},
		})
		setPagination({ ...pagination, total: response.results.objects.count })
		const listReview = response.results.objects.rows
		if (!reviews) {
			setReviews(listReview)
		} else {
			setReviews([...reviews, ...listReview])
		}
	}

	const loadMore = () => {
		setPagination({ ...pagination, page: pagination.page + 1 })
	}

	const hasMore = !!reviews && reviews.length < pagination.total

	const handleCreateReview = async (value: string) => {
		try {
			const payload: ReviewPayload = {
				content: value,
				shop_id,
				post_id,
				parent_id: parentId,
				private: isPrivate,
			}
			const result = await ReviewApi.create(payload)

			const newReview: any = {
				...result.results.object.comment,
				created_at: new Date(),
				user: {
					avatar: userData?.avatar,
					nickname: userData?.nickname,
				},
			}
			if (!parentId) {
				if (reviews) {
					setReviews([newReview, ...reviews])
				} else {
					setReviews([newReview])
				}
				window.scrollTo(0, 0)
			} else {
				setReviews((reviews) => {
					if (reviews) {
						const _reviews = [...reviews]
						const index = reviews.findIndex((item) => item.id === parentId)
						const _listReplies = _reviews[index].replies
						_reviews[index].count_reply = +_reviews[index].count_reply + 1
						if (_listReplies)
							_reviews[index].replies = [newReview, ..._listReplies]
						else {
							_reviews[index].replies = [newReview]
						}
						return _reviews
					}
					return reviews
				})
				setParentId(undefined)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleGetReply = async (id: string) => {
		try {
			const response = await ReviewApi.getList({
				fields: ['$all'],
				filter: {
					parent_id: id,
				},
			})
			setReviews((reviews) => {
				if (reviews) {
					const _reviews = [...reviews]
					const index = reviews.findIndex((item) => item.id === id)
					_reviews[index].replies = response.results.objects.rows
					return _reviews
				}
				return reviews
			})
		} catch (err) {
			console.log(err)
		}
	}

	const handleDeleteReview = async (id: string, parent_id?: string) => {
		try {
			await ReviewApi.delete(id)
			if (reviews) {
				if (parent_id) {
					const parentIndex = reviews?.findIndex(
						(item) => item.id === parent_id,
					)
					if (parentIndex >= 0) {
						const _reviews = [...reviews]

						_reviews[parentIndex].count_reply =
							_reviews[parentIndex].count_reply - 1

						_reviews[parentIndex].replies = _reviews[
							parentIndex
						].replies?.filter((item) => item.id != id)
						setReviews(_reviews)
					}
				} else {
					const _reviews = [...reviews].filter((item) => item.id != id)
					setReviews(_reviews)
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleClickReview = (id?: string) => {
		if (inputRef.current) {
			setParentId(id)
			inputRef.current.focus()
		}
	}

	useEffect(() => {
		getListReview()
	}, [pagination.page])

	return (
		<div className='pb-20'>
			{reviews ? (
				<>
					{reviews.length ? (
						<InfiniteScroll
							loader=''
							hasMore={hasMore}
							next={loadMore}
							dataLength={pagination.total}
						>
							{reviews.map((review, i) => {
								const hidden =
									review.private &&
									userData.id !== owner_id &&
									userData.id !== review.user_id
								return (
									<div key={i}>
										<div
											className={classNames(
												'p-4',
												review.id === parentId ? 'bg-[#D8D8D8]' : '',
											)}
										>
											<ReviewItem
												id={review.id}
												content={review.content}
												created_at={review.created_at}
												count_reply={review.count_reply}
												avatar={review.user?.avatar}
												nickname={review.user?.nickname}
												replies={review.replies}
												text_white={blackInput}
												selected_reply={!!review.id && review.id === parentId}
												isPrivate={review.private}
												hidden={hidden}
												user_id={review.user_id}
												onCLickReply={handleClickReview}
												onGetReply={() => handleGetReply(review.id)}
												onDelete={handleDeleteReview}
											/>
										</div>
										{i < reviews.length - 1 ? (
											<hr className='border-t-4' />
										) : null}
									</div>
								)
							})}
						</InfiniteScroll>
					) : (
						<div className='flex flex-col items-center mt-32'>
							<Image
								src={'/images/empty.png'}
								width={124}
								height={124}
								alt=''
								className='mb-4'
							/>
							<p>작성된 리뷰가 없습니다</p>
							<p>먼저 리뷰를 작성해 주세요</p>
						</div>
					)}
				</>
			) : null}

			<FixedComponent>
				<div
					className={classNames(
						'p-4 border-t',
						blackInput ? 'bg-black' : 'bg-white',
					)}
				>
					<ReviewInput
						onSubmit={handleCreateReview}
						black={blackInput}
						ref={inputRef}
						isPrivate={isPrivate}
						onClickPrivate={() => setIsPrivate((prev) => !prev)}
					/>
				</div>
			</FixedComponent>
		</div>
	)
}
