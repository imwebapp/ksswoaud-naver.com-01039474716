'use client'

import { TYPE_COMPANY_INFO } from '@/src/constants'
import PopupTermInfomation from '@/src/containers/PopupTermInfomation'
import { RootState } from '@/src/stores'
import { contentActions } from '@/src/stores/content/contentSlice'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Footer() {
	const [status, setStatus] = useState(true)
	const [isOpen, setOpen] = useState(false)
	const [type, setType] = useState()
	const dataContent = useSelector((state: RootState) => state.content.data)
	const getContentCompanyInfo: any = dataContent.filter(
		(v: any) => v?.type === TYPE_COMPANY_INFO.COMPANY_INPFO,
	)[0]

	const handleOpenPopup = (v: any) => {
		if (v) {
			setType(v)
			setOpen(true)
		}
	}

	return (
		<footer className='p-4 bg-[#F6F8FA] text-sm'>
			<section className='font-medium text-[#27272A]'>
				<div className='[&>p]:w-[50%] [&>p]:inline-block'>
					<p
						className='font-medium'
						onClick={() => {
							handleOpenPopup(TYPE_COMPANY_INFO.TERM_OF_SERVICE)
						}}
					>
						이용약관
					</p>
					<p
						className='font-medium'
						onClick={() => {
							handleOpenPopup(TYPE_COMPANY_INFO.POLICY)
						}}
					>
						개인정보처리방침
					</p>
				</div>
				<div className='[&>*]:inline-block [&>*]:w-[50%] mt-2'>
					<p
						className='font-medium'
						onClick={() => {
							handleOpenPopup(TYPE_COMPANY_INFO.LOCATION_BASE_SERVICES)
						}}
					>
						위치정보 이용약관
					</p>
					<div onClick={() => setStatus(!status)}>
						<span className='mr-1 font-medium'>사업자정보 확인하기</span>
						<Image
							src='/icons/navigate-next.svg'
							alt=''
							width={16}
							height={16}
							className='inline-block'
						/>
					</div>
				</div>
				{status && (
					<div className='mt-4'>
						<div
							className='text-[12px]'
							dangerouslySetInnerHTML={{
								__html: getContentCompanyInfo?.content,
							}}
						></div>
					</div>
				)}

				<p className='mt-4 text-[#52525B] font-normal text-[12px]'>
					서비스 정보중개자로서, 서비스제공의 당사가 아니라는 사실을 고 지하며,
					서비스의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 서비스
					제공자에게 있으며, 건진 플랫폼입니다. 업소의 불법적 행위 와 관련된
					일체의 민, 형사상 책임을 지지 않습니다
				</p>
			</section>
			<PopupTermInfomation
				open={isOpen}
				onClose={() => setOpen(false)}
				typeCompany={type}
			/>
		</footer>
	)
}
