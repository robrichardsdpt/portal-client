import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

const GratitudeGiven = ({ user }) => {
  const [gratitudes, setGratitudes] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      params: {
        owner: user._id,
        recipient: 'all'
      }
    })
      .then((res) => setGratitudes(res.data.posts))
  }, [])

  console.log(gratitudes)
  console.log(user)
  return (
    <div>Gratitude given:  {gratitudes.length}</div>
  )
}

export default GratitudeGiven
