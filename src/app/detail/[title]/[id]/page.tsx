import Image from 'next/image'
import { cookies } from 'next/headers'

import {
	BoardDetailCarousel,
	BoardDetailAction,
	BoardDetailInfo,
	BoardDetailCallButton,
	BoardDetailTab,
} from '@/src/components/Board'
import CourseItem from '@/src/components/CourseItem'
import BackButton from '@/src/components/BackButton'
import ListMentor from '@/src/components/ListMentor'
import ShopApi from '@/src/services/Shop'
import { MetadataProps } from '@/src/interfaces'
import { Metadata, ResolvingMetadata } from 'next'
import SettingApi from '@/src/services/Setting'

async function getShopDetail(id: string, token?: string) {
	const res = await ShopApi.getDetail(id, token)
	return res
}

async function getAdminSetting() {
	const res = await SettingApi.SettingAdmin()
	return res
}
export async function generateMetadata(
	{ params, searchParams }: MetadataProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const detail = (await getShopDetail(params.id)).results.object.shop
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: detail.title,
		description: `환영합니다!${detail.title}은(는) 여러분을 위한 특별한 장소입니다. 최고의 부산 출장 마사지, 부산 출장 안마, 부산 홈타이, 해운대 출장 마사지, 서면 출장 마사지를 제공하는 이곳에서 편안함과 안락함을 만끽하세요. 전문 마사지 테라피스트들이 여러분을 위해 세심한 케어와 특별한 경험을 제공합니다. ${detail.title}은(는) 건강과 행복을 위한 최적의 장소로, 최신 시설과 편안한 분위기가 여러분을 기다리고 있습니다. 상세한 정보와 예약 안내는 아래에서 확인하실 수 있습니다.${detail.title}에서 특별한 순간을 경험하세요!`,
		alternates: {
			canonical: `/detail/${encodeURIComponent(detail.title)}/${params.id}`,
		},
		openGraph: {
			images: [...detail.images, ...previousImages],
		},
	}
}

export default async function ShopDetailPage({
	params,
}: {
	params: { id: string; title: string }
}) {
	const cooky = cookies()
	const token = cooky.get('token')?.value

	const result = (await getShopDetail(params.id, token)).results.object.shop

	const detail = result.old_shop ?? result
	const adminSetting = await getAdminSetting()
	
	return (
		<div className='pb-20 relative'>
			<BackButton
				icon={
					<div className='absolute top-5 left-4 z-[1]'>
						<button className='w-10 h-10'>
							<Image
								src='/icons/chevron-left-rounded.svg'
								alt=''
								width={40}
								height={40}
							/>
						</button>
					</div>
				}
			/>
			<BoardDetailCarousel images={detail.images} />
			<div className='py-8'>
				<h1 className='text-center text-2xl font-bold'>{detail.title}</h1>
			</div>
			<BoardDetailAction
				phoneNumber={detail.contact_phone}
				id={detail.id}
				like={detail.is_like}
			/>
			<BoardDetailTab id={detail.id} title={detail.title} />
			<BoardDetailInfo
				address={detail.address}
				workingTime={detail.opening_hours}
				phoneNumber={detail.contact_phone}
				thema={detail.category.thema.name}
				category={detail.category.name}
				address_2={detail.address_2}
				tags={detail.tags.map((tags) => tags.tag)}
			/>
			{detail.events && detail.events[0] ? (
				<div className='py-3 border-y border-y-[#A2A5AA]'>
					<div
						className='shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] border-l-4 border-l-[#04BBFF]
            flex flex-row justify-between rounded-md relative overflow-hidden'
					>
						<div className='flex gap-3 items-center  py-7 px-5'>
							<Image src='/icons/ic-discount.svg' alt='' width={44} height={44} />
							<div className='text-sm'>
								<p className='text-[#466AFF]'>{detail.events[0].title}</p>
								<p className='font-medium'>{detail.events[0].description}</p>
							</div>
						</div>
						<div className='flex justify-between items-center border-l px-5 border-dashed'>
							34일남음
						</div>
					</div>
				</div>
			) : null}
			{detail.courses.length ? (
				<div className='py-2 px-4 [&>*]:border-t '>
					<p className='font-bold text-sm py-1 border-none'>가격표</p>
					{detail.courses.map((item, index) => (
						<CourseItem key={index} data={item} />
					))}
				</div>
			) : null}
			<div
				className='flex flex-col items-center p-4'
				dangerouslySetInnerHTML={{ __html: detail.description }}
			/>
			{!!adminSetting?.object?.mentor_status && detail.mentors?.length ? (
				<div className='flex flex-col gap-4 py-2 px-4'>
					<p className='text-lg font-bold'>
						담당자
						<span className='text-[#4186E5]'>{`(${detail.mentors?.length})`}</span>
					</p>
					<ListMentor mentors={detail.mentors} />
				</div>
			) : null}
			<BoardDetailCallButton phoneNumber={detail.contact_phone} />
		</div>
	)
}
