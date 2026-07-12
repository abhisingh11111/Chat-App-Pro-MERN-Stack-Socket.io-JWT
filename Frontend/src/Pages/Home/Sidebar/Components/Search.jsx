import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import toast from 'react-hot-toast'
import useConversation from '../../../../store/useConversation.js'
import useGetConversation from '../../../../hooks/useGetConversation.js';

function Search() {

  const [val,setval] = useState('')
  const {setSelectedConversation} = useConversation()
  const {conversation} = useGetConversation()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(val==='')
      return
    if(val.length <3)
      return toast.error('Too Short to Search')
    // console.log(val)
    // console.log(conversation)
    
    const con = conversation.find((c) => c.fullname.toLowerCase().includes(val.toLocaleLowerCase()))
    if(con){
      // console.log(con)
      setSelectedConversation(con)
      setval('')
    }
    else
      toast.error('No User Found')
  }
  return (
    <div className='flex items-center justify-between gap-2'>
      <form onSubmit={handleSubmit} className=' w-full flex items-center justify-between gap-2'>
        <label className="input w-4/6 hover:bg-blue-200 input-bordered flex items-center gap-2 bg-blue-100">
          <input type="text" value={val} onChange={(e)=>setval(e.target.value)} className="grow text-gray-700 placeholder:text-gray-700 " placeholder="Search"/>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
          </svg>
        </label>
        <button type='submit' className='btn btn-circle bg-blue-500 w-1/4 h-full text-white border-blue-900 hover:bg-blue-300 hover:text-blue-600 hover:border-2 hover:border-blue-600'>
        <IoSearch className='w-6 h-6'/>
        </button>
      </form>
      
    </div>
        
  )
}

export default Search