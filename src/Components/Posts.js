import React, {useState,useEffect, Fragment} from 'react'
import {database} from '../firebaseauth'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';

function Posts({userData}) {
    const [posts,setPosts] = useState(null);

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