import Collapse from '@/src/components/Collapse'
import RippleButton from '@/src/components/RippleAnimation'
import { ACCOUNT_TYPE } from '@/src/constants'
import { useAppContext } from '@/src/context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

interface CollapseItem {
	key?: string
	label?: React.ReactNode
	icon?: React.ReactNode
	children?: React.ReactNode
	onClick?: () => void
}

const IcSytem = () => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_172_4225)'>
				<path
					d='M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_172_4225'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

const IcShop = () => {
	return (
		<svg
			width='22'
			height='23'
			viewBox='0 0 22 23'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M13.4746 20.8563H8.52462C3.99629 20.8563 2.07129 18.9221 2.07129 14.4029V10.2871C2.07129 9.91128 2.38296 9.59961 2.75879 9.59961C3.13462 9.59961 3.44629 9.91128 3.44629 10.2871V14.4029C3.44629 18.1521 4.77546 19.4813 8.52462 19.4813H13.4655C17.2146 19.4813 18.5438 18.1521 18.5438 14.4029V10.2871C18.5438 9.91128 18.8555 9.59961 19.2313 9.59961C19.6071 9.59961 19.9188 9.91128 19.9188 10.2871V14.4029C19.928 18.9221 17.9938 20.8563 13.4746 20.8563Z'
				fill='currentColor'
			/>
			<path
				d='M11.0001 11.6901C9.99175 11.6901 9.07508 11.2959 8.42425 10.5718C7.77342 9.8476 7.47092 8.90344 7.57175 7.8951L8.18592 1.77177C8.22258 1.42344 8.51592 1.14844 8.87342 1.14844H13.1542C13.5117 1.14844 13.8051 1.41427 13.8417 1.77177L14.4559 7.8951C14.5567 8.90344 14.2542 9.8476 13.6034 10.5718C12.9251 11.2959 12.0084 11.6901 11.0001 11.6901ZM9.48758 2.52344L8.93758 8.0326C8.87342 8.64677 9.05675 9.22427 9.44175 9.64594C10.2209 10.5076 11.7792 10.5076 12.5584 9.64594C12.9434 9.21511 13.1267 8.6376 13.0626 8.0326L12.5126 2.52344H9.48758Z'
				fill='currentColor'
			/>
			<path
				d='M16.784 11.6901C14.9232 11.6901 13.264 10.1868 13.0715 8.3351L12.4298 1.90927C12.4115 1.71677 12.4757 1.52427 12.604 1.3776C12.7323 1.23094 12.9157 1.14844 13.1173 1.14844H15.9132C18.6082 1.14844 19.864 2.27594 20.2398 5.04427L20.4965 7.5926C20.6065 8.67427 20.2765 9.70094 19.5707 10.4801C18.8648 11.2593 17.8748 11.6901 16.784 11.6901ZM13.8782 2.52344L14.4465 8.1976C14.5657 9.34344 15.629 10.3151 16.784 10.3151C17.4807 10.3151 18.104 10.0493 18.5532 9.56344C18.9932 9.0776 19.1948 8.42677 19.1307 7.7301L18.874 5.20927C18.5898 3.1376 17.9207 2.52344 15.9132 2.52344H13.8782Z'
				fill='currentColor'
			/>
			<path
				d='M5.16978 11.6901C4.07894 11.6901 3.08894 11.2593 2.38311 10.4801C1.67728 9.70094 1.34728 8.67427 1.45728 7.5926L1.70478 5.07177C2.08978 2.27594 3.34561 1.14844 6.04061 1.14844H8.83644C9.02894 1.14844 9.21228 1.23094 9.34978 1.3776C9.48728 1.52427 9.54228 1.71677 9.52394 1.90927L8.88228 8.3351C8.68977 10.1868 7.03061 11.6901 5.16978 11.6901ZM6.04061 2.52344C4.03311 2.52344 3.36394 3.12844 3.07061 5.2276L2.82311 7.7301C2.74978 8.42677 2.96061 9.0776 3.40061 9.56344C3.84061 10.0493 4.46394 10.3151 5.16978 10.3151C6.32478 10.3151 7.39728 9.34344 7.50728 8.1976L8.07561 2.52344H6.04061Z'
				fill='currentColor'
			/>
			<path
				d='M13.2918 20.8568H8.7085C8.33266 20.8568 8.021 20.5451 8.021 20.1693V17.8776C8.021 15.9526 9.07516 14.8984 11.0002 14.8984C12.9252 14.8984 13.9793 15.9526 13.9793 17.8776V20.1693C13.9793 20.5451 13.6677 20.8568 13.2918 20.8568ZM9.396 19.4818H12.6043V17.8776C12.6043 16.7226 12.1552 16.2734 11.0002 16.2734C9.84516 16.2734 9.396 16.7226 9.396 17.8776V19.4818Z'
				fill='currentColor'
			/>
		</svg>
	)
}

const IcMedia = () => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_172_6876)'>
				<path
					d='M4 15C4 14.4696 4.21071 13.9609 4.58579 13.5858C4.96086 13.2107 5.46957 13 6 13H7C7.53043 13 8.03914 13.2107 8.41421 13.5858C8.78929 13.9609 9 14.4696 9 15V18C9 18.5304 8.78929 19.0391 8.41421 19.4142C8.03914 19.7893 7.53043 20 7 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V15Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M15 15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13H18C18.5304 13 19.0391 13.2107 19.4142 13.5858C19.7893 13.9609 20 14.4696 20 15V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H17C16.4696 20 15.9609 19.7893 15.5858 19.4142C15.2107 19.0391 15 18.5304 15 18V15Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4 15V12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V15'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_172_6876'>
					<rect width='24' height='24' fill='currentColor' />
				</clipPath>
			</defs>
		</svg>
	)
}

const IcDesign = () => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_172_6881)'>
				<path
					d='M4 5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7V5Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12H9C9.26522 12 9.51957 12.1054 9.70711 12.2929C9.89464 12.4804 10 12.7348 10 13V19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13Z'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M14 12H20'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M14 16H20'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M14 20H20'
					stroke='currentColor'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_172_6881'>
					<rect width='24' height='24' fill='currentColor' />
				</clipPath>
			</defs>
		</svg>
	)
}

const PanelSetting = () => {
	const router = useRouter()

	const context = useAppContext()
	const { accountTypeUser } = context
	const isBizz = accountTypeUser === ACCOUNT_TYPE.BIZ_USER
	const items: CollapseItem[] = [
		{
			key: '1',
			label: '회원기능',
			icon: <IcSytem />,
			children: (
				<div className='flex flex-col gap-2'>
					<Link href='/favorite-shop'>
						<RippleButton className='text-start'>
							<p className='text-[15px] font-normal hover:text-[#0A63E0] hover:font-bold'>
								찜목록
							</p>
						</RippleButton>
					</Link>
					<Link href='/recent-shop'>
						<RippleButton className='text-start'>
							<p className='text-[15px] font-normal hover:text-[#0A63E0] hover:font-bold'>
								최근열람 목록
							</p>
						</RippleButton>
					</Link>
				</div>
			),
		},

		{
			...(isBizz && {
				label: '제휴점 관리',
				key: '2',
				icon: <IcShop />,
				children: (
					<div className='flex flex-col gap-2'>
						<Link href={'/store/create?type=edit'}>
							<RippleButton className='text-start'>
								<p className='text-[15px] font-normal hover:text-[#0A63E0] hover:font-bold'>
									나의 매장 목록
								</p>
							</RippleButton>
						</Link>
						<Link href={'/event/create'}>
							<RippleButton className='text-start'>
								<p className='text-[15px] font-normal hover:text-[#0A63E0] hover:font-bold'>
									나의 이벤트 목록
								</p>
							</RippleButton>
						</Link>
					</div>
				),
			}),
		},
		{
			key: '3',
			icon: <IcMedia />,
			label: '고객센터',
		},
		{
			key: '4',
			icon: <IcDesign />,
			onClick: () => router.push('/how-to-use'),
			label: '브랜드 소개',
		},
	]

	const onChange = (activeKey: string[]) => {
		console.log('Active Key:', activeKey)
	}
	return (
		<div className='py-3 rounded-lg shadow-custom font-medium'>
			<Collapse items={items} onChange={onChange} />
		</div>
	)
}

export default PanelSetting
