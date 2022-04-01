import  React,{useState,useEffect,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import './SignUp.css'
import insta from '../Assets/Feels.png'
import { AuthContext } from '../Context/AuthContext';
import { storage,database } from '../firebaseauth';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
    const useStyles= makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
          maxHeight:'10%',
          padding:"0px"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] =  useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
     const history = useHistory()
    const {singUp} = useContext(AuthContext);
    
    const handleClick = async() =>{
      if(file==null){
       setError("Please upload profile image first")
       setTimeout(()=>{
          setError('');
       },2000)
       return;
      }
      
      try{
          setError('')
          setLoading(true)
          let userObj = await singUp(email,password);
          let uid = userObj.user.uid;
          console.log(uid)

          const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
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
                database.users.doc(uid).set({
                  email:email,
                  userId:uid,
                  fullName:name,
                  profileUrl:url,
                  createdAt:database.getTimeStamp()
                })
              })
              setLoading(false);
                history.push('/')
          }
      }catch(err){
        setError(err)
        setTimeout(()=>{
           setError('');
        },2000)
      }

    }
  useEffect(()=>{
      document.title = "Sign Up"
  })
  return (
     
      <div className='singUpWrapper'>
          <div className='signUpCard'>
          <Card variant='outline'>
      <CardActionArea>
        <CardContent>
            <div className='insta-logo'>
                <img src={insta} alt="insta-logo" width="200"></img>
            </div>
          <Typography className={classes.text1} variant='subtitle1'>
            Sign up to see photos and videos from your friends
          </Typography>
          {error!='' && <Alert severity="error">{error}</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <TextField id="outlined-basic" label="Full Name" variant="outlined"  fullWidth={true} margin="dense" size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
          <Button fullWidth={true} color="secondary" variant="outlined" component="label" value={file} onChange={(e)=>setFile(e.target.files[0])}>
              UPLOAD PROFILE IMAGE
              <input type="file" accept='image/*' hidden /></Button>
        </CardContent>
        <CardActions>
            <Button fullWidth={true} variant="contained" color='primary' disabled={loading} onClick={handleClick}>SIgn Up</Button>
        </CardActions>

        <CardContent>
          <Typography className={classes.text1} variant='subtitle1'>
            By signing up, you agree to our Terms, Conditions and Cookies policy
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
    <Card variant='outlined' className={classes.card2} >
    <CardContent>
          <Typography className={classes.text1} variant='subtitle1'>
            Have an acount ? <Link to='/login' style={{textDecoration:"none"}}>Login</Link>
          </Typography>
        </CardContent>
    </Card>
          </div>
      </div>
   
  );
}
