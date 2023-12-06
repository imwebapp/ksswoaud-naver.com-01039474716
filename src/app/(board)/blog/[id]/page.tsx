import ListBlog from '@/src/components/ListBlog'
import CategoryApi from '@/src/services/Category'
import { PostCategory } from '@/src/components/Board'
import { MetadataProps } from '@/src/interfaces'
import { Metadata } from 'next'
import ThemeApi from '@/src/services/Thema'

export async function generateMetadata({
	params,
	searchParams,
}: MetadataProps): Promise<Metadata> {
	const id = params.id
	const { category_id } = searchParams
	const thema = await ThemeApi.findOne(id, { fields: ['name'] })
	let categoryTitle
	if (category_id) {
		const category = await CategoryApi.findOne(category_id as string, {
			fields: ['name'],
		})
		categoryTitle = category.results.object.name
	}
	const subtitle = categoryTitle ? `| ${categoryTitle}` : ''
	const canonical = category_id ? `?category_id=${category_id}` : ''
	return {
		title: thema.results.object.name + subtitle,
		description:
			'환영합니다! 저희 블로그 페이지에서는 부산 출장 마사지, 부산 출장 안마, 부산 홈타이, 해운대 출장 마사지, 서면 출장 마사지와 관련된 다양한 소식과 유용한 정보를 공유하고 있습니다. 최고의 전문가들이 제공하는 다양한 마사지 기술과 효과적인 휴식법에 대한 팁을 찾아보세요. 여기에서는 마사지와 관련된 최신 트렌드, 건강에 좋은 습관, 그리고 편안한 라이프스타일에 관한 다양한 주제를 다뤄드립니다. 부산 출장 마사지와 관련된 모든 궁금증을 해소하고 편안하고 건강한 삶을 위한 길잡이가 되어드리겠습니다. 함께 새로운 마사지 경험을 찾아 떠나보세요!',
		alternates: {
			canonical: `/blog/${id}` + canonical,
		},
	}
}
const Page = async ({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { category_id?: string; keyword?: string }
}) => {
	const thema_id = params.id
	const { category_id, keyword } = searchParams

	const categoryResponse = await CategoryApi.getList({
		fields: ['$all'],
		filter: {
			thema_id,
		},
	})

	const categories = categoryResponse.results.objects.rows

	return (
		<main>
			<div className='flex justify-between items-center px-[15px] text-[#52525B] text-[16px] font-medium'>
				<PostCategory categories={categories} />
			</div>
			<ListBlog
				category_id={category_id}
				thema_id={thema_id}
				keyword={keyword}
			/>
		</main>
	)
}

export default Page
