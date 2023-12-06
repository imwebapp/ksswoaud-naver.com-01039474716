import { type MetadataRoute } from 'next'
import BlogApi from '@/src/services/Blog'
import LinkApi from '@/src/services/Link'
import { BOARD, BOARD_ROUTE, MY_LIST_STATE } from '@/src/constants'
import CategoryApi from '@/src/services/Category'
import ShopApi from '@/src/services/Shop'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = 'https://newbkshop.com'

	const boardsTransaction = await LinkApi.getList({
		limit: 99,
		fields: ['$all'],
	})
	const boardsRoutes = boardsTransaction.results.objects.rows.map(link => {
		const href = BOARD_ROUTE[link.route]
			? `${BOARD_ROUTE[link.route]}/${link.thema_id}`
			: ''
		return {
			url: `${baseURL}${href}`,
			lastModified: new Date().toISOString(),
		}
	})
	const boardsCategoryRoutes : MetadataRoute.Sitemap = []
	for (const link of boardsTransaction.results.objects.rows) {
		if (BOARD_ROUTE[link.route]===BOARD_ROUTE[BOARD.BLOG] || BOARD_ROUTE[link.route]===BOARD_ROUTE[BOARD.BULLETIN_BOARD]){
			const categories = await CategoryApi.getList({
				fields: ['$all'],
				filter: {
					thema_id: link.thema_id,
				},
			})
			categories.results.objects.rows.forEach(category=>{
				boardsCategoryRoutes.push({
					url: `${baseURL}${BOARD_ROUTE[link.route]}/${link.thema_id}/?category_id=${category.id}`,
					lastModified: new Date().toISOString(),
				})
			})

		}
	}

	const listShop = await ShopApi.getList({
		fields: ['id', 'title'],
		limit : 99,
		page : 1,
		order : [['created_at', 'DESC']]
	})
	const shopsRoutes = listShop.results.objects.rows.map(shop=>({
		url:  `${baseURL}/detail/${encodeURIComponent(shop.title)}/${shop.id}`,
		lastModified: new Date().toISOString(),
	}))




	const routes = [
		'',
		'/shop',
		'/jump-up-shop',
		'/post',
		'/blog',
		'/event',
	].map((route) => ({
		url: `${baseURL}${route}`,
		lastModified: new Date().toISOString(),
	}))

	return [
		...routes,
		...boardsRoutes,
		...boardsCategoryRoutes,
		...shopsRoutes,
	]
}
