import React,{useState, useEffect} from 'react'
import TimerDisplay from './TimerDisplay'
import style from './Timer.module.css'
const Timer = () => {

    const [ elapsed, setElapsed ] = useState({ seconds: 0 })
	const [ running, setRunning ] = useState(false)
	const [ waiting, setWaiting ] = useState(false)

    const toggleStartStop = ()=>{
        if (running && waiting) {
            setWaiting(false)
			setRunning(true)
        } else setRunning(!running)
    }
    useEffect(()=>{
        if(running&& waiting)return
    })
    return (
        <div className={style.container}>
            <TimerDisplay seconds={elapsed.seconds}/>
            <div className={style.btnContainer}>
                <button>
                    start
                </button>
                <button>
                    resume
                </button>
                <button>
                    reset
                </button>
            </div>
        </div>
    )
}

export default Timer
