'use client'

import BackButton from '@/src/components/BackButton'

import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import Section from '@/src/components/Section'
import Tabs from '@/src/components/Tabs'
import FormJoinMemberState1 from '@/src/containers/FormContainer/FormJoinMemberState1'
import FormJoinMemberState2 from '@/src/containers/FormContainer/FormJoinMemberState2'
import FormJoinMemberState3 from '@/src/containers/FormContainer/FormJoinMemberState3'
import FormJoinMemberState4 from '@/src/containers/FormContainer/FormJoinMemberState4'
import FormJoinMemberState5 from '@/src/containers/FormContainer/FormJoinMemberState5'
import PopUpMemberPolicy from '@/src/containers/PopUpMemberPolicy'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const IcBack = () => {
	return (
		<svg
			width='24'
			height='25'
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M21 12.5781L4 12.5781'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='square'
				strokeLinejoin='round'
			/>
			<path
				d='M9.3 18.5781L3 12.5781L9.3 6.57812'
				stroke='black'
				strokeWidth='1.5'
				strokeLinecap='square'
			/>
		</svg>
	)
}

const JoinMembership = () => {
	const [openPolicy, setOpenPolicy] = useState(true)
	const router = useRouter()
	const searchParams = useSearchParams()
	const type = searchParams.get('type') || ''

	const items = [
		{
			key: '1',
			label: '일반회원',
			children: ['google', 'facebook', 'kakao'].includes(type) ? (
				<FormJoinMemberState1 />
			) : (
				<FormJoinMemberState3 />
			),
		},
		{
			key: '2',
			label: '기업회원',
			children: ['google', 'facebook', 'kakao'].includes(type) ? (
				<FormJoinMemberState2 />
			) : (
				<FormJoinMemberState5 />
			),
		},
	]

	return (
		<main className='text-center max-w-[390px] mx-auto overflow-x-hidden'>
			<div className='p-3 flex flex-col gap-5 w-full container '>
				<div className='w-full text-end pt-5 flex '>
					<div className='w-fit' onClick={() => router.push('/')}>
						<IcBack />
					</div>
					<div
						className=' text-center text-[#71717A] font-bold'
						style={{
							width: 'calc(100% - 24px)',
						}}
					>
						<h1>회원가입</h1>
					</div>
				</div>
				<div>
					<Tabs items={items} defaultActiveKey='1' onChange={(key) => {}} />{' '}
				</div>
			</div>
			<PopUpMemberPolicy
				open={openPolicy}
				type={type}
				onClose={() => setOpenPolicy(false)}
			/>
		</main>
	)
}

export default JoinMembership
