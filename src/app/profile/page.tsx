'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import BottomNavigation from '@/src/components/BottomNavigation'
import Button from '@/src/components/Button'
import { ACCOUNT_TYPE, BOARD } from '@/src/constants'
import MenuSettingForUser from '@/src/containers/MenuSettingForUser'
import PopupAdvertisingStore from '@/src/containers/PopupAdvertisingStore'
import { useAppContext } from '@/src/context'
import useData from '@/src/hooks/useData'
import ShopApi from '@/src/services/Shop'
import { useAppDisPatch } from '@/src/stores/hook'
import { userActions } from '@/src/stores/user/userSlice'
import LinkApi from '@/src/services/Link'

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

const IconCamera = () => {
	return (
		<div className='absolute right-0 bottom-0 w-[31px] h-[31px] rounded-full border border-transparent bg-white flex justify-center items-center shadow  '>
			<Image src='/icons/camera-blue.svg' width={20} height={20} alt='' />
		</div>
	)
}

const AvatarUser = ({ openPopup }: { openPopup: any }) => {
	const router = useRouter()

	const { userData } = useData()
	const { username, email, avatar } = userData
	const context = useAppContext()
	const { accountTypeUser } = context
	const isBizz = accountTypeUser === ACCOUNT_TYPE.BIZ_USER
	const [listShop, setListShop] = useState<any>([])
	const [total, setTotal] = useState(0)
	useEffect(() => {
		if (userData?.id) {
			getListShop(`${userData?.id}`).then((res) => {
				setListShop(res.results.objects.rows)
			})
		}
	}, [])

	useEffect(() => {
		const totalShop = listShop.filter(
			(v: any, i: any) => calculateDaysRemaining(v.expired_date) > 0,
		).length
		setTotal(totalShop)
	}, [listShop, total])

	const calculateDaysRemaining = (time: Date) => {
		const currentDate = new Date()

		const providedDate = new Date(+time)

		const timeDiff = providedDate.getTime() - currentDate.getTime()

		const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))

		return daysRemaining
	}
	return (
		<div className=''>
			<div
				className='flex justify-between items-center gap-3'
				onClick={() => router.push('/profile/edit')}
			>
				<div className='flex justify-center items-center gap-3'>
					<div className='w-fit rounded-full border flex justify-center items-center relative pointer'>
						{avatar ? (
							<div className=' w-[100px] min-w-[66px] h-[100px]  rounded-full overflow-hidden'>
								<Image
									src={avatar}
									alt=''
									fill
									className='object-cover rounded-full'
								/>
							</div>
						) : (
							<div className='flex w-[100px] min-w-[100px] h-[100px]  rounded-full flex-col items-center justify-center gap-2'>
								<Image src='/icons/cycle.svg' width={24} height={24} alt='' />
								<Image src='/icons/eclip.svg' width={42} height={24} alt='' />
							</div>
						)}

						<IconCamera />
					</div>
					<div className='flex flex-col justify-between items-start '>
						<div className='font-semibold text-md flex items-baseline gap-2 '>
							<p className='text-[20px] font-bold break-all max-w-[65%] text-start '>
								{userData?.nickname}
							</p>
							{isBizz ? (
								<div className='bg-[#D5EFFF] text-[12px] rounded-md text-[#39B5FE] w-[61px] h-[20px] mx-auto flex justify-center items-center'>
									<p> 기업회원</p>
								</div>
							) : (
								''
							)}
						</div>
						<p className='text-sm text-[#52525B]'>{userData?.email}</p>
						{isBizz && (
							<p className='text-sm font-semibold my-1'>
								{total}상점이 광고중입니다
							</p>
						)}
					</div>
				</div>
				<div>
					<Image src='/icons/next.svg' width={8} height={12} alt='' />
				</div>
			</div>
			{isBizz && (
				<div className='flex justify-center items-center gap-2 px-1 my-3 mb-5'>
					<Button
						onClick={() => openPopup(true)}
						rounded='rounded-md'
						className='!bg-[#39B5FE] text-sm !h-10 font-normal'
					>
						남은 광고기간
					</Button>
					<Button
						rounded='rounded-md'
						className='text-sm !h-10 font-normal'
						onClick={() => router.push('/advertising-jump-up')}
					>
						광고점프업
					</Button>
				</div>
			)}
		</div>
	)
}

const CardAvatarProfile = ({ openPopup }: { openPopup: any }) => {
	const router = useRouter()
	return (
		<div className='w-full px-4 -translate-y-11 '>
			<div className=' p-3 rounded-xl shadow-custom bg-white'>
				<AvatarUser openPopup={openPopup} />
			</div>
		</div>
	)
}

const Profile = () => {
	const dispatch = useAppDisPatch()

	const [openPopup, setOpenPopup] = useState(false)
	const [postThema, setPostThema] = useState<any>()

	const getThema = async () => {
		const listLink = await LinkApi.getList({
			limit: 99,
			fields: ['$all'],
		})

		const result = listLink.results.objects.rows.find(
			(item) => item.route === BOARD.BULLETIN_BOARD,
		)?.thema_id

		setPostThema(result)
	}

	useEffect(() => {
		getThema()
		dispatch(userActions.getUserProfile())
	}, [])

	return (
		<main className='text-center flex flex-col justify-center items-center max-w-[502px] mx-auto'>
			<div className='w-full h-28 bg-blue-600 bg-gradient'></div>
			<CardAvatarProfile openPopup={setOpenPopup} />
			<MenuSettingForUser />
			<BottomNavigation postThema={postThema}/>
			<PopupAdvertisingStore
				open={openPopup}
				onClose={() => {
					setOpenPopup(false)
				}}
			/>
		</main>
	)
}

export default Profile
