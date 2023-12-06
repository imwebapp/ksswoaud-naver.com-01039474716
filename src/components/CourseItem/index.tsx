import { CourseI } from '@/src/services/Course'
import { numberWithComma } from '@/src/utils/common'

export interface CourseItemProps {
	data: CourseI
}

const PRICE_TEXT = {
	NIGHT: '밤',
	DAY: '낮',
}

export default function CourseItem({ data }: CourseItemProps) {
	return (
		<div className='flex flex-col gap-1 py-3 font-bold'>
			<p>
				{data.title} ({data.running_time})
			</p>
			<p className='text-[#C6C6C6]'>{data.description}</p>
			{data.prices.map((price, index) => {
				const discount =
					Math.round(((price.price - price.discount) / price.price) * 100) ?? 0
				return (
					<div key={index} className='flex gap-2'>
						{price.name !== 'ALL' ? (
							<span>{PRICE_TEXT[price.name]}</span>
						) : null}
						<span>
							{numberWithComma(price.discount)}
							{data.unit}
						</span>
						<span className='text-[#C6C6C6] line-through'>
							{numberWithComma(price.price)}
							{data.unit}
						</span>
						<span className='text-[#37C4EF]'>{discount}%</span>
					</div>
				)
			})}
		</div>
	)
}
