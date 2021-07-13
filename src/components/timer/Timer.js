import React,{useState, useEffect} from 'react'
import { interval } from 'rxjs'
import TimerDisplay from './TimerDisplay'
import style from './Timer.module.css'
import { useObservable } from '../../hooks/useObservable'

const interval$ = interval(1000)

const Timer = () => {

    const tick = useObservable(interval$)
	const [ elapsed, setElapsed ] = useState({ seconds: 0 })
	const [ running, setRunning ] = useState(false)
	const [ waiting, setWaiting ] = useState(false)

	const [ lastClick, setLastClick ] = useState(0)

	useEffect(() => {

		if (running && waiting) return
		if (running)
			setElapsed(curr => ({ ...curr, seconds: curr.seconds++ }))
		else if (!running && !waiting)
			setElapsed(curr => ({ ...curr, seconds: 0 }))

	}, [ tick, running, waiting ])

	const toggleWait = ({ timeStamp }) => {
		setLastClick(() => timeStamp)

		if (waiting) setWaiting(!waiting)
		else if (timeStamp - lastClick <= 300) //ms
			setWaiting(!waiting)
	}

	const toggleStartStop = () => {
		if (running && waiting) {
			setWaiting(false)
			setRunning(true)
		} else setRunning(!running)
	}

	const reset = () => {
		setElapsed(curr => ({ ...curr, seconds: 0 }))
		setWaiting(false)
	}

	return <section className={style.container}>
		<TimerDisplay seconds={elapsed.seconds} />
		<div className={style.btnContainer}>
			<button onClick={toggleStartStop}>
				{running && !waiting ? 'stop' : 'start'}
			</button>
			<button onClick={event => toggleWait(event)} disabled={!running} >
				{waiting ? 'resume' : 'wait'}
			</button>
			<button onClick={reset}>
				reset
			</button>
		</div>
	</section>
}

export default Timer
