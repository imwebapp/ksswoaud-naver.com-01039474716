import { cookies } from 'next/headers'

import Header from '../components/Header'
import BoardHomeItem from '../components/BoardHomeItem'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import BottomNavigation from '../components/BottomNavigation'
import HomeIndexHeader from '../components/HomeIndexHeader'
import HomeLinkItem from '../components/HomeLinkItem'
import LinkApi from '../services/Link'
import BannerApi from '../services/Banner'
import EventApi from '../services/Event'
import ShopApi from '../services/Shop'
import { EventItem } from '../components/Board'
import { MY_LIST_STATE, BOARD_ROUTE, BOARD } from '../constants'
import { Metadata } from 'next'
import SeoApi from '@/src/services/Seo'

async function getLink() {
	const res = await LinkApi.getList({
		limit: 99,
		fields: ['$all'],
	})
	return res
}

async function getBanner() {
	const res = await BannerApi.getList({
		limit: 99,
		fields: ['$all'],
	})
	return res
}

async function getEvent(latitude?: number, longitude?: number) {
	const res = await EventApi.getList(
		{
			fields: [
				'description',
				'end_time',
				'shop_id',
				{
					shop: ['alias', 'images', { category: ['id', { thema: ['alias'] }] }],
				},
			],
			filter: {
				state: MY_LIST_STATE.APPROVED,
			},
			limit: 3,
		},
		{
			order_option: 'LATEST',
			distance_order: 'ASC',
			latitude,
			longitude,
		},
	)
	return res
}

async function getRecommendShop(latitude?: number, longitude?: number) {
	const res = await ShopApi.getList(
		{
			fields: [
				'title',
				'category_id',
				'user_id',
				'position',
				'images',
				'old_shop',
				{
					category: ['id', { thema: ['alias', 'name', { links: ['$all'] }] }],
				},
			],
			filter: {
				state: MY_LIST_STATE.APPROVED,
				is_random_20_shop: true,
			},
			limit: 20,
		},
		{
			order_option: 'LATEST',
			distance_order: 'ASC',
			latitude,
			longitude,
		},
	)
	return res
}

async function getNearShop(latitude?: number, longitude?: number) {
	const res = await ShopApi.getList(
		{
			fields: [
				'title',
				'category_id',
				'user_id',
				'position',
				'images',
				'old_shop',
				{
					category: ['id', { thema: ['alias', 'name', { links: ['$all'] }] }],
				},
			],
			filter: {
				state: MY_LIST_STATE.APPROVED,
			},
			limit: 4,
		},
		{
			order_option: 'LATEST',
			distance_order: 'ASC',
			latitude,
			longitude,
		},
	)
	return res
}

export async function generateMetadata(): Promise<Metadata> {
	const response = await SeoApi.get()
	const data = response.results.object
	return {
		title: data.title,
		description: data.description,
		alternates: {
			canonical: `/`,
		},
	}
}

const Home = async () => {
	const cookiesStore = cookies()
	const latitude = Number(cookiesStore.get('lat')?.value)
	const longitude = Number(cookiesStore.get('lng')?.value)

	const [listLink, listBanner, listEvent, listRecommendShop, listNearShop] =
		await Promise.all([
			getLink(),
			getBanner(),
			getEvent(latitude, longitude),
			getRecommendShop(latitude, longitude),
			getNearShop(latitude, longitude),
		])

	const postThema = listLink.results.objects.rows.find(
		(item) => item.route === BOARD.BULLETIN_BOARD,
	)?.thema_id

	return (
		<>
			<Header links={listLink.results.objects.rows} hiddenLink />
			<div className='pt-16 pb-20 bg-[#F2F7FF]'>
				<div
					className='grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))]
           gap-4 p-4 rounded-2xl bg-white'
				>
					{listLink.results.objects.rows.map((item, index) => (
						<HomeLinkItem
							key={index}
							themaId={item.thema_id}
							name={item.name}
							image={item.image}
							route={item.route}
						/>
					))}
				</div>
				<div className='p-4'>
					<Banner data={listBanner.results.objects.rows} />
				</div>
				<div className='bg-white'>
					<HomeIndexHeader title='내 주변 이벤트 중인 매장' href='/event' />
					<div className='p-4'>
						{listEvent.results.objects.rows.map((item, index) => (
							<EventItem
								shopId={item.shop_id}
								shopTitle={item.shop.alias}
								key={index}
								distance={item.distance}
								image={item.shop.images[0]}
								end_time={item.end_time}
								description={item.description}
							/>
						))}
					</div>
				</div>
				<div className='bg-white mt-2'>
					<HomeIndexHeader title='추천하는 매장' href='/' />
					<div className='grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-4 p-4'>
						{listRecommendShop.results.objects.rows.map((item, index) => (
							<BoardHomeItem
								key={index}
								id={item.id}
								title={item.title}
								image={item.images[0]}
								distance={item.distance}
								thema={item.category.thema.name}
							/>
						))}
					</div>
				</div>
				<div className='bg-white mt-2'>
					<HomeIndexHeader title='내주변 매장' href='/' />
					<div className='grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-4 p-4'>
						{listNearShop.results.objects.rows.map((item, index) => (
							<BoardHomeItem
								key={index}
								id={item.id}
								title={item.title}
								image={item.images[0]}
								distance={item.distance}
								thema={item.category.thema.name}
							/>
						))}
					</div>
				</div>
				<Footer />
			</div>
			<BottomNavigation postThema={postThema} />
		</>
	)
}

export default Home
