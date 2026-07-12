import React, { useRef } from 'react'
import Friend from './Friend'
import useGetConversation from '../../../../hooks/useGetConversation'
import useConversation from '../../../../store/useConversation'

function Friends() {
  const {loading,conversation} = useGetConversation()
  
  const {setSelectedConversation} = useConversation()
  // console.log(conversation)
  
  
  // const lastbox = useRef()
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     lastbox.current?.scrollIntoView({behavior: 'smooth'})
  //   },100)
  // },[setSelectedConversation])
  
  
  return (
    <div className='mt-3 w-full h-4/5 overflow-scroll shadow-xl no-scrollbar'>

      {conversation.map((con)=>(
        <Friend
          key={con._id}
          conversation={con}
        />
      ))}
      {loading?(
        <div className='w-full h-full flex justify-center items-center'>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ):null}
    </div>
  )
}

export default Friends