import React from 'react'
import useConversation from '../../../../store/useConversation'
import { useSocketContext } from '../../../../Context/SocketContext'

function Friend(con) {
  // console.log(con)
  const {selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id===con.conversation._id
  // const {online} = useSocketContext()
  // const on = online.includes(con._id)
  const { online } = useSocketContext();
	const isOnline = online.includes(con.conversation._id);
  

  return (
    <div>
        <div className={`flex gap-2 ${isSelected? 'bg-gradient-to-r from-violet-500 to-fuchsia-500':'bg-gradient-to-r from-cyan-500 to-blue-500'} shadow-xl items-center rounded p-4 py-1 h-14 mb-5 cursor-pointer`} onClick={()=>setSelectedConversation(con.conversation)}>
            <div className={`min-w-10 w-1/6 avatar ${isOnline?'online':''}`}>
                <div className = "rounded-full">
                    <img src={con.conversation.profilepic} />
                </div>
            </div>
            <h1 className='text-white font-bold text-sm ml-5'>{con.conversation.fullname}</h1>
        </div>
    </div>
  )
}

export default Friend