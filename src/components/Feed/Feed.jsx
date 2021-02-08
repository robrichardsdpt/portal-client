import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import Moment from 'react-moment'
import './feed.styles.scss'
import CreatePost from '../CreatePost/CreatePost.jsx'
import noProfileImage from '../../pages/UserProfile/no-photo-avail.jpg'

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      params: {
        recipient: 'all',
        owner: 'all'
      }
    })
      .then((res) => setPosts(res.data.posts))
  }, [])

  const postsJSX = posts.map(post => {
    return (
      <div className='recognition-card' key={post._id}>
        <div className='recognition-card-header'>
          <Moment format="MMMM Do YYYY">{post.createdAt}</Moment>
          <div>
            To:
            {!post.recipient.profileImage ? <img src={noProfileImage} alt="image" className="profile-image-thumbnail"/> : <img src={post.recipient.profileImage} alt="image" className="profile-image-thumbnail"/>}
            {post.recipient.firstName} {post.recipient.lastName}
          </div>
        </div>
        <div className='recognition-card-text'>
          {post.text}
          <div className='recognition-card-owner'>
            -{`${post.owner.firstName} ${post.owner.lastName}`}  {!post.owner.profileImage ? <img src={noProfileImage} alt="image" className="profile-image-thumbnail"/> : <img src={post.owner.profileImage} alt="image" className="profile-image-thumbnail"/>}
          </div>
        </div>
      </div>
    )
  })
  return (
    <div>
      <div className='feed-header'>
        <div className='user-information'>
          <div className='image-holder'>
            {!user.profileImage ? <img src={noProfileImage} alt="image" className="profile-image-bigger"/> : <img src={user.profileImage} alt="image" className="profile-image-bigger"/>}
          </div>
          {user.firstName} {user.lastName} <br/>
          {user.role}
        </div>
        <CreatePost user={user}/>
      </div>
      {postsJSX}
    </div>
  )
}

export default Feed
