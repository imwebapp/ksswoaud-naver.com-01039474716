'use client'
import FixedComponent from '@/src/components/FixedComponent'
import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import CardShopInOperation from '@/src/containers/CardShopInOperation'
import PopupSetExposureTime from '@/src/containers/PopupSetExposureTime'
import useData from '@/src/hooks/useData'
import ShopApi from '@/src/services/Shop'
import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

async function getListShop(id: string) {
	const res = await ShopApi.getList(
		{
			fields: [
				'title',
				'category_id',
				'user_id',
				'position',
				'thumbnails',
				'images',
				'view',
				'like',
				'address',
				'address_2',
				'opening_hours',
				'contact_phone',
				'min_price',
				'loyalty_status',
				'reservation_status',
				'soft_comment_count',
				'latitude',
				'longitude',
				'old_shop',
				'alias',
				'expired_date',
				{ tags: ['$all', { tag: ['$all'] }] },
				{
					category: [
						'$all',
						{
							thema: ['$all'],
						},
					],
				},
			],
			filter: { user_id: id },
			page: 1,
			limit: 20,
		},
		{},
	)
	return res
}

const JumpDetail = () => {
	const router = useRouter()
	const params = useSearchParams()

	const [listCardChoose, setListCardChoose] = useState([])
	const [listShop, setListShop] = useState<any>()
	const [openPopup, setOpenPopup] = useState(false)
	const [setingAutomic, setSettingAutomic] = useState<any>(null)
	const { userData } = useData()
	const numberChoose = listCardChoose.length

	const isValid = listCardChoose.length === 0 || userData.jump_limit <= 0

	useEffect(() => {
		isValid && setSettingAutomic(null)
	}, [isValid])

	useEffect(() => {
		if (userData.id) {
			getListShop(`${userData.id}`).then((res) => {
				setListShop(res.results.objects.rows)
			})
		}
	}, [userData])

	const setUpJump = (type: string, time: string) => {
		const promisesApi = listCardChoose.map((id: any) => {
			return ShopApi.setUpJumUp(id?.id, {
				type: type || 'ONE_TIME',
				minutes: +time || 60,
			})
		})
		Promise.all(promisesApi).then(() => {
			const from = params.get('from')
			if (from) {
				router.push(from)
			} else {
				router.push('/')
			}
		})
	}

	return (
		<main className='text-center '>
			<div className='flex justify-start gap-2 pl-3 w-2/4 pt-7 pb-3'>
				<div onClick={() => router.back()}>
					<IconArrowLeft />
				</div>
				<p className='font-semibold'>운영중인 샵</p>
			</div>
			<hr />
			<p className='px-3 text-start font-medium my-3'>{numberChoose}개 선택</p>
			<div className='flex flex-col gap-5 py-8'>
				{listShop &&
					listShop?.map((v: any, idx: any) => (
						<CardShopInOperation
							key={idx}
							data={v}
							listCardChoose={listCardChoose}
							setListCardChoose={setListCardChoose}
						/>
					))}
			</div>
			<FixedComponent>
				<div className='bg-[rgba(0,0,0,0.32)] z-50 flex  items-center self-end h-fit'>
					<div className='h-[80px] bg-white w-full flex justify-center items-center gap-2 px-2'>
						{setingAutomic && !isValid ? (
							<button
								onClick={() => {
									setUpJump('RECURRING', setingAutomic.value)
								}}
								className={`text-white    rounded h-[48px] px-10 w-full ${
									isValid ? 'bg-gray-400 ' : 'bg-blue-400 '
								}`}
								disabled={isValid ? true : undefined}
							>
								{setingAutomic?.label}자동설정
							</button>
						) : (
							<>
								<button
									onClick={() => {
										setUpJump('ONE_TIME', '60')
									}}
									className={`border  rounded h-[48px] px-10 w-full ${
										isValid
											? 'text-gray-400 border-gray-400'
											: 'text-blue-400 border-blue-400'
									}`}
									disabled={isValid ? true : undefined}
								>
									1회 적용
								</button>
								<button
									onClick={() => setOpenPopup(true)}
									className={`text-white    rounded h-[48px] px-10 w-full ${
										isValid ? 'bg-gray-400 ' : 'bg-blue-400 '
									}`}
									disabled={isValid ? true : undefined}
								>
									자동설정
								</button>
							</>
						)}
					</div>
				</div>
			</FixedComponent>
			<PopupSetExposureTime
				handleSetting={setSettingAutomic}
				open={openPopup}
				onClose={() => setOpenPopup(false)}
			/>
		</main>
	)
}

export default JumpDetail
