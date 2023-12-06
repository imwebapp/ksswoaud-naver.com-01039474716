import { useSelector } from 'react-redux'
import { RootState } from '../stores'
import { find, get } from 'lodash'
import { SETTING_TYPE } from '../constants'

const useSetting = () => {
	const setting = useSelector((state: RootState) => state.setting.data)

	const getSocialLink = (type: string) => {
		const value = get(find(setting, ['field', type]), 'value')
		return value
	}
	return { getSocialLink }
}

export default useSetting
