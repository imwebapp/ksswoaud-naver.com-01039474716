'use client'
import React, { useState, useEffect } from 'react'

const Countdown: React.FC<{ initialCountdown: number }> = ({
	initialCountdown,
}) => {
	const [countdown, setCountdown] = useState(initialCountdown)

	useEffect(() => {
		if (countdown > 0) {
			const intervalId = setInterval(() => {
				setCountdown(countdown - 1)
			}, 1000)

			return () => clearInterval(intervalId)
		}
	}, [countdown])

	const formattedCountdown = `${String(Math.floor(countdown / 60)).padStart(
		2,
		'0',
	)}:${String(countdown % 60).padStart(2, '0')}`

	return (
		<div>{countdown > 0 ? <p> ({formattedCountdown})</p> : <p>(00:00)</p>}</div>
	)
}

export default Countdown
