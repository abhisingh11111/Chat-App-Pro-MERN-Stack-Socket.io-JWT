import React, { useEffect } from 'react'
import Header from './Components/Header'
import ChatZone from './Components/ChatZone'
import InputField from './Components/InputField'
import { IoChatbubblesOutline } from "react-icons/io5";
import useConversation from '../../../store/useConversation';
import { useAuthContext } from '../../../Context/AuthContext';
function Chats() {
  // const noChat = false;
  const {selectedConversation,setSelectedConversation} = useConversation()
  
  useEffect(()=>{
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])
  
  return (
    
    <div className='h-full'>
      {!selectedConversation ? (<NoChats/>):(
        <div className='h-full'>
          <Header/>
          <ChatZone className="h-full"/>
          <InputField className=""/>  
        </div>)}
      
    </div>
  )
}

export default Chats

function NoChats(){
  const {authUser} = useAuthContext()
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <IoChatbubblesOutline className='w-16 h-16 text-white'/>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-serif flex flex-col items-center gap-2'>
        <p >Welcome {authUser.username}!!</p>
        <p>Let's Chat </p>
      </div>
    </div>
  )
}