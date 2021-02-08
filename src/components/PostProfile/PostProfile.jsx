import React, { useState, useEffect } from 'react'
import './post-profile.styles.scss'
import Moment from 'react-moment'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import noProfileImage from '../../pages/UserProfile/no-photo-avail.jpg'

const PostProfile = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      params: {
        recipient: user._id,
        owner: 'all'
      }
    })
      .then((res) => setPosts(res.data.posts))
  }, [])
  console.log(posts)
  const postsJSX = posts.map(post => {
    return (
      <div key={post._id} className='post-individual'>
        <Moment format="MM-DD-YYYY">
          <div>
            {post.createdAt}
          </div>
        </Moment>
        <div>
          {post.text}
        </div>
        <div>
        -{`${post.owner.firstName} ${post.owner.lastName}`}  {!post.owner.profileImage ? <img src={noProfileImage} alt="image" className="profile-image-thumbnail"/> : <img src={post.owner.profileImage} alt="image" className="profile-image-thumbnail"/>}
        </div>
      </div>
    )
  })

  return (
    <div className='post-container'>
      <div className='post-container-heading'>
        You have been recognized {posts.length} times.
      </div>
      {posts ? postsJSX : 'You have no recognitions yet.'}
    </div>
  )
}

export default PostProfile
