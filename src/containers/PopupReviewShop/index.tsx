import BackButton from '@/src/components/BackButton'
import {
	BoardDetailAction,
	BoardDetailCarousel,
	BoardDetailInfo,
	BoardDetailTab,
} from '@/src/components/Board'
import Button from '@/src/components/Button'
import CourseItem from '@/src/components/CourseItem'
import Dialog from '@/src/components/Dialog'
import MentorItem from '@/src/components/MentorItem'
import ShopApi from '@/src/services/Shop'
import { RootState } from '@/src/stores'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const IcBack = () => {
	return (
		<svg
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect x='0.5' y='0.5' width='39' height='39' rx='9.5' stroke='#F0F5F9' />
			<path
				d='M22.5 25L17.5 20L22.5 15'
				stroke='#697896'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const OverlayComponent = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='test relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[90000]'>
			{children}
		</div>
	)
}

interface PopupReviewShopProps {
	open?: boolean
	onClose?: () => void
}

const PopupReviewShop: React.FC<PopupReviewShopProps> = ({
	open = false,
	onClose = () => {},
}) => {
	const shop = useSelector((state: RootState) => state?.shop?.store)

	return (
		<Dialog open={open} onClose={onClose} fullScreen fullWidth>
			<div className='pb-[15px] relative max-w-[502px] mx-auto'>
				<div className='absolute top-5 left-4 z-[1] max-w-[502px] mx-auto'>
					<button className='w-10 h-10' onClick={onClose}>
						<Image
							src='/icons/chevron-left-rounded.svg'
							alt=''
							width={40}
							height={40}
						/>
					</button>
				</div>

				{shop && (
					<>
						<BoardDetailCarousel images={shop?.images} />
						<div className='py-8'>
							<h1 className='text-center text-2xl font-bold'>{shop.title}</h1>
						</div>
						<div className='test relative before:absolute before:top-0 before:left-0 before:w-full before:h-full'>
							<OverlayComponent>
								<BoardDetailAction
									phoneNumber={shop?.contact_phone}
									id={shop?.id}
									like={shop?.is_like}
								/>
							</OverlayComponent>
						</div>
						<OverlayComponent>
							<BoardDetailTab id={shop.id} title={shop.title} />
						</OverlayComponent>

						<BoardDetailInfo
							address={shop.address}
							workingTime={shop.opening_hours}
							phoneNumber={shop.contact_phone}
							thema={shop?.category?.thema?.name}
							category={shop?.category?.name}
							tags={shop?.tags?.map((tags: any) => tags.tag)}
						/>
						{shop?.events && shop?.events[0] ? (
							<div className='py-3 border-y border-y-[#A2A5AA]'>
								<div
									className='shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] border-l-4 border-l-[#04BBFF]
        flex flex-row justify-between rounded-md relative overflow-hidden'
								>
									<div className='flex gap-3 items-center  py-7 px-5'>
										<Image
											src='/images/discount.png'
											alt=''
											width={44}
											height={44}
										/>
										<div className='text-sm'>
											<p className='text-[#466AFF]'>{shop?.events[0].title}</p>
											<p className='font-medium'>
												{shop.events[0].description}
											</p>
										</div>
									</div>
									<div className='flex justify-between items-center border-l px-5 border-dashed'>
										34일남음
									</div>
								</div>
							</div>
						) : null}

						{shop?.courses && shop?.courses.length ? (
							<div className='py-2 px-4 [&>*]:border-t '>
								<p className='font-bold text-sm py-1 border-none'>가격표</p>
								{shop?.courses.map((item: any, index: any) => (
									<CourseItem key={index} data={item} />
								))}
							</div>
						) : null}
						<div
							className='flex flex-col items-center p-4'
							dangerouslySetInnerHTML={{ __html: shop?.description }}
						/>
						{shop?.mentors && shop?.mentors?.length ? (
							<div className='flex flex-col gap-4 py-2 px-4'>
								<p className='text-lg font-bold'>
									담당자
									<span className='text-[#4186E5]'>{`(${shop.mentors?.length})`}</span>
								</p>
								{shop?.mentors.map((item: any, index: any) => (
									<MentorItem
										index={index}
										key={index}
										data={{
											...item,
											thumbnail: item.images,
											images: item.images,
										}}
									/>
								))}
							</div>
						) : null}
						<div className='px-[15px]'>
							<Button onClick={onClose}>닫기</Button>
						</div>
					</>
				)}
			</div>
		</Dialog>
	)
}

export default PopupReviewShop
