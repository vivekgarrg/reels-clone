import React,{useEffect} from 'react'
import vid1 from '../videos/vid1.mp4';

function Ioa() {
     const callback = (enteries)=>{
         enteries.forEach((entry)=>{
             let ele = entry.target.childNodes[0]
             console.log(ele)
             ele.play().then(()=>{
                 if(!ele.paused && !entry.isIntersecting){
                     ele.pause()
                 }
             })
         })
     }
    let observer = new IntersectionObserver(callback, {threshold: 0.6});
    useEffect(() => {
      const elements = document.querySelectorAll(".videos")
      elements.forEach((elem)=>{
          observer.observe(elem);
      })
    });
  return (
   <div className='video-container'>
       <div className='videos'>
            <video src={vid1} muted="muted" style={{height:'85vh'}}></video>
       </div>
       <div className='videos'>
            <video src={vid1} muted="muted" style={{height:'85vh'}}></video>
       </div>
       <div className='videos'>
            <video src={vid1} muted="muted" style={{height:'85vh'}}></video>
       </div>

   </div>
  )
}

export default Ioa