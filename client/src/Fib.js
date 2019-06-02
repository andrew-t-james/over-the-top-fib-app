import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState(null)
  const [values, setValues] = useState(null)
  const [indexes, setIndexes] = useState('')

  async function getValues() {
    const values = await axios.get('/api/values/current')
    setValues(values.data)
  }

  async function getIndexes() {
    const seenIndexes = await axios.get('/api/values/all')
    setIndexes(seenIndexes.data)
  }

  useEffect(() => {
    let current = true;

    if(current) {
    }

    return () => current = false;
  }, [])

  return (
    <div>
      Hello World
    </div>
  )
}

export default Fib
