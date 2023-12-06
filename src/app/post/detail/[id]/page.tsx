'use client'

import Images from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import BackButton from '@/src/components/BackButton'
import PostDetailTab from '@/src/components/PostDetailTab'
import { PostDetailAction } from '@/src/components/Board'
import PostApi, { PostI } from '@/src/services/Post'
import ListReview from '@/src/components/ListReview'
import { useAppDisPatch, useAppSelector } from '@/src/stores/hook'
import { postActions } from '@/src/stores/post/postSlice'
import { AuthenContextWrapper } from '@/src/context/contextAuthenProvider'

export default function Page({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { tab: string }
}) {
	const { tab } = searchParams
	const isReviewTab = tab === 'review'
	const userData = useAppSelector((state) => state.user.profile)

	const dispatch = useAppDisPatch()
	const router = useRouter()

	const [post, setPost] = useState<PostI>()

	const getPost = async () => {
		try {
			const result = await PostApi.findOne(params.id, {
				fields: ['$all', { category: ['$all'] }],
			})
			const detail = result.results.object
			setPost(detail)
		} catch (err) {
			console.log(err)
		}
	}

	const handleDelete = () => {
		if (post) {
			dispatch(
				postActions.delete({
					id: params.id,
					thema_id: post?.category.thema_id,
				}),
			)
			router.back()
		}
	}

	const handleEdit = () => {
		if (post) {
			router.push(`/post/create/${post.category.thema_id}/${post.id}`)
		}
	}

	useEffect(() => {
		getPost()
	}, [])

	if (!post) return null

	return (
		<Provider auth={isReviewTab}>
			<div className='bg-black min-h-screen text-white'>
				<div className='px-4 py-2.5 flex justify-between'>
					<button className='text-white'>
						<BackButton
							icon={
								<div className='flex gap-2'>
									<Images
										src='/icons/arrow-white.svg'
										alt=''
										width={24}
										height={24}
									/>
									<span className='font-bold'>뒤로</span>
								</div>
							}
						/>
					</button>
					{userData.id === post.user_id ? (
						<div className='flex items-center gap-2 font-bold'>
							<button className='text-white' onClick={handleEdit}>
								수정
							</button>
							<button className='text-[#FF8181]' onClick={handleDelete}>
								삭제
							</button>
						</div>
					) : null}
				</div>
				<div className='px-4 py-3'>
					<p className='line-clamp-3 text-xl font-bold'>{post.title}</p>
				</div>
				<PostDetailTab comment={post.comment} />
				{isReviewTab ? (
					<ListReview post_id={params.id} blackInput owner_id={post.user_id} />
				) : null}
				{!isReviewTab ? (
					<div className='px-4 py-2.5'>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
						<div className='flex flex-col gap-2'>
							{post.images?.map((image, i) => (
								<Images
									key={i}
									src={image}
									alt=''
									width={2000}
									height={1000}
									className='object-cover w-fit m-auto'
								/>
							))}
						</div>
						{post.videos.length ? (
							<div className='flex items-center gap-2 text-[#00B8FF] my-3'>
								<Images
									src='/icons/link-circle-blue.svg'
									alt=''
									width={24}
									height={24}
									className='object-cover'
								/>
								<a
									href={post.videos[0]}
									target='_blank'
									className='line-clamp-6'
								>
									{post.videos[0]}
								</a>
							</div>
						) : null}
						<div className='fixed bottom-20 right-4'>
							<PostDetailAction />
						</div>
					</div>
				) : null}
			</div>
		</Provider>
	)
}

const Provider = ({
	children,
	auth,
}: {
	children?: React.ReactNode
	auth?: boolean
}) => {
	if (!auth) return children
	return <AuthenContextWrapper>{children}</AuthenContextWrapper>
}
