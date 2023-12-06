import React, { useEffect, useState } from 'react'
import Drawer from '@/src/components/Drawer'
import Image from 'next/image'
import MenuSettingForUser from '../MenuSettingForUser'
import { useAppContext } from '@/src/context'
import { ACCOUNT_TYPE } from '@/src/constants'
import Button from '@/src/components/Button'
import PopupAdvertisingStore from '../PopupAdvertisingStore'
import useData from '@/src/hooks/useData'
import { useRouter } from 'next/navigation'
import ShopApi from '@/src/services/Shop'

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

interface MenuPageForUserProps {
	open: boolean
	onClose: () => void
	children?: React.ReactNode
	bottom?: boolean
	fullScreen?: boolean
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
	fullWidth?: boolean
	borderTop?: boolean
}

const MenuPageForUser: React.FC<MenuPageForUserProps> = (props) => {
	const {
		open,
		onClose,
		children,
		bottom,
		fullScreen,
		maxWidth,
		fullWidth,
		borderTop,
	} = props

	const AvatarUser: React.FC = () => {
		const [openPopup, setOpenPopup] = useState(false)
		const { userData } = useData()
		const context = useAppContext()
		const { accountTypeUser } = context
		const isBizz = accountTypeUser === ACCOUNT_TYPE.BIZ_USER
		const router = useRouter()
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
			<div className='px-5 pt-4'>
				<div
					className='flex justify-start items-center'
					onClick={() => router.push('/profile/edit')}
				>
					<div className='w-fit rounded-full border flex justify-center items-center relative pointer mr-2'>
						{userData?.avatar ? (
							<div className=' w-[66px] min-w-[66px] h-[66px]  rounded-full overflow-hidden'>
								<Image
									src={userData?.avatar}
									alt=''
									fill
									className='object-cover rounded-full'
								/>
							</div>
						) : (
							<div className='flex w-[66px] min-w-[66px] h-[66px]  rounded-full flex-col items-center justify-center gap-2 w-fit'>
								<Image src='/icons/cycle.svg' width={24} height={24} alt='' />
								<Image src='/icons/eclip.svg' width={42} height={24} alt='' />
							</div>
						)}
					</div>

					<div className='flex flex-col justify-between items-start '>
						<div className='font-semibold text-md flex items-baseline gap-2 '>
							<p
								className='text-[20px] font-bold break-all '
								style={{
									maxWidth: isBizz ? 'calc(100% - 62px)' : '',
								}}
							>
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
				{isBizz && (
					<div className='flex justify-center items-center gap-2 px-1 my-3 mb-5'>
						<Button
							onClick={() => setOpenPopup(true)}
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

				<PopupAdvertisingStore
					open={openPopup}
					onClose={() => {
						setOpenPopup(false)
					}}
				/>
			</div>
		)
	}
	useEffect(() => {
		if (open) {
			document.body.classList.add('overflow-y-hidden')
		} else {
			document.body.classList.remove('overflow-y-hidden')
		}
	}, [open])

	return (
		<div>
			<Drawer
				open={open}
				onClose={onClose}
				fullHeight
				left
				maxWidth={maxWidth || 'sm'}
				className='w-[312px]'
			>
				<div className='flex flex-col  '>
					<div>
						<AvatarUser />
						<MenuSettingForUser />
					</div>
					<div
						style={{
							right: 'calc(100% - 360px)',
						}}
						className='absolute top-[35px]'
						onClick={() => onClose()}
					>
						<Image src='/icons/close-1.svg' width={32} height={32} alt='' />
					</div>
				</div>
			</Drawer>
		</div>
	)
}

export default MenuPageForUser
