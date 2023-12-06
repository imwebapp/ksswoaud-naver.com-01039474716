'use client'

import { useState, useEffect } from 'react'

import { useAppSelector } from '@/src/stores/hook'
import EventApi, { EventI } from '@/src/services/Event'
import EventItem from '@/src/components/Board/EventItem'
import EmptyEventIcon from '@/src/components/Icon/EmptyEventIcon'

export default function Page() {
	const userStore = useAppSelector((state) => state.user.profile)

	const [list, setList] = useState<EventI[]>()

	const getList = async () => {
		const result = await EventApi.getList({
			fields: [
				'description',
				'end_time',
				'shop_id',
				'title',
				{
					shop: ['alias', 'images', { category: ['id', { thema: ['alias'] }] }],
				},
			],
			filter: {
				user_id: userStore.id,
			},
			limit: 3,
		})
		setList(result.results.objects.rows)
	}

	useEffect(() => {
		if (userStore.id) {
			getList()
		}
	}, [userStore.id])

	return (
		<div className='px-4 py-5 flex flex-col gap-4'>
			{list ? (
				<>
					{list.length ? (
						list.map((event, index) => (
							<EventItem
								shopId={event.shop_id}
								shopTitle={event.shop.alias}
								end_time={event.end_time}
								key={index}
								image={event.shop.images[0]}
								edit
								id={event.id}
								description={event.description}
							/>
						))
					) : (
						<div className='flex flex-col items-center gap-2.5 mt-32 text-center'>
							<EmptyEventIcon />
							<p className='font-medium text-lg '>등록한 이벤트가 없습니다</p>
							<p className='text-sm text-[#555770]'>
								등록하여 이벤트를 만들어 보세요
							</p>
						</div>
					)}
				</>
			) : null}
		</div>
	)
}
