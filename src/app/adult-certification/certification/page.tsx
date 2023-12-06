'use client'

import BackButton from '@/src/components/BackButton'

import IconArrowLeft from '@/src/components/Icon/IconRowLeft'
import Section from '@/src/components/Section'
import Tabs from '@/src/components/Tabs'
import FormJoinMemberState4 from '@/src/containers/FormContainer/FormJoinMemberState4'

const Certification = () => {
	const items = [
		{
			key: '1',
			label: '일반회원',
			children: <FormJoinMemberState4 />,
		},
		{
			key: '2',
			label: '기업회원',
			children: <p>No Content</p>,
		},
	]

	return (
		<main className='text-center'>
			<Section className='p-3 flex flex-col gap-5 w-full container w-fit'>
				<div className='w-full text-end p-5 flex '>
					<div className='w-2/12 text-start'>
						<BackButton icon={<IconArrowLeft />} />
					</div>
					<div className='w-10/12 text-center text-[#71717A] font-bold'>
						<h1>회원가입</h1>
					</div>
				</div>
				<div>
					<Tabs
						items={items}
						defaultActiveKey='1'
						onChange={(key) => {
						}}
					/>{' '}
				</div>
			</Section>
		</main>
	)
}

export default Certification
