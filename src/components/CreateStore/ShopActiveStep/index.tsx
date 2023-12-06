'use client'
import useData from '@/src/hooks/useData'
import ShopApi, { ShopI } from '@/src/services/Shop'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PopupPermissionRegisterStore from '@/src/containers/PopupPermissionRegisterStore'
import EmptyShopIcon from '../../Icon/EmptyShopIcon'
import { classNames } from '@/src/utils/common'
import { MY_LIST_STATE } from '@/src/constants'
import { ShopItem } from '../../Board'

const ShopActiveStep = ({ setStep, onChangeShop }: any) => {
	const router = useRouter()

	const { userData } = useData()
	const [openPermission, setOpenPermission] = useState(false)
	const [selectedShop, setSelectedShop] = useState<ShopI | undefined>()
	const [listShop, setListShop] = useState<ShopI[]>()
	const [count, setCount] = useState({
		[MY_LIST_STATE.APPROVED]: 0,
		[MY_LIST_STATE.PENDING]: 0,
		[MY_LIST_STATE.REJECTED]: 0,
	})
	const [state, setState] = useState(MY_LIST_STATE.APPROVED)
	const isValid = !selectedShop || selectedShop.state === MY_LIST_STATE.PENDING

	function getListShop(user_id: string) {
		const res = ShopApi.getList(
			{
				fields: ['$all', { tags: ['$all', { tag: ['$all'] }] }],
				filter: {
					state,
					user_id: user_id,
				},
				page: 1,
				limit: 20,
			},
			{},
		)
		return res
	}

	const fetchCount = async () => {
		try {
			const [approve, pending, reject] = await Promise.all([
				ShopApi.getList({
					filter: { state: MY_LIST_STATE.APPROVED, user_id: userData.id },
					limit: 1,
				}),
				ShopApi.getList({
					filter: { state: MY_LIST_STATE.PENDING, user_id: userData.id },
					limit: 1,
				}),
				ShopApi.getList({
					filter: { state: MY_LIST_STATE.REJECTED, user_id: userData.id },
					limit: 1,
				}),
			])
			setCount({
				[MY_LIST_STATE.APPROVED]: approve.results.objects.count,
				[MY_LIST_STATE.PENDING]: pending.results.objects.count,
				[MY_LIST_STATE.REJECTED]: reject.results.objects.count,
			})
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (userData.id) {
			getListShop(`${userData?.id}`).then((res) => {
				setListShop(res.results.objects.rows)
			})
			fetchCount()
		}
	}, [userData?.id, state])

	const handleRedirectRegisterShop = () => {
		const { post_limit, current_pending_post, current_active_post } = userData
		const limit = post_limit > current_pending_post + current_active_post
		if (limit) {
			setStep(1)
			router.push('/store/create')
		} else {
			setOpenPermission(true)
		}
	}

	const handleSelectShop = (shop: ShopI) => {
		if (selectedShop && selectedShop.id === shop.id) {
			setSelectedShop(undefined)
		} else {
			setSelectedShop(shop)
		}
	}

	return (
		<>
			<div className='flex gap-2 overflow-auto'>
				<ButtonFiler
					active={state === MY_LIST_STATE.APPROVED}
					onClick={() => setState(MY_LIST_STATE.APPROVED)}
				>
					노출중( {count[MY_LIST_STATE.APPROVED]} )
				</ButtonFiler>
				<ButtonFiler
					active={state === MY_LIST_STATE.PENDING}
					onClick={() => setState(MY_LIST_STATE.PENDING)}
				>
					심사중( {count[MY_LIST_STATE.PENDING]} )
				</ButtonFiler>
				<ButtonFiler
					active={state === MY_LIST_STATE.REJECTED}
					onClick={() => setState(MY_LIST_STATE.REJECTED)}
				>
					반려( {count[MY_LIST_STATE.REJECTED]} )
				</ButtonFiler>
			</div>
			<p className=' text-start font-medium my-3'>
				총 {listShop?.length}개 매장 보유
			</p>
			<div>
				{listShop ? (
					<>
						{listShop.length > 0 ? (
							<>
								<div className='flex flex-col gap-5'>
									{listShop.map((shop: ShopI, index: number) => (
										<ShopItem
											id={shop.id}
											title={shop.title}
											images={shop.images}
											hashtags={shop.tags?.map((tag) => tag.tag?.name)}
											opening_hours={shop.opening_hours}
											is_like={shop.is_like}
											key={index}
											onSelect={() => handleSelectShop(shop)}
											checked={selectedShop && selectedShop.id === shop.id}
											hide_select={state === MY_LIST_STATE.PENDING}
										/>
									))}
								</div>
								{state !== MY_LIST_STATE.PENDING ? (
									<div className='fixed  bg-[rgba(0,0,0,0.32)] z-50 flex  items-center self-end w-screen h-fit bottom-0 left-0'>
										<div className='h-[80px] bg-white w-full flex justify-center items-center gap-2 px-2 '>
											<button
												onClick={() => {
													setStep(1)
													onChangeShop(selectedShop)
												}}
												className={`text-white    rounded h-[48px] px-10 w-full max-w-[502px] mx-auto ${
													isValid ? 'bg-gray-400 ' : 'bg-blue-400 '
												}`}
												disabled={isValid ? true : undefined}
											>
												수정
											</button>
										</div>
									</div>
								) : null}
							</>
						) : (
							<div className='flex flex-col items-center gap-4 mt-32 text-center'>
								<EmptyShopIcon />
								<p className='font-normal text-[#1C1C28] text-[18px] '>
									광고 중인 매장이 없습니다
								</p>
								<button
									className='bg-[#39B5FE] text-white flex justify-center items-center rounded w-[84px] h-[32px]'
									onClick={() => {
										handleRedirectRegisterShop()
									}}
								>
									+매장등록
								</button>
							</div>
						)}
					</>
				) : null}
			</div>
			<PopupPermissionRegisterStore
				open={openPermission}
				onClose={() => setOpenPermission(false)}
			/>
		</>
	)
}

export default ShopActiveStep

interface ButtonFilterProps {
	children?: React.ReactNode
	active?: boolean
	onClick?: () => void
}

const ButtonFiler = ({ children, active, onClick }: ButtonFilterProps) => {
	return (
		<button
			className={classNames(
				'py-1.5 px-8 rounded text-white whitespace-nowrap',
				active ? 'bg-black' : 'bg-[#A6A6A6]',
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
