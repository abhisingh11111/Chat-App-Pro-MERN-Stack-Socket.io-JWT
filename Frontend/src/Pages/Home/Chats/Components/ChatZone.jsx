import React, { useEffect, useRef } from 'react'
import Messages from './Messages'
import userRecieve from '../../../../hooks/userRecieve'
import useListenMessages from '../../../../hooks/useListenMessages'

function ChatZone() {
  const {loading, message}  = userRecieve()
  // console.log(message)
  useListenMessages()
  const lastbox = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastbox.current?.scrollIntoView({behavior: 'smooth'})
    },100)
  },[message])

  
  if(!message.length){
    return (
      <div className='shadow-xl my-3 h-4/5 flex justify-center items-center text-white overflow-y-scroll no-scrollbar'>
        <h1>Start Chatting</h1>
      </div>
    )
  }
  return (
    <div className='shadow-xl my-3 h-4/5 overflow-y-scroll no-scrollbar'>
        {/* {loading?(
          <div className='h-full w-full flex justify-center text-white items-center '>
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
            
          </div>
          ):( */}
            {message.map((mess)=>(
              <div key={mess._id} ref={lastbox}>
                <Messages message={mess}/>
              </div>
            ))}
          {/* )} */}
    </div>
  )
}

export default ChatZone