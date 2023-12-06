import { useEffect, RefObject } from 'react'

export default function useClickOutside(
	ref: RefObject<HTMLElement>,
	action?: () => void,
) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				action && action()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, action])
}
