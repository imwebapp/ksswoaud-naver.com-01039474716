import { useEffect, useState } from 'react'
import UserApi from '@/src/services/User'
import { isEmpty } from 'lodash'

export const useCheckAccountExit = () => {
	const [loading, setLoading] = useState(false)
	const [field, setField] = useState<{ error: null } | { error: boolean }>({
		error: null,
	})

	const [data, setData] = useState({})

	useEffect(() => {
		setLoading(true)

		!isEmpty(data) &&
			UserApi.GET_LIST_USER({
				fields: ['$all'],
				filter: {
					...data,
				},
			})
				.then((e) => {
					const res = e.results.objects.rows
					res.length !== 0
						? setField({ error: true })
						: setField({ error: false })
				})
				.catch(() => {
					setField({ error: true })
				})
				.finally(() => {
					setLoading(false)
				})
	}, [data])

	const checkAccountExit = (f: {}) => {
		f && setData(f)
	}

	return {
		loading,
		checkAccountExit,
		field,
	}
}
