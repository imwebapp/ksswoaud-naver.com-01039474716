'use client'

import { useEffect, useState, useId } from 'react'
import { v4 as uuidv4 } from 'uuid'

import CreateStoreTab from '../CreateStoreTab'
import StoreInputField, { StoreLabel } from '../StoreInputField'
import { useDispatch, useSelector } from 'react-redux'
import { listShopActions } from '@/src/stores/listShop/listShopSlice'
import UnitDialog from '../../UnitDialog'
import PostCategoryDialog from '../../PostCategoryDialog'
import Image from 'next/image'
import TabListPrice from './TabListPrice'
import Button from '../../Button'
import { assign, findIndex, isEmpty, merge } from 'lodash'
import { RootState } from '@/src/stores'
import { shopActions } from '@/src/stores/shop/shopSlice'
let DATA = {}

export default function PriceStep() {
	const shop = useSelector((state: RootState) => state.shop.store)
	const course = useSelector((state: RootState) => state.shop.course)
	const { updateInformationShop, updateInformationCourse } = shopActions
	const dispatch = useDispatch()
	const [status, setStatus] = useState('no')
	const [timeDialog, setTimeDialog] = useState(false)
	const [currencyPaid, setCurrencyPaid] = useState(false)
	const [tabCurrent, setTabCurrent] = useState('registion')
	const [openModalPrice, setOpenModalPrice] = useState(false)
	const [namePrice, setNamePrice] = useState('')
	const [disabled, setDisabled] = useState(true)
	let itemsCurrentPaid: any[] = [
		{ id: '1', name: '원', value: '원', label: '원' },
		{ id: '2', name: '달러', value: '달러', label: '달러' },
		{ id: '3', name: '엔화', value: '엔화', label: '엔화' },
		{ id: '4', name: '동', value: '동', label: '동' },
	]

	const handleChange = (e: any) => {
		setStatus(e.target.value)
	}

	const handleChangeInputValue = (e: any) => {
		dispatch(
			updateInformationCourse({
				[`${e.target.name}`]: e.target.value,
			}),
		)
	}

	const handleOnchangeTab = (item: any) => {
		if (item === 'registion') {
			dispatch(
				updateInformationCourse({
					title: '',
					description: '',
					running_time: 0,
					price: 0,
					discount: 0,
					currency: '',
					id: null,
				}),
			)
		}
		setTabCurrent(item)
	}

	const handleRadioChange = (e: any) => {
		dispatch(
			updateInformationCourse({
				[`${e.target.name}`]: JSON.parse(e.target.value),
			}),
		)
	}

	const handleChangeRuningTime = (v: any) => {
		console.log('v', v)
		dispatch(
			updateInformationCourse({
				...v,
				running_time: `${v.running_time}분`,
			}),
		)
	}

	const handleChangeUnit = (v: any) => {
		if (status === 'no') {
			dispatch(
				updateInformationCourse({
					prices: [{ ...course?.prices[0], ...v, id: uuidv4(), name: 'ALL' }],
				}),
			)
		} else {
			DATA = { ...DATA, ...v }
			const originalObject: { [key: string]: any } = { ...DATA }

			const dayObject: { [key: string]: any } = {}
			const nightObject: { [key: string]: any } = {}

			for (const key in originalObject) {
				if (key.startsWith('day_')) {
					dayObject[key.replace('day_', '')] = originalObject[key]
					dayObject.name = 'day'
					if (!dayObject.id) {
						dayObject.id = uuidv4()
					}
				} else if (key.startsWith('night_')) {
					nightObject[key.replace('night_', '')] = originalObject[key]
					nightObject.name = 'night'
					if (!nightObject.id) {
						nightObject.id = uuidv4()
					}
				}
			}

			const resultArray: { [key: string]: any }[] = [dayObject, nightObject]
			dispatch(
				updateInformationCourse({
					...course,
					prices: [...resultArray],
				}),
			)
		}
	}

	const handleSubmitCourse = () => {
		const courseId = uuidv4()
		const courseOn = Object.values(course).some((v) => isEmpty(`${v}`))

		if (!courseOn) {
			if (course.id) {
				const shopCourseClone = shop.courses.map((v: any) =>
					v.id === course.id ? { ...v, ...course } : v,
				)

				dispatch(updateInformationShop({ courses: shopCourseClone }))
			} else {
				const newCourse = { ...course, id: courseId }
				const newCourses = shop.courses
					? [...shop.courses, newCourse]
					: [newCourse]

				dispatch(updateInformationCourse({ id: courseId }))
				dispatch(updateInformationShop({ courses: newCourses }))
			}

			setTabCurrent('list')
		}
	}

	useEffect(() => {
		dispatch(
			updateInformationCourse({
				prices: [],
			}),
		)
	}, [status])

	useEffect(() => {
		const list = ['title', 'description', 'running_time', 'prices', 'currency']
		const isdisabled = list.some((v) => !course[v])
		setDisabled(isdisabled)
	}, [course])

	return (
		<div className='pb-10'>
			<CreateStoreTab
				onChange={handleOnchangeTab}
				tab={tabCurrent}
				items={[
					{
						value: 'registion',
						label: '코스등록',
					},
					{
						value: 'list',
						label: '코스목록',
					},
				]}
			/>
			{tabCurrent === 'registion' ? (
				<>
					<div className='my-8'>
						<StoreLabel>주간 야간별 요금을 각각 설정</StoreLabel>
						<div className='flex'>
							<label className='flex gap-4 grow'>
								<input
									type='radio'
									value={'no'}
									onChange={handleChange}
									checked={status === 'no'}
								/>
								<p className='text-xl font-medium'>아니오</p>
							</label>
							<label className='flex gap-4 grow'>
								<input
									type='radio'
									value={'yes'}
									onChange={handleChange}
									checked={status === 'yes'}
								/>
								<p className='text-xl font-medium'>예</p>
							</label>
						</div>
					</div>
					<StoreInputField
						value={course.title}
						name='title'
						label='코스이름'
						placeholder='예시) 케어관리'
						onChange={handleChangeInputValue}
					/>
					<StoreInputField
						value={course.description}
						name='description'
						label='매장의 장점을 입력해주세요'
						row={5}
						placeholder='매장의 장점을 입력해주세요'
						onChange={handleChangeInputValue}
					/>
					<StoreInputField
						value={course.running_time ? course.running_time : ''}
						label='코스시간'
						expand
						placeholder='선택해주세요'
						onClick={() => setTimeDialog(true)}
					/>
					{status === 'no' ? (
						<>
							<StoreInputField
								value={
									course?.prices && course?.prices[0]?.price
										? Intl.NumberFormat('en-US').format(course.prices[0].price)
										: ''
								}
								onClick={() => {
									setNamePrice('price')
									setOpenModalPrice(true)
								}}
								label='할인전 금액 '
								expand
								placeholder='선택해주세요'
							/>
							<StoreInputField
								className='text-[#0162F2]'
								value={
									course?.prices && course?.prices[0]?.discount
										? Intl.NumberFormat('en-US').format(
												course.prices[0].discount,
										  )
										: ''
								}
								onClick={() => {
									setNamePrice('discount')
									setOpenModalPrice(true)
								}}
								label={<p className='text-[#0162F2]'>할인된 금액</p>}
								expand
								placeholder='선택해주세요'
							/>
						</>
					) : (
						<>
							<StoreInputField
								value={
									course?.prices && course?.prices[0]?.price
										? Intl.NumberFormat('en-US').format(
												course?.prices[0]?.price,
										  )
										: ''
								}
								label='주간 할인전 금액'
								onClick={() => {
									setNamePrice('day_price')
									setOpenModalPrice(true)
								}}
								expand
								placeholder='요금선택'
							/>
							<StoreInputField
								value={
									course?.prices[0] && course?.prices[0]?.discount
										? Intl.NumberFormat('en-US').format(
												course?.prices[0]?.discount,
										  )
										: ''
								}
								onClick={() => {
									setNamePrice('day_discount')
									setOpenModalPrice(true)
								}}
								label={<p className='text-[#0162F2]'>주간 할인된 금액</p>}
								expand
								placeholder='요금선택'
							/>
							<StoreInputField
								value={
									course?.prices[1] && course?.prices[1]?.price
										? Intl.NumberFormat('en-US').format(
												course?.prices[1]?.price,
										  )
										: ''
								}
								onClick={() => {
									setNamePrice('night_price')
									setOpenModalPrice(true)
								}}
								label={'야간 할인전 금액'}
								expand
								placeholder='요금선택'
							/>

							<StoreInputField
								value={
									course?.prices[1] && course?.prices[1]?.discount
										? Intl.NumberFormat('en-US').format(
												course?.prices[1]?.discount,
										  )
										: ''
								}
								onClick={() => {
									setNamePrice('night_discount')
									setOpenModalPrice(true)
								}}
								label={<p className='text-[#0162F2]'>야간 할인된 금액</p>}
								expand
								placeholder='요금선택'
							/>
						</>
					)}
					<StoreInputField
						value={course.currency?.name}
						label='결제가능한 화폐'
						name='currency'
						expand
						onClick={() => setCurrencyPaid(true)}
					/>
				</>
			) : (
				<TabListPrice
					context={{
						setTabCurrent,
					}}
				/>
			)}

			<UnitDialog
				title={
					<div className='flex flex-col justify-center items-center gap-3 my-5'>
						<Image
							src='/images/pick-time.png'
							width={100}
							height={100}
							alt=''
						/>
						<p className='text-center  text-xl font-bold py-3'>
							시간을 설정해주세요
						</p>
					</div>
				}
				name={'running_time'}
				open={timeDialog}
				onClose={() => setTimeDialog(false)}
				onChange={handleChangeRuningTime}
				type={'time'}
			/>

			<UnitDialog
				title={
					<div className='flex flex-col justify-center items-center gap-3 my-5'>
						<Image
							src='/images/Inforrmation _ More Information.png'
							width={100}
							height={100}
							alt=''
						/>
						<p className='text-center  text-xl font-bold py-3'>
							금액을 설정해주세요
						</p>
					</div>
				}
				name={namePrice}
				open={openModalPrice}
				onClose={() => setOpenModalPrice(false)}
				type={'currency'}
				onChange={handleChangeUnit}
			/>
			<PostCategoryDialog
				title='화폐'
				name='currency'
				open={currencyPaid}
				onClose={() => setCurrencyPaid(false)}
				onChange={handleRadioChange}
				data={itemsCurrentPaid}
			/>
			{tabCurrent === 'registion' && (
				<div onClick={handleSubmitCourse}>
					<Button disabled={disabled}>코스추가</Button>
				</div>
			)}
		</div>
	)
}
