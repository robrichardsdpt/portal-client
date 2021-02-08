import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import EmojiTextArea from '../EmojiPicker/EmojiTextArea'
import './create-post.stylings.scss'

const CreatePost = ({ user }) => {
  const [newPost, setNewPost] = useState({})
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  console.log(text)
  const handleContentChange = (text) => {
    setNewPost((prevPost) => {
      const updatedPost = { text: text }
      const editedPost = Object.assign({}, prevPost, updatedPost)
      return editedPost
    })
    console.log(newPost)
  }

  const handleChange = (event) => {
    event.persist()
    setNewPost((prevPost) => {
      const updatedPost = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevPost, updatedPost)
      return editedPost
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      url: `${apiUrl}/posts/`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: {
        post: newPost
      }
    })
      .then(() => setNewPost({}))
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/users/`,
      method: 'GET'
    })
      .then((res) => setUsers(res.data.users))
  }, [])

  const userOptionsJsx = users.map(userObj => {
    if (userObj._id !== user._id) {
      return <option key={userObj._id} id={userObj._id} value={userObj._id}>{`${userObj.firstName} ${userObj.lastName}`}</option>
    }
  })
  return (
    <div className='create-post-container'>
      Recognize someone <br/>
      <form id='create-post' onSubmit={handleSubmit}>
        <select className='post-recipient' name='recipient' defaultValue={'DEFAULT'} onChange={handleChange}>
          <option value='DEFAULT' disabled hidden>Choose person to recognize!</option>
          {userOptionsJsx}
        </select>
        <EmojiTextArea
          setText= {setText}
          className="create-message-textarea"
          name="content"
          placeholder=""
          editValue= {newPost.text}
          handleChange = {handleContentChange}
        />
        <button>Recognize them!</button>
      </form>
    </div>
  )
}

export default CreatePost
