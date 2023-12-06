'use client'

import { useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

import Header from '@/src/components/Header'
import NavigationTabs, {
	NavigationTabProps,
} from '@/src/components/NavigationTabs'
const SearchShop = dynamic(() => import('@/src/components/SearchShop'))
const SearchPost = dynamic(() => import('@/src/components/SearchPost'))
const SearchBlog = dynamic(() => import('@/src/components/SearchBlog'))
const SearchEvent = dynamic(() => import('@/src/components/SearchEvent'))

const SEARCH_TAB = {
	SHOP: 'SHOP',
	POST: 'POST',
	BLOG: 'BLOG',
	EVENT: 'EVENT',
}

export default function SearchPage({
	searchParams,
}: {
	searchParams: { keyword?: string; type?: string }
}) {
	const keyword = searchParams.keyword
	const type = searchParams.type ?? SEARCH_TAB.SHOP
	const pathname = usePathname()

	const router = useRouter()

	const handleClickTab = (type: string) => {
		const params = new URLSearchParams(searchParams)
		if (type == SEARCH_TAB.SHOP) {
			params.delete('type')
		} else {
			params.set('type', type)
		}
		router.push(pathname + '?' + params.toString())
	}

	const tabData: NavigationTabProps[] = [
		{
			label: '샵',
			active: type === SEARCH_TAB.SHOP,
			onClick: () => handleClickTab(SEARCH_TAB.SHOP),
		},
		{
			label: '포스트',
			active: type === SEARCH_TAB.POST,
			onClick: () => handleClickTab(SEARCH_TAB.POST),
		},
		{
			label: '블로그',
			active: type === SEARCH_TAB.BLOG,
			onClick: () => handleClickTab(SEARCH_TAB.BLOG),
		},
		{
			label: '이벤트',
			active: type === SEARCH_TAB.EVENT,
			onClick: () => handleClickTab(SEARCH_TAB.EVENT),
		},
	]

	return (
		<>
			<Header>
				<NavigationTabs data={tabData} />
			</Header>
			<div className='mt-28'>
				{type === SEARCH_TAB.SHOP ? <SearchShop keyword={keyword} /> : null}
				{type === SEARCH_TAB.POST ? <SearchPost keyword={keyword} /> : null}
				{type === SEARCH_TAB.BLOG ? <SearchBlog keyword={keyword} /> : null}
				{type === SEARCH_TAB.EVENT ? <SearchEvent keyword={keyword} /> : null}
			</div>
		</>
	)
}
