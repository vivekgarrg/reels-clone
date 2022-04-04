import React from 'react'
import './Video.css'

function Video(props) {

    const handleClick = (e) =>{
          e.preventDefault();
          e.target.muted = !e.target.muted
        //   e.target.muted != e.target.muted
    }
  return (
     <video src={props.src} muted="muted"  className='videos-styling' onClick={handleClick} controls>
         
     </video>
    
  )
}

export default Video