import React, { useEffect, useState, useRef } from 'react'
import useLongPress from "./useLongPress";

const formatTime = (timer) => {
  const getMilliSeconds = `0${(timer % 100)}`.slice(-2)
  const seconds = `${Math.floor(timer / 100)}`
  const getSeconds = `0${(seconds % 60)}`.slice(-2)
  const minutes = `${Math.floor(seconds / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(minutes / 3600)}`.slice(-2)

  return {
    getMilliSeconds,
    getHours,
    getMinutes,
    getSeconds
  }
}

const useCounter = (value = 0) => {
  useEffect(() => {
    setCounter(value)
  }, [value])

  const [counter, setCounter] = useState(value)
  const [isRunning, setIsRunning] = useState(false)
  const interval = useRef(null)
  const defaultOptions = {
    delay: 10,
  };

  const handleStart = () => {
    setIsRunning(true)
    interval.current = setInterval(() => {
      setCounter((counter) => +counter + 1)
    }, 10);
  }

  const handlePause = () => {
    setIsRunning(false)
    clearInterval(interval.current)
  }

  const handleReset = () => {
    setIsRunning(false)
    clearInterval(interval.current)
    setCounter(0)
  }

  const minusLongPress = () => {
    if (counter > 0) {
      setCounter(counter => counter > 0 && counter - 1)
    } else {
      setCounter(0)
    }
  };

  const plusLongPress = () => {
    setCounter(counter => counter + 1)
  };

  const handleMinus = useLongPress(minusLongPress, defaultOptions);
  const handlePlus = useLongPress(plusLongPress, defaultOptions);

  return {
    counter,
    isRunning,
    handleStart,
    handleReset,
    handlePause,
    handleMinus,
    handlePlus
  }
}


export { useCounter, formatTime }
