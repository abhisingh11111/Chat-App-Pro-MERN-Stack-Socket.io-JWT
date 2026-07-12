import React, { useEffect } from 'react'
import useConversation from '../../../../store/useConversation'

function Header() {
  const {selectedConversation,setSelectedConversation} = useConversation()
  
  return (
    <div className='rounded-lg h-12 flex justify-start items-center p-5
    bg-gradient-to-r from-sky-500 to-indigo-500'>
        <div className="h-10 avatar">
            <div className = "rounded-full">
                <img src={selectedConversation.profilepic}/>
            </div>
        </div>
        <div>
            <h1 className='text-white font-bold ml-5'>{selectedConversation.fullname}</h1>
        </div>
    </div>
  )
}

export default Header