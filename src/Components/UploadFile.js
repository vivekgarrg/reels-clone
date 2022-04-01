import React,{useState} from 'react'
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database,storage } from '../firebaseauth';


function UploadFile(props) {
    console.log(props);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const handleChange = async(file) =>{
        if(file==null){
            setError("Please select a file first")
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
        if(file.size/(1024*1024)>100){
            setError('This video is very big')
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }

        let uid = uuidv4()
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
          uploadTask.on(`state_changed`,fn1,fn2,fn3);
          function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            console.log(`upload is ${progress} done`);
          }
          function fn2(error){
            console.log('error is occured ')
            setError(error)
            setTimeout(()=>{
               setError('');
            },2000)
            setLoading(false);
            return;
          }
          function fn3(){
              uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);
               let obj= {
                   likes: [],
                   comments: [],
                   pId: uid,
                   PUrl: url,
                   uName: props.user.fullName,
                   uProfile : props.user.profileUrl,
                   userId : props.user.userId,
                   createdAt : database.getTimeStamp()
               }
               database.posts.add(obj).then( async(ref)=>{
                   let res = await database.users.doc(props.user.userId).update({
                       postIds : props.user.postIds != null ? [...props.user.postIds,ref.id] : [ref.id]
                   })
               }).then(()=>{
                   setLoading(false)
               }).catch((err)=>{
                   setError(err)
               })
              })
              setLoading(false);
              setTimeout(()=>{
                  setError('')
              })
              setLoading(false)
          }
    }

  return (
    error!=''?<Alert severity="error">{error}</Alert>:
   <>
   <input type="file" accept="video/*" onChange={(e)=>handleChange(e.target.files[0])} id='upload-input' style={{display:'none'}}/>
   <label htmlFor='upload-input'>
       <Button
       variant='outlined'
       color='secondary'
       component="span"
       disabled={loading}
       >
           
           Upload Video</Button>
           {loading && <LinearProgress color="secondary" />}
   </label>
     
   </>
  )
}

export default UploadFile