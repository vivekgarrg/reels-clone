import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { AuthContext } from '../Context/AuthContext'
import { Route } from 'react-router-dom'

function PrivateRoute({component:Component,...rest}) {
    const {user} = useContext(AuthContext)

  return (
    <Route {...rest} render={props=>{
        return user?<Component{...props}/>: <Redirect to="/login"/>
    }}/>
  )
}

export default PrivateRoute