import React from 'react'
import style from './TimerDisplay.module.css'

const formatTime = seconds => {
	const hrs = ~~(seconds / 3600)
	const mins = ~~((seconds % 3600) / 60)
	const secs = ~~seconds % 60

	const checkIfLeadingZero = number => number < 10 ? `0${number}` : number

	return `${checkIfLeadingZero(hrs)}:${checkIfLeadingZero(mins)}:${checkIfLeadingZero(secs)}`
}

const TimerDisplay = ({seconds}) => {

    const time = formatTime(seconds)

    return (
        <div className={style.container}>
            <p>{time}</p>
        </div>
    )
}

export default TimerDisplay
