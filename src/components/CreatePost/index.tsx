'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'

import PostCategoryDialog from '../PostCategoryDialog'
import PostLinkInput from '../PostLinkInput'
import FixedComponent from '../FixedComponent'
import PostApi, { PostPayload } from '@/src/services/Post'
import { CategoryI } from '@/src/services/Category'
import Editor from '../Editor'
import BackButton from '../BackButton'
import useData from '@/src/hooks/useData'
import { classNames } from '@/src/utils/common'
import FileApi from '@/src/services/File'
import Loading from '../Loading'

interface CreatePostProps {
	categories: CategoryI[]
	id?: string
}

interface PostForm {
	content: string
	title: string
	category: {
		id: string
		name: string
	}
	location: string
	videos?: string[]
	images?: string[]
	thumbnails?: string[]
}

export default function CreatePost({ categories, id }: CreatePostProps) {
	const router = useRouter()

	const [openCategory, setOpenCategory] = useState(false)
	const [openPostLinkInput, setOpenPostLinkInput] = useState(false)
	const [loading, setLoading] = useState(false)
	let inputRef = useRef<HTMLInputElement | null>(null)
	const [images, setImages] = useState<any>([])
	const [thumbs, setThumbs] = useState<any>([])
	const [link, setLink] = useState<any>()

	const { register, handleSubmit, setValue, getValues, control, watch } =
		useForm<PostForm>({
			defaultValues: {
				location: '1',
			},
		})

	const isActiveSubmit: any = () => {
		return !!getValues('category') && !!getValues('content')
	}

	const onSubmit = async (data: PostForm) => {
		console.log(getValues('category'))

		if (!data.category) return alert('Please select a category')
		const payload: PostPayload = {
			category_id: data.category.id,
			content: data.content,
			location: data.location,
			videos: data.videos,
			title: data.title,
			images: data.images,
			thumbnails: data.thumbnails,
		}

		setLoading(true)
		try {
			if (!id) {
				await PostApi.create(payload)
			} else {
				await PostApi.update(payload, id)
			}
			router.back()
		} catch (err) {
			enqueueSnackbar((err as any).message, {
				variant: 'error',
			})
		} finally {
			setLoading(false)
		}
	}

	const getDetailPost = async () => {
		if (id) {
			try {
				const result = await PostApi.findOne(id, {
					fields: ['$all', { category: ['$all'] }],
				})
				const post = result.results.object
				setValue('content', post.content)
				setValue('title', post.title)
				setValue('videos', post.videos)
				setValue('category', { id: post.category_id, name: post.category.name })
				setValue('images', post.images)
				setValue('thumbnails', post.thumbnails)
				setLink((post.videos ?? []).length > 0 ? post.videos[0] : '')
				setImages(post.images)
				setThumbs(post.thumbnails)
			} catch (err) {
				enqueueSnackbar((err as any).message, {
					variant: 'error',
				})
			}
		} else {
			setLink('')
		}
	}

	watch('category')

	useEffect(() => {
		getDetailPost()
	}, [id])

	const removeImg = (index: number) => {
		const newImgs = images.filter((item: any, i: any) => index !== i)
		const newThumbs = thumbs.filter((item: any, i: any) => index !== i)
		setImages(newImgs)
		setThumbs(newThumbs)
		setValue('images', newImgs)
		setValue('thumbnails', newThumbs)
	}

	const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if ((event?.target?.files ?? []).length > 0) {
			try {
				setLoading(true)
				const result = await FileApi.uploadMultipleImages(event?.target?.files!)
				const { high_quality_images, low_quality_images }: any =
					result.results.object

				const newImages = images.concat(
					(high_quality_images ?? []).map((item: any) => item?.url),
				)
				const newThumbs = thumbs.concat(
					(low_quality_images ?? []).map((item: any) => item?.url),
				)
				setImages(newImages)
				setThumbs(newThumbs)
				setValue('images', newImages)
				setValue('thumbnails', newThumbs)
			} catch (error) {
				console.log('err', error)
				enqueueSnackbar((error as any).message, {
					variant: 'error',
				})
			} finally {
				setLoading(false)
			}
		}
	}

	const CardHeader = () => {
		return (
			<div className='flex flex-row justify-between items-center'>
				<div className='flex flex-row items-center justify-start'>
					<button className='w-fit px-3.5 py-2.5'>
						<BackButton
							icon={
								<Image src='/icons/close.svg' alt='' width={24} height={24} />
							}
						/>
					</button>
					<span className='text-lg font-bold'>게시물 작성</span>
				</div>
				<button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
					className={`${
						!!isActiveSubmit()
							? 'bg-gradient-to-b from-[#A9D1FF] to-[#007FC7]'
							: 'bg-[#E4E4EB]'
					}  h-[32px] w-[58px] rounded-[100px] mr-4 flex justify-center items-center`}
				>
					<span
						className={`text-sm font-medium ${
							!!isActiveSubmit() ? 'text-white' : 'text-[#555770]'
						}`}
					>
						작성
					</span>
				</button>
			</div>
		)
	}

	const CardContent = () => {
		const { userData } = useData()
		const { nickname, avatar } = userData

		return (
			<div className='p-[16px] border-t-[1px] border-[#dfe0e6]'>
				<div className='flex flex-row relative'>
					<Image
						src={avatar ?? ''}
						alt=''
						width={60}
						height={60}
						className='h-[60px] rounded-full object-cover'
					/>
					<div className='ml-3'>
						<span className='text-base font-medium'>{nickname}</span>
						<div
							className='flex mt-1 text-black border-2 border-[#C7C9D9] rounded-full py-2 px-3 gap-2'
							onClick={() => setOpenCategory(true)}
						>
							<span>{getValues('category.name') ?? '카테고리'}</span>
							<Image src='/icons/chew-down.svg' alt='' width={24} height={24} />
						</div>
					</div>
				</div>
				<textarea
					// rows={3}
					placeholder='내용을 입력해주세요.'
					className='mt-[24px] placeholder-[#C7C9D9] w-full'
					{...register('content', { required: true })}
				/>
				<div className='flex overflow-auto gap-1'>
					{thumbs.map((item: any, index: number) => (
						<div
							className='min-w-[100px] h-[100px] overflow-hidden relative'
							key={index}
						>
							<div className='absolute top-2 bg-gray-400 w-[86px] rounded-xl h-[86px]'>
								<Image
									src={item ?? ''}
									alt=''
									width={86}
									height={86}
									className='h-[86px] rounded-xl object-cover'
								/>
							</div>
							<Image
								onClick={() => removeImg(index)}
								src='/icons/ic-close2.svg'
								alt=''
								width={24}
								height={24}
								className='absolute top-0 right-0 z-40'
							/>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<>
			<CardHeader />
			<CardContent />
			<FixedComponent>
				<div className='w-full bg-[#FAFAFC]'>
					<div className='flex justify-start px-4 py-3 gap-[32px]'>
						<div
							onClick={() => setOpenPostLinkInput(true)}
							className='flex gap-1 flex-row items-center'
						>
							<Image src='/icons/video.svg' alt='' width={24} height={24} />
							<span className='text-base font-medium'>동영상</span>
						</div>
						<div
							onClick={() => inputRef.current && inputRef.current.click()}
							className='flex gap-1 flex-row items-center'
						>
							<Image
								src='/icons/gallery-black.svg'
								alt=''
								width={24}
								height={24}
							/>
							<span className='text-base font-medium'>이미지</span>
						</div>
						<input
							ref={inputRef}
							className='hidden'
							type='file'
							accept='image/png, image/jpg, image/svg, image/webp'
							multiple
							onChange={handleUploadImage}
						/>
					</div>
				</div>
			</FixedComponent>
			<PostCategoryDialog
				open={openCategory}
				onClose={() => setOpenCategory(false)}
				onChange={(e) => setValue('category', JSON.parse(e.target.value))}
				value={getValues('category.id')}
				data={categories.map((category) => ({
					id: category.id,
					name: category.name,
				}))}
			/>
			{link !== undefined && (
				<PostLinkInput
					open={openPostLinkInput}
					onClose={() => setOpenPostLinkInput(false)}
					onSubmit={(value) => setValue('videos', [value])}
					value={link}
				/>
			)}
			<Loading loading={loading} />
		</>
	)
}
