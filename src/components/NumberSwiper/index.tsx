import React, { useEffect, useRef, useState } from 'react'
import './number-swiper.css'

interface NumberSwiperProps {
	value?: any
	option?: any
	defaultValue?: string
	prefixIcon?: any
	onChange?: Function
}
let a = 0

const NumberSwiper: React.FC<NumberSwiperProps> = ({
	value,
	option,
	defaultValue = '00',
	onChange = (v: any) => {},
}) => {
	const [valueChange, setValueChange] = useState('0')
	const wraperRef = useRef(null)
	const [data, setData] = useState([null, ...option, null])

	const handleScroll = () => {
		const ol = wraperRef.current
		if (ol) {
			// @ts-ignore
			const olRect = ol.getBoundingClientRect()
			const olTop = olRect.top
			const olBottom = olRect.bottom
			// @ts-ignore
			const lis = ol.getElementsByTagName('li')
			const elementsInView = []
			const elemtOutView = []

			for (let i = 0; i < lis.length; i++) {
				const liRect = lis[i].getBoundingClientRect()
				if (liRect.top >= olTop && liRect.bottom <= olBottom) {
					elementsInView.push(lis[i])
				} else {
					elemtOutView.push(lis[i])
				}
				elementsInView.map((v) =>
					v.classList.remove('number-swiper-active-number'),
				)

				if (elementsInView.length === 3) {
					elementsInView[1].classList.add('number-swiper-active-number')
					setValueChange(elementsInView[1].dataset.value)
				}
			}
		}
	}

	const scrollToListItem = (defaultValue: string) => {
		const ol = wraperRef.current
		if (ol) {
			const targetValue = '02'
			// @ts-ignore
			const lis = ol.getElementsByTagName('li')

			for (let i = 0; i < lis.length; i++) {
				if (lis[i].getAttribute('data-value') === defaultValue) {
					const liRect = lis[i].getBoundingClientRect()
					// @ts-ignore
					ol.scrollTo({
						top:
							// @ts-ignore
							liRect.top + ol.scrollTop - ol.getBoundingClientRect().top - 30,
						behavior: 'smooth',
					})
					break
				}
			}
		}
	}

	useEffect(() => {
		scrollToListItem(defaultValue)
		setValueChange(defaultValue)
	}, [])

	useEffect(() => {
		onChange && onChange(valueChange)
	}, [valueChange])

	const ourRef = useRef<any>(null)
	const [isMouseDown, setIsMouseDown] = useState(false)
	const mouseCoords = useRef({
		startX: 0,
		startY: 0,
		scrollLeft: 0,
		scrollTop: 0,
	})
	const [isScrolling, setIsScrolling] = useState(false)
	const handleDragStart = (e: any) => {
		if (!ourRef.current) return
		const slider = ourRef.current.children[0]
		const startX = e.pageX - slider.offsetLeft
		const startY = e.pageY - slider.offsetTop
		const scrollLeft = slider.scrollLeft
		const scrollTop = slider.scrollTop
		mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
		setIsMouseDown(true)
		document.body.style.cursor = 'grabbing'
	}
	const handleDragEnd = () => {
		setIsMouseDown(false)
		if (!ourRef.current) return
		document.body.style.cursor = 'default'
	}
	const handleDrag = (e: any) => {
		if (!isMouseDown || !ourRef.current) return
		e.preventDefault()
		const slider = ourRef.current.children[0]
		const x = e.pageX - slider.offsetLeft
		const y = e.pageY - slider.offsetTop
		const walkX = (x - mouseCoords.current.startX) * 1.5
		const walkY = (y - mouseCoords.current.startY) * 1.5
		slider.scrollLeft = mouseCoords.current.scrollLeft - walkX
		slider.scrollTop = mouseCoords.current.scrollTop - walkY
	}

	useEffect(() => {
		document.addEventListener('mouseup', handleDragEnd)
		return () => document.removeEventListener('mouseup', handleDragEnd)
	}, [])

	return (
		<div
			id='myNumberSwiper'
			className='number-swiper'
			onScroll={handleScroll}
			ref={ourRef}
			onMouseDown={handleDragStart}
			onMouseUp={handleDragEnd}
			onMouseMove={handleDrag}
		>
			<ol
				ref={wraperRef}
				className='number-swiper-column h-[79px] '
				data-column={2}
				onScroll={handleScroll}
			>
				{data.map((v: any, id) => (
					<li key={id} data-value={v} className='select-none'>
						{v}
					</li>
				))}
			</ol>
		</div>
	)
}

export default NumberSwiper
