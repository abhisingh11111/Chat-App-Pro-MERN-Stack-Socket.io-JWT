import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import useConversation from '../store/useConversation'

const userSend = () => {
    const [loading,setLoading] = useState(false)
    
    const {message,setMessage,selectedConversation} = useConversation()

    const send = async(message) =>{
        setLoading(true)
        try {
            const req = await fetch(`/api/message/send/${selectedConversation._id}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message})
            })
            const data = await req.json()
            // console.log(data)
            if(data.error)
                throw new Error(data.error)
            setMessage([...message,data])
            // console.log(data)
        } 
        catch (e) {
            // toast.error(e.error)
            // console.log(e.error)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,send}
}

export default userSend