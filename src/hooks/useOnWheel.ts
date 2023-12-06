import { debounce } from 'lodash'
import { useState } from 'react'

const useOnWheel = (delay? : number) => {
	const [initialTouchY, setInitialTouchY] = useState<number | null>(null)

	const handleTouchStart = (e: React.TouchEvent) => {
		setInitialTouchY(e.touches[0].clientY)
	}

	const handleTouchMove = debounce((e: React.TouchEvent, callback) => {
		if (initialTouchY === null) {
			return
		}
		const deltaY = e.touches[0].clientY - initialTouchY

		callback(deltaY)
	}, delay ?? 5)

	const handleTouchEnd = () => {
		setInitialTouchY(null)
	}

	return {
		handleTouchMove,
		handleTouchStart,
		handleTouchEnd,
	}
}

export default useOnWheel
