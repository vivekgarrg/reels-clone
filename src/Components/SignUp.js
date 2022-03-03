import  React,{useState,useEffect} from 'react';
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
import insta from '../Assets/insta-logo.jpg'

export default function SignUp() {
    const useStyles= makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
            marginTop:"10px",
            paddingTop:'0px',
            paddingBottom:'0px',
            height:'8%'
        }
    })
    const classes = useStyles();

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
          {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin="dense" size="small"/>
          <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin="dense" size="small"/>
          <TextField id="outlined-basic" label="Full Name" variant="outlined"  fullWidth={true} margin="dense" size="small"/>
          <Button fullWidth={true} color="secondary" variant="outlined" component="label">
              UPLOAD PROFILE IMAGE
              <input type="file" accept='image/*' hidden/></Button>
        </CardContent>
        <CardActions>
            <Button fullWidth={true} variant="contained" color='primary'>SIgn Up</Button>
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
