import { useEffect, useState } from 'react'

import StoreInputField from '../StoreInputField'
import PostCategoryDialog from '../../PostCategoryDialog'
import LocationDialog from '../../LocationDialog'
import StationDialog from '../../StationDialog'
import { useDispatch, useSelector } from 'react-redux'
import { shopActions } from '@/src/stores/shop/shopSlice'
import { RootState } from '@/src/stores'
import CategoryApi, { CategoryI } from '@/src/services/Category'
import TagApi, { TagI } from '@/src/services/Tag'
import TimeShopDialog from '../../TimeShopDialog'
import TagDialog from '../../TagDialog'
import ThemeApi, { ThemaI } from '@/src/services/Thema'

export default function ConfigStep() {
	const shop = useSelector((state: RootState) => state.shop.store)

	const { updateInformationShop } = shopActions
	const dispatch = useDispatch()
	const [workingTimeDialog, setWorkingTimeDialog] = useState(false)
	const [themeDialog, setThemeDialog] = useState(false)
	const [categoryDialog, setCategoryDialog] = useState(false)
	const [tagDialog, setTagDialog] = useState(false)
	const [locationDialog, setLocationDialog] = useState(false)
	const [stationDialog, setStationDialog] = useState(false)
	const [themaData, setThemaData] = useState<ThemaI[]>([])
	const [selectedThema, setSelectedThema] = useState<string | undefined>(
		shop?.category?.thema_id,
	)
	const [categoryData, setCategoryData] = useState<CategoryI[]>([])
	const [tagData, setTagData] = useState<TagI[]>([])

	const handleChangeLocation = (province: string, district: string) => {
		dispatch(
			updateInformationShop({
				shop_province: province,
				shop_district: district,
			}),
		)
	}

	const handleChangeStation = (
		location: string,
		line: string,
		station: string,
	) => {
		dispatch(
			updateInformationShop({
				subway_location: location,
				subway_line: line,
				subway_station: station,
			}),
		)
	}

	const handleThemaChange = (e: any) => {
		const res = JSON.parse(`${e.target.value}`)
		setSelectedThema(res.id)
		dispatch(
			updateInformationShop({
				tag_ids: [],
				category_id: undefined,
			}),
		)
	}

	const handleCategoryChange = (e: any) => {
		const res = JSON.parse(`${e.target.value}`)
		dispatch(
			updateInformationShop({
				category_id: res.id,
			}),
		)
	}

	const handleOnChangePickTime = (data: any) => {
		dispatch(
			updateInformationShop({
				opening_hours: `${data.timeStart}~${data.timeEnd} `,
			}),
		)
	}

	const getListThema = async () => {
		try {
			const result = await ThemeApi.getList({
				fields: ['$all'],
			})
			setThemaData(result.results.objects.rows)
		} catch (err) {
			console.log(err)
		}
	}

	const getListTag = async () => {
		try {
			const result = await TagApi.getList({
				fields: ['$all'],
				filter: { thema_id: selectedThema },
			})
			setTagData(result.results.objects.rows)
		} catch (err) {
			console.log(err)
		}
	}

	const getListCategory = async () => {
		try {
			const result = await CategoryApi.getList({
				fields: ['$all'],
				filter: { thema_id: selectedThema },
			})
			setCategoryData(result.results.objects.rows)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getListThema()
	}, [])

	useEffect(() => {
		if (selectedThema) {
			getListTag()
			getListCategory()
		}
	}, [selectedThema])

	const handleTagChange = (e: any) => {
		dispatch(
			updateInformationShop({
				tag_ids: e,
			}),
		)
	}

	return (
		<div>
			<StoreInputField
				value={shop.opening_hours}
				onClick={() => setWorkingTimeDialog(true)}
				label='영업시간'
				expand
				placeholder='영업시간을 설정해주세요'
			/>
			<StoreInputField
				value={themaData.find((thema) => thema.id === selectedThema)?.name}
				label='테마'
				expand
				placeholder='테마를 선택해주세요'
				onClick={() => setThemeDialog(true)}
			/>
			<StoreInputField
				value={
					categoryData.find((category) => category.id === shop.category_id)
						?.name
				}
				label='카테고리'
				expand
				placeholder='카테고리를 선택해주세요'
				onClick={() => setCategoryDialog(true)}
			/>
			<StoreInputField
				value={tagData
					.filter((tag) => shop.tag_ids && shop.tag_ids.includes(tag.id))
					.map((item) => item.name)
					.toString()}
				label='태그'
				expand
				row={1}
				placeholder='태그를 선택해주세요'
				onClick={() => setTagDialog(true)}
			/>
			<StoreInputField
				value={`${shop.shop_province ?? ''} ${shop.shop_district ?? ''}`}
				label='지역'
				expand
				placeholder='지역을 선택해주세요'
				onClick={() => setLocationDialog(true)}
			/>
			<StoreInputField
				value={`${shop.subway_location ?? ''} ${shop.subway_line ?? ''} ${shop.subway_station ?? ''}`}
				label='지하철'
				expand
				placeholder='지하철을 선택해주세요'
				onClick={() => setStationDialog(true)}
			/>
			<TimeShopDialog
				open={workingTimeDialog}
				onClose={() => setWorkingTimeDialog(false)}
				onChange={handleOnChangePickTime}
			/>
			<PostCategoryDialog
				onChange={handleThemaChange}
				name={'thema'}
				type={'thema'}
				title='테마'
				value={selectedThema}
				open={themeDialog}
				onClose={() => setThemeDialog(false)}
				data={themaData.map((thema) => ({ id: thema.id, name: thema.name }))}
			/>
			<PostCategoryDialog
				onChange={handleCategoryChange}
				name='category'
				title='카테고리'
				value={shop.category_id}
				type={'category'}
				open={categoryDialog}
				onClose={() => setCategoryDialog(false)}
				data={categoryData}
			/>
			<TagDialog
				onChange={handleTagChange}
				name='tag_ids'
				title='해시태그'
				type={'tag_ids'}
				open={tagDialog}
				onClose={() => setTagDialog(false)}
				data={tagData}
			/>
			<LocationDialog
				onSubmit={handleChangeLocation}
				open={locationDialog}
				onClose={() => setLocationDialog(false)}
			/>
			<StationDialog
				onSubmit={handleChangeStation}
				open={stationDialog}
				onClose={() => setStationDialog(false)}
			/>
		</div>
	)
}
