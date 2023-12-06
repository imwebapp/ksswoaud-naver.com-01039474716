import { ShopQueryParams } from '@/src/stores/type'
import { createShopFilter } from '@/src/utils/common'
import KindBoard from '@/src/components/KindBoard'
import CategoryApi from '@/src/services/Category'
import TagApi from '@/src/services/Tag'
import ListShop from '@/src/components/ListShop'
import { Metadata } from 'next'
import ThemeApi from '@/src/services/Thema'
import { MetadataProps } from '@/src/interfaces'

async function getListCategory(thema_id: string) {
	const res = await CategoryApi.getList({
		fields: ['$all'],
		filter: {
			thema_id,
		},
	})
	return res
}

async function getListTag(thema_id: string) {
	const res = await TagApi.getList({
		fields: ['$all'],
		filter: {
			thema_id,
		},
	})
	return res
}

export async function generateMetadata({
	params,
	searchParams,
}: MetadataProps): Promise<Metadata> {
	const id = params.id
	const thema = await ThemeApi.findOne(id, { fields: ['name'] })
	return {
		title: thema.results.object.name,
		description:
			'마사지샵 목록은 다음과 같습니다. 다양한 편안한 경험을 살펴보세요. 우리의 포괄적인 목록에서 숙련된 치료사들이 개인의 취향에 맞게 제공하는 다양한 마사지를 즐겨보세요. 전통적인 기술부터 현대적인 치료까지, 마사지샵 목록은 다음과 같다 - 휴식과 웰빙을 위한 안내서입니다. 디렉터리를 통해 둘러보고 평온과 활기찬 에너지를 찾아보세요.',
		alternates: {
			canonical: `/shop/${id}`,
		},
	}
}

export default async function ShopPage({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: ShopQueryParams
}) {
	const categories = searchParams.categories?.split(',')
	const tags = searchParams.tags?.split(',')
	const keyword = searchParams.keyword
	const { line, station, province, district } = searchParams
	const distanceOrder = Object.keys(searchParams).length === 0

	const [listCategory, listTag] = await Promise.all([
		getListCategory(params.id),
		getListTag(params.id),
	])

	return (
		<div>
			<KindBoard
				selectedCategories={categories}
				selectedTags={tags}
				categories={listCategory.results.objects.rows}
				tags={listTag.results.objects.rows}
				line={line}
				station={station}
				province={province}
				district={district}
			/>

			<ListShop
				filter={createShopFilter({
					categories,
					tags,
					province,
					district,
					line,
					station,
					keyword,
				})}
				thema_id={params.id}
				orderBy={distanceOrder}
			/>
		</div>
	)
}
