import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  async function getValues() {
    const values = await axios.get('/api/values/current')
    console.log('values:', values)
    setValues(values.data)
  }

  async function getIndexes() {
    const seenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(seenIndexes.data)
  }

  useEffect(() => {
    let current = true;

    if (current) {
      getIndexes()
      getValues()
    }

    return () => current = false;
  }, [])

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <Fragment key={key}>
          For index {key} I calculated {values[key]}
          <br />
        </Fragment >
      )
    }

    return entries
  }

  function renderIndexes() {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await axios.post('/api/values', {
      index
    })
    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter your index</label>
        <input onChange={e => setIndex(e.target.value)} value={index} type="text" />
        <button>submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {renderIndexes()}
      <h3>Values I have seen</h3>
      {renderValues()}
    </div>
  )
}

export default Fib
