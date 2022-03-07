import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function Feed() {
  const {logOut} = useContext(AuthContext)
  return (
    <>
    <h1>Welcome to reels feed...</h1>
    <Button onClick={logOut}>logout</Button>
    </>
  )
}

export default Feed