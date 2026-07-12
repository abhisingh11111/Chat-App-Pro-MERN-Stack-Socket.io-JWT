import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import userSend from '../../../../hooks/userSend';
import useConversation from '../../../../store/useConversation';

function InputField() {
  const {loading,send} = userSend()
  const [message,setMessage] = useState('')

  const {setInpu,inpu} = useConversation()
// const {loading, message}  = userRecieve()
  async function handleSubmit (e) {
    e.preventDefault()
    // console.log(message)
    if(message!=='')
      await send(message)
    setMessage('')
    setInpu(message)
    // console.log("inpu: ",inpu)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <input
            type="text"
            placeholder="Message" value={message} 
            onChange={(e)=>setMessage(e.target.value)}
            className="input text-black input-bordered input-info w-full bg-gradient-to-r from-sky-200 to-indigo-200" />
        <button className='w-14 h-12 flex items-center bg-blue-400 rounded-full justify-center ml-5 text-white border-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-2 hover:border-blue-600'>
            {loading ? <span className="loading loading-ring loading-lg"></span> : <IoSend className='w-8 h-8'/>}
        </button>
      </div>
    </form>
    
  )
}

export default InputField
