import React,{useEffect,useState} from 'react';
import { auth } from '../firebaseauth';


export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);


    //Global area login function
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    //Global area sing up function
    function singUp(email,password){
       return auth.createUserWithEmailAndPassword(email,password);
    }

    //Global area singOut function
    function logOut(){
        return auth.signOut();
    }


    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsub();
        }
    },[])

    const store ={
        user,
        singUp,
        login,
        logOut
    }

    return(
        <AuthContext.Provider value={store}>
           {!loading && children}
        </AuthContext.Provider>
    )
}