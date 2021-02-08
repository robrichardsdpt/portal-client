import React, { useEffect, useState } from 'react'
import './break-timer.styles.scss'

const BreakTimer = () => {
  const [ time, setTime ] = useState('')
  const [ prompt, setPrompt ] = useState('Work time!')
  const [ pause, setPause ] = useState(false)

  const startTimer = (duration) => {
    setPrompt('')
    let timer = duration
    let minutes
    let seconds
    const countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      setTime(minutes + ':' + seconds)
      if (--timer < 0 || pause) {
        clearInterval(countdown)
        setPrompt('Take a break!')
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer(1500)
  }, [])

  return (
    <div className='break-timer'>Time until your next break... <br/>
      <div className='timer'>
        {time}
      </div>
      <div>
        {prompt}
      </div>
      <div>
        {!time || time === '00:00' ? <button onClick={() => startTimer(1500)}>Pomodoro 25</button> : <button onClick={() => setTimeout(() => startTimer(0))}>Cancel</button>}{!time || time === '00:00' ? <button onClick={() => startTimer(3120)}>Pomodoro 52</button> : <button onClick={() => setPause(false)}>Pause Timer</button>}
      </div>
    </div>
  )
}

export default BreakTimer
