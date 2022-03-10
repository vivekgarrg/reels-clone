import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile'

function Feed() {
  const {logOut} = useContext(AuthContext)
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div className='comp' style={{width:'50%'}}>
    <h1>Welcome to reels feed...</h1>
    <Button onClick={logOut}>logout</Button>
    
    </div>
    <UploadFile/> 
    </div>
  )
}

export default Feed