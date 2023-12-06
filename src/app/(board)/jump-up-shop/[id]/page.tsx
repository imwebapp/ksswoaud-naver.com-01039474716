import { JumpUpButtonFilter } from '@/src/components/Board'
import CategoryApi from '@/src/services/Category'
import TagApi from '@/src/services/Tag'
import { ShopQueryParams } from '@/src/stores/type'
import { createShopFilter } from '@/src/utils/common'
import ListJumpUp from '@/src/components/ListJumpUp'
import { MetadataProps } from '@/src/interfaces'
import { Metadata } from 'next'
import ThemeApi from '@/src/services/Thema'

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
			'다양한 상점의 매력적인 세계를 탐험하고 싶다면, 당신을 위한 완벽한 안내서가 있습니다 - 상점 게시물 목록. 우리의 포괄적인 목록에서는 다양한 업종의 최고의 상점들이 모두 소개되어 있습니다. 트렌디한 패션부터 혁신적인 제품까지, 상점 게시물 목록은 다양성과 품질을 자랑합니다. 새로운 쇼핑 체험을 찾고 있다면, 상점 게시물 목록으로 안내받아 새로운 트렌드를 만나보세요. 최고의 제품과 서비스를 제공하는 상점들이 여러분을 기다리고 있습니다.',
		alternates: {
			canonical: `/jump-up-shop/${id}`,
		},
	}
}

export default async function JumpUpPage({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: ShopQueryParams
}) {
	const categories = searchParams.categories?.split(',')
	const tags = searchParams.tags?.split(',')
	const keyword = searchParams.keyword

	const [listCategory, listTag] = await Promise.all([
		getListCategory(params.id),
		getListTag(params.id),
	])

	const filter = createShopFilter({ categories, tags, keyword })

	return (
		<div>
			<ListJumpUp thema_id={params.id} filter={filter} />
			<JumpUpButtonFilter
				categories={listCategory.results.objects.rows}
				tags={listTag.results.objects.rows}
				selectedCategories={categories}
				selectedTags={tags}
			/>
		</div>
	)
}
