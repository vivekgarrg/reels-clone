import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebaseauth'
import UploadFile from './UploadFile'

function Feed() {
  const {user,logOut} = useContext(AuthContext)
  const [userData,setUserData] = useState('')
  useEffect(()=>{
     const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
       setUserData(snapshot.data())
     })
     return ()=> {unsub()}
  },[user])
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div className='comp' style={{width:'50%'}}>
    <h1>Welcome to reels feed...</h1>
    <Button onClick={logOut}>logout</Button>
    
    </div>
    <UploadFile user={userData}/> 
    </div>
  )
}

export default Feed