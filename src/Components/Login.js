import  React,{useEffect,useContext} from 'react';
import { AuthContext} from '../Context/AuthContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import './Login.css'
import insta from '../Assets/insta-logo.jpg'


export default function Login() {

  const store = useContext(AuthContext);

  console.log(store);
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
        document.title = "Login"
    })
  return (
     
      <div className='loginWrapper'>
          <div className='loginCard'>
          <Card variant='outline'>
      <CardActionArea>
        <CardContent>
            <div className='insta-logo'>
                <img src={insta} alt="insta-logo" width="200"></img>
            </div>
          <Typography className={classes.text1} variant='subtitle1'>
            Login to see photos and videos from your friends
          </Typography>
          {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin="dense" size="small"/>
          <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin="dense" size="small"/>
        </CardContent>
        <CardActions>
            <Button fullWidth={true} variant="contained" color='primary'>Login</Button>
        </CardActions>

        <CardContent>
        </CardContent>
      </CardActionArea>
    </Card>
    
    <Card variant='outlined' className={classes.card2} >
    <CardContent>
          <Typography className={classes.text1} variant='subtitle1'>
            Have an acount ? <Link to='/signup' style={{textDecoration:"none"}}>signup</Link>
          </Typography>
        </CardContent>
    </Card>
          </div>
      </div>
   
  );
}
