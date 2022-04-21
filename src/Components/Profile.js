import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import { database } from '../firebaseauth';
import {CircularProgress} from '@mui/material';
import Navbar from './NavBar';
import Typography from '@mui/material/Typography';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';

function Profile() {
    const {id} = useParams();
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useState(null)
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };


    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data())
        })
    },[id])

    useEffect(async()=>{
        if(userData!=null){
        let parr = []
        for(let i=0; i<userData.postIds.length; i++){
           let postData = await database.posts.doc(userData.postIds[i]).get()
           parr.push(postData.data())

        }
        setPosts(parr)
    }
    })
  return (
    <>
    {
          posts==null || userData==null ? <CircularProgress/> :
          <>
          <Navbar userData = {userData}/>
          <div className='spacer'></div>
          <div className='container'>
              <div className='upper-part'>
                  <div className='profile-img'>
                      <img src={userData.profileUrl}/>
                  </div>
                  <div className='info'>
                     <Typography variant='h5'>
                        Email: {userData.email}
                     </Typography>
                     
                     <Typography variant='h6'>
                        Posts: {userData.postIds.length}
                     </Typography>
                  </div>
              </div>
              <hr style={{marginTop:"3rem", marginBottom:"3rem"}}/>
              <div className='profile-videos'>
                {
                  posts.map((post,index)=>(
                     <div key={index}>
                        <div className='videos'>
                         
                                <video autoPlay={true} muted="muted" controls>
                                  <source src={post.PUrl}/>
                                </video>
                                </div>
                              </div>
                        
                    
                  ))
                }
            
            </div>
          </div>
          </>
    }
    </>
  )
}

export default Profile