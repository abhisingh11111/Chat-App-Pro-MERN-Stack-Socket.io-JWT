import React, { useEffect, useState } from 'react'
import useConversation from '../store/useConversation'
import toast from 'react-hot-toast'


const userRecieve = () => {
  const [loading,setLoading] = useState(false)

  const {message,setMessages,selectedConversation,inpu} = useConversation()

  useEffect(()=>{
    const recieve = async() =>{
        setLoading(true)
        try{
            const req = await fetch(`/api/message/${selectedConversation._id}`)
            const data = await req.json()
            if(data.error)
                throw new Error(data.error)
            setMessages(data)
            // console.log("data: ",data)
            // console.log("messages: ",message)
        }
        catch(e){
            toast.error(e.error)
        }
        finally{
            setLoading(false)
        }
    }

    if(selectedConversation?._id)
        recieve()
  },[selectedConversation?._id,setMessages,inpu])

  return {loading,message}
}

export default userRecieve