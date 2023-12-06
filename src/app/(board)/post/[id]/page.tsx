import Link from 'next/link'
import Image from 'next/image'

import PostCategory from '@/src/components/Board/PostCategory'
import CategoryApi from '@/src/services/Category'
import ListPost from '@/src/components/ListPost'
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

export async function generateMetadata({
	params,
	searchParams,
}: MetadataProps): Promise<Metadata> {
	const id = params.id
	const { category_id } = searchParams
	let categoryTitle
	const thema = await ThemeApi.findOne(id, { fields: ['name'] })
	if (category_id) {
		const category = await CategoryApi.findOne(category_id as string, {
			fields: ['name'],
		})
		categoryTitle = category.results.object.name
	}
	const subtitle = categoryTitle ? `| ${categoryTitle}` : ''
	const canonical = category_id ? `?category_id=${category_id}` : ''
	return {
		title: `${thema.results.object.name}` + subtitle,
		description:
			'다양한 상점의 매력적인 세계를 탐험하고 싶다면, 당신을 위한 완벽한 안내서가 있습니다 - 상점 게시물 목록. 우리의 포괄적인 목록에서는 다양한 업종의 최고의 상점들이 모두 소개되어 있습니다. 트렌디한 패션부터 혁신적인 제품까지, 상점 게시물 목록은 다양성과 품질을 자랑합니다. 새로운 쇼핑 체험을 찾고 있다면, 상점 게시물 목록으로 안내받아 새로운 트렌드를 만나보세요. 최고의 제품과 서비스를 제공하는 상점들이 여러분을 기다리고 있습니다.',
		alternates: {
			canonical: `/post/${id}` + canonical,
		},
	}
}

export default async function PostPage({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { category_id?: string; keyword?: string }
}) {
	const [listCategory] = await Promise.all([getListCategory(params.id)])
	const { category_id, keyword } = searchParams

	return (
		<div>
			<div className='px-4 py-2'>
				<PostCategory categories={listCategory.results.objects.rows} />
			</div>
			<Link
				href={`/post/create/${params.id}`}
				className='rounded-full  w-fit block z-10
          shadow-[0px_0px_32px_0px_rgba(0,0,0,0.16)] fixed bottom-28 right-4'
			>
				<div>
					<Image src='/icons/ic-edit.svg' alt='' width={60} height={60} />
				</div>
			</Link>

			<ListPost
				thema_id={params.id}
				category_id={category_id}
				keyword={keyword}
			/>
		</div>
	)
}
