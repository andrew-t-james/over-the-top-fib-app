import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState(null)
  const [values, setValues] = useState(null)
  const [index, setIndex] = useState('')

  async function getValues() {
    const values = await axios.get('/api/values/current')
    setValues(values.data)
  }

  async function getIndexes() {
    const seenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(seenIndexes.data)
  }

  useEffect(() => {
    let current = true;

    if(current) {
    }

    return () => current = false;
  }, [])

  function renderValues() {
    const entries = [];

    for(let key in values) {
      entries.push(
        <Fragment key={key}>
          For index {key} I calculated {values[key]}
        </Fragment>
      )
    }

    return entries
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
      <form>
        <label htmlFor="">Enter your index</label>
        <input onChange={e => setIndex(e.target.value)} type="text"/>
        <button>submit</button>
      </form>
      <h3>Indexes I have seen</h3>

      <h3>Values I have seen</h3>
    </div>
  )
}

export default Fib
