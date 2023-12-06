import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import './number-swiper.css'

interface UnitSwiperPicker {
	value?: any
	option?: any
	defaultValue?: string
	prefixIcon?: any
	onChange?: Function
	format?: any
}
let a = 0

const UnitSwiperPicker: React.FC<UnitSwiperPicker> = ({
	value,
	option,
	defaultValue = '00',
	onChange = (v: any) => {},
	format,
}) => {
	const [valueChange, setValueChange] = useState('0')
	const wraperRef = useRef(null)
	const [data, setData] = useState([null, null, ...option, null, null])

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
				elementsInView.map((v) => {
					v.classList.remove('number-swiper-active-number1')
					v.classList.remove('number-swiper-active-number2')
					v.classList.remove('!text-[#C7C9D9]')
				})
				elemtOutView.map((v) =>
					v.classList.add('number-swiper-no-active-number1'),
				)

				if (elementsInView.length === 5) {
					elementsInView[2].classList.add('number-swiper-active-number1')
					elementsInView[1].classList.add('!text-[#C7C9D9]')
					elementsInView[3].classList.add('!text-[#C7C9D9]')

					elementsInView.map((v) =>
						v.classList.remove('number-swiper-no-active-number1'),
					)

					setValueChange(elementsInView[2].dataset.value)
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
					console.log(
						"lis[i].getAttribute('data-value') === defaultValue",
						lis[i].getAttribute('data-value') === defaultValue,
					)
					const liRect = lis[i].getBoundingClientRect()
					// @ts-ignore
					ol.scrollTo({
						top:
							// @ts-ignore
							liRect.top + ol.scrollTop - ol.getBoundingClientRect().top,
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
		console.log(walkX, walkY)
	}

	return (
		<div
			id='unit-swiper'
			className='number-swiper1 unit-swiper relative'
			ref={ourRef}
			onMouseDown={handleDragStart}
			onMouseUp={handleDragEnd}
			onMouseMove={handleDrag}
		>
			<ol
				ref={wraperRef}
				className='number-swiper-column1 h-[234px] '
				data-column={2}
				onScroll={handleScroll}
			>
				{data.map((v: any, id) => (
					<li
						key={id}
						data-value={v}
						className='py-[10px]  w-[262px] relative z-10'
					>
						<p
							className={`absolute bottom-[20%] lef-[50%] duration-[0.4s] ${
								`${format(valueChange)}` === `${format(v)}`
									? 'text-3xl duration-[0.4s]'
									: ''
							}`}
						>
							{format(v)}
						</p>
					</li>
				))}
				<div
					className='absolute w-[312px] h-[54px] number-swiper-active-number1 
          bottom-[40%] left-0 border rounded-[24px] z-0'
				></div>
			</ol>
		</div>
	)
}

export default memo(UnitSwiperPicker)
