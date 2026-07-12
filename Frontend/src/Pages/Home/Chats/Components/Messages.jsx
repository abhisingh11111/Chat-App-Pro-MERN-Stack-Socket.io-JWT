import React from 'react'
import useConversation from '../../../../store/useConversation'
import { useAuthContext } from '../../../../Context/AuthContext'
// import {extractTime} from '../../utils'

function Messages(mess) {
    const formatTime = extractTime(mess.message.createdAt)
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()
    
    function extractTime(e){
        const d = new Date(e)
        const h = padZero(d.getHours());
        const m = padZero(d.getMinutes());
        return `${h}:${m}`
    }

    function padZero(n){
        return n.toString().padStart(2,'0');
    }

    const me = mess.message.senderId===authUser._id
    // if(me){
    //     console.log("mess: ",mess.message.message)
    // }
  return (
    <div>
        <div className={`chat ${me?'chat-end':'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={me?authUser.profilepic:selectedConversation.profilepic} />
                </div>
            </div>
            <div className="chat-footer">
                <time className="text-sm">{formatTime}</time>
            </div>
            <div className={`chat-bubble ${me? 'bg-indigo-500':'bg-sky-500'} bg-gradient-to-r from-sky-500 to-indigo-500 text-white`}>{mess.message.message}
            </div>
        </div>
        
    </div>
  )
}

export default Messages