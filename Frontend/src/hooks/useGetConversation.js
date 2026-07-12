import React, { useEffect, useState } from 'react'

const useGetConversation = () => {
    const [loading,setLoading] = useState(false)

    const [conversation,setConversation] = useState([])

    useEffect(()=>{
        const getConversation = async()=>{
            setLoading(true)
            try {
                const res = await fetch('/api/user')
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                // console.log(data)
                setConversation(data)
                // console.log(conversation)
            } 
            catch (e) {
                toast.error(e.error)
            }
            finally{
                setLoading(false)
            }
        }
        getConversation()
    },[])
    // console.log(conversation)
    return {loading,conversation}
}

export default useGetConversation