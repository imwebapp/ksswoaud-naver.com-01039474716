import Dialog from '@/src/components/Dialog'
import EmptyShopIcon from '@/src/components/Icon/EmptyShopIcon'
import useData from '@/src/hooks/useData'
import ShopApi from '@/src/services/Shop'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const ICClose = () => {
	return (
		<svg
			width='24'
			height='25'
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M6 6.5L18.7742 19.2742'
				stroke='black'
				strokeWidth='1.5'
				strokeLinejoin='round'
			/>
			<path
				d='M6 19.2734L18.7742 6.49924'
				stroke='black'
				strokeWidth='1.5'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

async function getListShop(id: string) {
	const res = await ShopApi.getList(
		{
			fields: ['$all'],
			filter: {
				user_id: id,
			},
			page: 1,
			limit: 20,
		},
		{},
	)
	return res
}

const SharePlayButton = (daysRemaining: number = 0) => {
	if (daysRemaining <= 0) {
		return (
			<button className='bg-[#FF5C5C] rounded-[25px] px-4 py-2 text-white flex justify-center items-center  gap-2 h-[34px]'>
				<Image src={'/icons/sharebtn.svg'} width={25} height={22} alt='' />
				<span className='text-[17px] font-[400]'>만료</span>
			</button>
		)
	} else {
		return (
			<button className='h-[34px] bg-[#03AC00] rounded-[25px] px-4 py-2 text-white flex justify-center items-center  gap-2'>
				<Image src={'/icons/sharebtn.svg'} width={25} height={22} alt='' />
				<span className='text-[17px] font-[400]'>{daysRemaining}일 남음</span>
			</button>
		)
	}
}

const CardAdvertising = ({
	key,
	thumbnails,
	title,
	expired_date,
	id,
}: {
	key: string
	thumbnails: string
	title: string
	expired_date: Date
	id: string
}) => {
	const [dfImage, setDfImage] = useState(false)
	const router = useRouter()
	const formatDataLocale = (timestamp: Date) => {
		const date = moment(+timestamp)
		date.locale('ko')
		const formattedDate = date.format(' M월 D일')
		return formattedDate
	}

	const calculateDaysRemaining = (time: Date) => {
		const currentDate = new Date()

		const providedDate = new Date(+time)

		const timeDiff = providedDate.getTime() - currentDate.getTime()

		const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))

		return daysRemaining
	}

	const dateLocale = expired_date && formatDataLocale(expired_date)
	const daysRemaining = expired_date && calculateDaysRemaining(expired_date)

	return (
		<div
			onClick={() => router.push(`/detail/${title}/${id}`)}
			className='flex justify-center items center max-w-[343px] gap-3 px-4'
			key={key}
		>
			<div className='rounded-3xl w-[98px] h-[98px] relative w-3/12 border border-gray-300 flex justify-center items-center  '>
				{thumbnails ? (
					!dfImage ? (
						<Image
							src={thumbnails}
							fill
							alt=''
							className='rounded-2xl absolute'
							onError={() => setDfImage(true)}
						/>
					) : (
						<AiOutlineShoppingCart className='text-2xl mx-auto text-center ' />
					)
				) : (
					<AiOutlineShoppingCart className='text-2xl mx-auto text-center ' />
				)}
			</div>
			<div className='w-7/12'>
				<p className='font-medium text-start text-[15px] tracking-[0.4px] text-black'>
					{title}
				</p>
				<p className='text-[#3C3C43] text-[13px] opacity-60 text-start'>
					{dateLocale}에 광고종료 예정
				</p>
				<div className='flex justify-end w-full mt-3'>
					{SharePlayButton(daysRemaining)}
				</div>
			</div>
		</div>
	)
}

const PopupAdvertisingStore = ({
	open,
	onClose = () => {},
}: {
	open: boolean
	onClose: () => void
}) => {
	const { userData } = useData()

	const [listShop, setListShop] = useState<any>()
	useEffect(() => {
		if (userData?.id) {
			getListShop(`${userData?.id}`).then((res) => {
				setListShop(res.results.objects.rows)
			})
		}
	}, [])
	return (
		<Dialog
			open={open}
			onClose={onClose}
			bottom
			fullWidth
			maxWidth='md'
			borderTop
		>
			<div className='h-[80vh] flex flex-col '>
				<div className='flex justify-between items-center pt-3 px-8 pb-10'>
					<p className='font-bold text-[20px] my-4 text-black tracking-[0.1px]'>
						광고중인 상점입니다.
					</p>
					<div onClick={onClose} className='flex justify-between items-center'>
						<ICClose />
					</div>
				</div>
				{listShop ? (
					<>
						{listShop.length > 0 ? (
							<div className='flex flex-col gap-5 overflow-auto no-scrollbar pb-24'>
								{listShop &&
									listShop.map((v: any, idx: any) => {
										const props = {
											thumbnails: v?.thumbnails
												? v?.thumbnails[0]
												: v?.images[0] ?? '',
											title: v?.title,
											expired_date: v?.expired_date,
											id: v.id,
										}
										return <CardAdvertising key={`${idx}`} {...props} />
									})}
							</div>
						) : (
							<div className='flex flex-col items-center gap-4 mt-[50px] text-center'>
								<EmptyShopIcon />
								<p className='font-normal text-[#1C1C28] text-[18px] '>
									광고 중인 매장이 없습니다
								</p>
							</div>
						)}
					</>
				) : null}
			</div>
		</Dialog>
	)
}

export default PopupAdvertisingStore
