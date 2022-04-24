import React, {useState,useEffect, Fragment} from 'react'
import {database} from '../firebaseauth'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';


function Posts({userData}) {
    const [posts,setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };

    useEffect(() => {
         let parr = []
         const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
             parr = []
             querySnapshot.forEach((doc)=>{
             let data  = {...doc.data(),postId:doc.id}
             parr.push(data)
         })
            setPosts(parr)
     })
        return unsub
    }, []);


    const callback = (enteries)=>{
      enteries.forEach((entry)=>{
          let ele = entry.target.childNodes[0]
          console.log(ele)
          ele.play().then(()=>{
              if(!ele.paused && !entry.isIntersecting){
                  ele.pause()
              }
          })
      })
  }
 let observer = new IntersectionObserver(callback, {threshold: 0.6});
    useEffect(() => {
      const elements = document.querySelectorAll(".videos")
      elements.forEach((elem)=>{
          observer.observe(elem);
      })
      return()=>{
        observer.disconnect();
      }
    },[posts]);
  return (
    <div>

        {
            posts==null || userData ==null ? <CircularProgress /> :
            <div className='video-container'>
                {
                  posts.map((post,index)=>(
                     <div key={index}>
                        <div className='videos'>
                          <Video src={post.PUrl}/>
                           <div className='fa' style={{display:"flex"}}>
                           <Avatar src={userData.profileUrl} />
                           <h4>{userData.fullName}</h4>
                           </div>
                           <Like userData={userData} postData={post}/>

                           <ChatBubbleIcon className='chat-styling' onClick={()=>handleClickOpen(post.pId)}/>
                           <Dialog
                            open={open==post.pId}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth={true}
                            maxWidth='md'
                            >
                              <div className='modal-container'>
                                <div className='video-modal'>
                                <video autoPlay={true} muted="muted" controls>
                                  <source src={post.PUrl}/>
                                </video>
                                </div>
                                <div className='comment-modal'>
                                   <Card className='card1' style={{padding:'1rem'}}>
                                    <Comments postData={post}/>
                                   </Card>

                                   <Card  variant='outlined' className='card2'>
                                    <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'':`Liked by ${post.likes.length} users`}</Typography>
                                    <div style={{display:'flex'}}>
                                    <Like2 postData={post} userData={userData} style={{display:'flex',alignItems:'center',justifyContent:'center'}}/>
                                    <AddComment postData={post} userData={userData}/>
                                    </div>
                                     </Card>
                                </div>
                              </div>
                          </Dialog>
                        </div>
                      </div>
                  ))
                }
            
            </div>
        }

    </div>
  )
}

export default Posts