'use client'
import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import useData from '@/src/hooks/useData'
import HistoryApi from '@/src/services/History'
import { formatDateTime } from '@/src/utils/common'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CardNumberJump = () => {
	const { userData } = useData()
	const { jump_limit } = userData
	return (
		<div className='w-[343px] h-[130px] bg-[#000000] text-white rounded-xl mx-auto py-5  relative flex flex-col justify-center items-center'>
			<p className='text-xl font-bold'>{jump_limit || 0}</p>
			<p>내가 보유한 점프 갯수</p>
			<div className='w-fit absolute top-[-64px] left-[-15px]'>
				<Image src='/icons/left-dot.svg' width={80} height={135} alt='' />
			</div>
			<div className='w-fit absolute bottom-[-75px] right-[-15px]'>
				<Image src='/icons/right-dot.svg' width={105} height={135} alt='' />
			</div>
		</div>
	)
}

const CardItemNumberJump = ({
	key,
	title,
	created_at,
}: {
	key?: string
	index?: any
	title?: any
	created_at?: any
}) => {
	return (
		<li
			key={key}
			className='flex justify-between items-start border-b border-gray-300 py-3'
		>
			<div className='text-start'>
				<p className='font-medium'>{title}</p>
				<p className='opacity-60'>{formatDateTime(created_at)}</p>
			</div>
			<p className='font-medium'>1회 사용</p>
		</li>
	)
}

const AdvertisingJumpUp = () => {
	const [listHistoryJump, setListHistoryJump] = useState<any>([])
	const router = useRouter()
	const { userData } = useData()
	const { jump_limit } = userData
	useEffect(() => {
		HistoryApi.getUserJumpUp({
			limit: 99,
			fields: [
				'$all',
				{
					shop: ['$all'],
				},
				{
					user: ['$all'],
				},
			],

			filter: {
				user_id: userData.id,
			},
		}).then((v) => setListHistoryJump(v?.results?.object?.rows))
	}, [])
	return (
		<main className='text-center pb-5 min-h-screen '>
			<div className='flex justify-center pl-3 w-full  py-7 relative'>
				<div
					onClick={() => router.back()}
					className='absolute left-[15px] z-20'
				>
					<IconArrowLeft />
				</div>
				<p className='font-semibold'>점프업</p>
			</div>
			<CardNumberJump />
			<div className='flex justify-center items-center'>
				{jump_limit === 0 && (
					<div className='w-[200px] text-[#C4C4C4] flex justify-center items-center text-center mx-auto  min-h-[300px]'>
						현재 사용한 내역이 없습니다 점프기능을 사용해주세요 매장이 상단으로
						노출 됩니다.
					</div>
				)}
				{jump_limit !== 0 && (
					<ul className='px-5 rounded-lg  my-3 py-5 min-h-[300px] w-full'>
						{listHistoryJump?.map((v: any, idx: any) => {
							const props = {
								key: idx,
								title: v.shop?.title,
								created_at: v?.created_at,
							}
							return <CardItemNumberJump {...props} key={idx} />
						})}
					</ul>
				)}
			</div>
			<div className='fixed bottom-0 left-0 w-full py-3 pb-[30px] px-[15px] bg-white'>
				<button
					disabled={jump_limit === 0}
					className='rounded-[8px] text-white bg-[#1A70E7] w-full py-3 cursor-pointer disabled:bg-[#C9C9C9] max-w-[502px] mx-auto'
					onClick={() => router.push('/advertising-jump-up/store')}
				>
					점프업 사용하기
				</button>
			</div>
		</main>
	)
}
export default AdvertisingJumpUp
