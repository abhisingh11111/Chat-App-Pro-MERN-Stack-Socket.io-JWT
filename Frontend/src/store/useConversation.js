import {create} from 'zustand'

const useConversation = create((set)=>({
    selectedConversation: null,
    setSelectedConversation:(selectedConversation) => set({selectedConversation}),
    message:[],
    setMessages:(message)=>set({message}),
    inpu:null,
    setInpu:(inpu)=>set({inpu})
}))

export default useConversation