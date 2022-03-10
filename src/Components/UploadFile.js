import React,{useState} from 'react'
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

function UploadFile(file) {
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const handleChange = async() =>{
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