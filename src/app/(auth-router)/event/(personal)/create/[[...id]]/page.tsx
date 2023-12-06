'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Range } from 'react-date-range'
import { useRouter, useParams } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import Image from 'next/image'

import EventInputField from '@/src/components/EventInputField'
import FixedComponent from '@/src/components/FixedComponent'
import ShopApi, { ShopI } from '@/src/services/Shop'
import { useAppSelector } from '@/src/stores/hook'
import PostCategoryDialog from '@/src/components/PostCategoryDialog'
import CustomDateRangePicker from '@/src/components/CustomDateRange'
import EventApi, { EventPayload } from '@/src/services/Event'
import { formatDate, classNames } from '@/src/utils/common'
import { MY_LIST_STATE } from '@/src/constants'

interface EventForm {
	shop_id: string
	description: string
}

export default function CreateEventPage() {
	const userStore = useAppSelector((state) => state.user.profile)

	const { register, handleSubmit, setValue, getValues } = useForm<EventForm>()
	const router = useRouter()
	const params = useParams()
	const id = params.id && params.id.length ? params.id[0] : undefined

	const [listStores, setListStores] = useState<ShopI[]>([])
	const [openShopList, setOpenShopList] = useState(false)
	const [openDateRangeDialog, setDateRangeDialog] = useState(false)
	const [selectedRanges, setSelectedRanges] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	})

	const getMyShops = async () => {
		const res = await ShopApi.getList({
			fields: ['id', 'title'],
			filter: {
				user_id: userStore.id,
				state: MY_LIST_STATE.APPROVED,
			},
		})
		setListStores(res.results.objects.rows)
	}

	const onSubmit = async (data: EventForm) => {
		if (!data.shop_id) window.alert('must select a shop')
		if (selectedRanges && selectedRanges.startDate && selectedRanges.endDate) {
			const payload: EventPayload = {
				shop_id: data.shop_id,
				description: data.description,
				start_time: selectedRanges.startDate.getTime(),
				end_time: selectedRanges.endDate.getTime(),
				user_id: userStore.id,
				images: [],
			}
			try {
				if (id) {
					await EventApi.update(id, payload)
				} else {
					await EventApi.create(payload)
				}
				router.push('/event/my-event')
			} catch (error) {
				let message: string = (error as any).message
				if (message.includes('One shop'))
					message =
						'이미 이벤트가 등록되어 있는 매장입니다. 1개이상 이벤트 등록이 불가합니다.'
				enqueueSnackbar(message, { variant: 'error' })
			}
		}
	}

	const initial = async () => {
		if (id) {
			const result = await EventApi.get(id, {
				fields: [
					'description',
					'end_time',
					'shop_id',
					'description',
					'start_time',
					'end_time',
				],
			})
			const event = result.results.object
			setValue('shop_id', event.shop_id)
			setValue('description', event.description)
			setSelectedRanges({
				...selectedRanges,
				startDate: new Date(Number(event.start_time)),
				endDate: new Date(Number(event.end_time)),
			})
		}
	}

	const dateRangeValue = selectedRanges
		? formatDate(selectedRanges.startDate) +
		  ' ~ ' +
		  formatDate(selectedRanges.endDate)
		: undefined

	useEffect(() => {
		if (userStore.id) {
			getMyShops()
		}
	}, [userStore])

	useEffect(() => {
		if (id) {
			initial()
		}
	}, [id])

	return (
		<div className='px-4 pt-5 pb-20'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className='text-lg font-medium mb-8 block'>
					<p className='mb-4 font-bold'>매장 선택</p>
					<div className='text-lg font-medium relative'>
						<select
							className={classNames(
								'cursor-pointer pl-10 px-3 py-2 w-full border-2 border-[#E4E4E7]',
								'appearance-none',
							)}
							placeholder='매장을 선택해주세요'
							defaultValue={undefined}
							{...register('shop_id', { required: true })}
						>
							{listStores.map((item, i) => (
								<option value={item.id} key={i}>
									{item.title}
								</option>
							))}
						</select>
						<Image
							src={'/icons/expand.svg'}
							alt=''
							width={30}
							height={30}
							className='absolute left-2 top-2'
						/>
					</div>
				</label>

				<EventInputField
					label='행사 기간'
					placeholder='기간을 선택해주세요'
					expand
					onClick={() => setDateRangeDialog(true)}
					value={dateRangeValue}
				/>

				<EventInputField
					label='행사 설명'
					placeholder='예시) 오후 할인 1만원'
					{...register('description', { required: true })}
				/>
				<FixedComponent>
					<button
						type='submit'
						className=' max-w-[502px] w-full mx-auto py-3 text-white
          bg-[linear-gradient(148deg,#5099FF_16.53%,#005BDB_84.41%)] font-normal'
					>
						등록
					</button>
				</FixedComponent>
			</form>
			<PostCategoryDialog
				open={openShopList}
				onClose={() => setOpenShopList(false)}
				data={listStores.map((shop) => ({ id: shop.id, name: shop.title }))}
				onChange={(e) => {
					const value = JSON.parse(e.target.value)
					setValue('shop_id', value.id)
				}}
			/>
			<CustomDateRangePicker
				open={openDateRangeDialog}
				onClose={() => setDateRangeDialog(false)}
				ranges={[selectedRanges]}
				onChange={(range) => {
					setSelectedRanges(range)
				}}
			/>
		</div>
	)
}
