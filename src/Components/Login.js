import  React,{useEffect,useContext, useState} from 'react';
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
import insta from '../Assets/Feels.png'
import { useHistory } from 'react-router-dom';


export default function Login() {

  const store = useContext(AuthContext);
  const [user,setuser] = useState('');
  
  console.log(store);
    const useStyles= makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
          maxHeight:'15%',
          padding:"0px"
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const {login} = useContext(AuthContext)

    const handleClick = async() =>{
  
      try{
        setError('')
        setLoading(true)
        let res = await login(email,password);
        setLoading(false)
        history.push('/')
      }catch(error){
        setError(error)
        setTimeout(()=>{
          setError(' ')
        },2000);
        setLoading(false)
      }
    

    }

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
          {error!='' && <Alert severity="error">{error}</Alert>}
          <TextField id="outlined-basic" label="Email" variant="outlined"  fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField id="outlined-basic" label="Password" variant="outlined"  fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </CardContent>
        <CardActions>
          <Button fullWidth={true} variant="contained" color='primary' onClick={handleClick} disabled={loading}>Login</Button>
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
