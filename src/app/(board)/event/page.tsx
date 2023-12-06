import EventItem from '@/src/components/Board/EventItem'
import ListEvent from '@/src/components/ListEvent'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '이벤트',
	description:
		'이벤트 페이지에 오신 것을 환영합니다! 특별한 순간들을 함께 즐길 준비가 되셨나요? 부산 출장 마사지, 부산 출장 안마, 부산 홈타이, 해운대 출장 마사지, 서면 출장 마사지와 관련된 다양한 이벤트 및 행사 소식을 여기에서 만나보세요. 특별한 날을 더욱 특별하게 만들어줄 다양한 이벤트들이 기다리고 있습니다. 전문 마사지 테라피스트들과의 특별한 만남, 혜택이 가득한 할인 행사, 그리고 건강과 행복을 위한 다양한 워크숍을 통해 새로운 경험과 지식을 얻어보세요. 우리와 함께하는 모든 순간이 특별함을 담고 있습니다. 최신 소식과 참가 안내를 확인하여 특별한 이벤트에 참여해 즐거운 경험을 만들어보세요!',
	alternates: {
		canonical: `/event`,
	},
}
export default function Event({
	searchParams,
}: {
	searchParams: { keyword?: string }
}) {
	const { keyword } = searchParams
	return (
		<div>
			<div className='p-2'>
				<ListEvent keyword={keyword} />
			</div>
		</div>
	)
}
