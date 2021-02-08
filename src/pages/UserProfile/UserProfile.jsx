import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import Quote from '../../components/Quote/Quote'
import Meditation from '../../components/Meditation/Meditation'
import noProfileImage from './no-photo-avail.jpg'
import Modal from 'react-bootstrap/Modal'
import './user-profile.styles.scss'
import S3FileUpload from 'react-s3'
import PostProfile from '../../components/PostProfile/PostProfile.jsx'
import CreatePost from '../../components/CreatePost/CreatePost'
import GratitudeGiven from '../../components/GratitudeGiven/GratitudeGiven'
import ChangePassword from '../../components/ChangePassword/ChangePassword.js'

const Profile = ({ user }) => {
  const [meditations, setMeditations] = useState([])
  const [getImage, setGetImage] = useState()
  const [show, setShow] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChangePasswordShow = () => setShowChangePassword(false)

  const secret = process.env.REACT_APP_SECRET_KEY
  const access = process.env.REACT_APP_ACCESS_KEY

  const config = {
    bucketName: 'employee-portal-profile-image',
    region: 'us-east-2',
    secretAccessKey: secret,
    accessKeyId: access
  }

  const onFileChange = event => {
    if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/gif' || event.target.files[0].type === 'image/png') {
      S3FileUpload.uploadFile(event.target.files[0], config)
        .then((data) => {
          setGetImage(data.location)
          return axios({
            url: `${apiUrl}/users/${user._id}`,
            method: 'PATCH',
            headers: {
              'Authorization': `Token token=${user.token}`
            },
            data: {
              profileImage: data.location
            }
          })
        })
        .catch((err) => {
          alert(err)
        })
    } else {
      alert('Please choose an image file')
    }
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/meditations/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      }
    })
      .then((res) => setMeditations(res.data.meditations))
  }, []
  )
  return (
    <div className='profile-container'>
      <div className='profile-info'>
        <div className='profile-image'>
          {!user.profileImage && !getImage ? <img src={noProfileImage} alt="image" className="profile-image" onClick={() => handleShow()}/> : ' '}
          {user.profileImage && !getImage ? <img src={user.profileImage} alt="image" className="profile-image" onClick={() => handleShow()}/> : ' '}
          {user.profileImage && getImage ? <img src={getImage} alt="image" className="profile-image" onClick={() => handleShow()}/> : ' '}
        </div>
        <div className='profile-data'>
          {user.firstName} {user.lastName}<br/>
          {user.email} <br/>
          {user.role} <br/>
          Meditated: {meditations.length} times. <br/>
          <GratitudeGiven user={user}/>
          <div className='change-password-link' onClick={() => setShowChangePassword(true)}>Change Password</div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Pic</Modal.Title>
        </Modal.Header>
        <div className='image-holder'>
          {!user.profileImage && !getImage ? <img src={noProfileImage} alt="image" className="profile-image-bigger"/> : ' '}
          {user.profileImage && !getImage ? <img src={user.profileImage} alt="image" className="profile-image-bigger"/> : ' '}
          {user.profileImage && getImage ? <img src={getImage} alt="image" className="profile-image-bigger"/> : ' '}
        </div>
        <Modal.Footer>
          <form id='image-upload'>
            <input type="file" onChange={onFileChange} />
          </form>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
      <Quote/>
      <div className='profile-main'>
        <div className='left-container'>
          <Meditation user={user}/>
        </div>
        <div className='right-container'>
          <CreatePost user={user}/>
          <PostProfile user={user}/>
        </div>
      </div>
      <ChangePassword user={user} setShow={handleChangePasswordShow} show={showChangePassword}/>
    </div>
  )
}

export default Profile
