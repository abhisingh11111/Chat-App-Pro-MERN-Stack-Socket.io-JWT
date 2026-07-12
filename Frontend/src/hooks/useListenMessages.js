import React, { useEffect } from 'react'
import { useSocketContext } from '../Context/SocketContext'
import useConversation from '../store/useConversation'

const useListenMessages = () => {
  const {socket} = useSocketContext()
  const {message,setMessages} = useConversation()

  useEffect(()=>{
    socket?.on('newMessage',(newmessage)=>{
        setMessages([...message,newmessage]);
    })
    return ()=> socket?.off('newMessage')
  },[socket,message,setMessages])
}

export default useListenMessages