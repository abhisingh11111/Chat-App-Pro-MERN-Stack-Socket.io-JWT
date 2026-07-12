import React from 'react'
import Search from './Sidebar/Components/Search'
import Sidebar from './Sidebar/Sidebar'
import Chats from './Chats/Chats'
import Friends from './Sidebar/Components/Friends'

function Home() {
  return (
    <div className='flex w-full h-5/6'>
      <div className='w-1/4 p-4 rounded-lg shadow-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5'>
        <Sidebar/>
      </div>
      <div className='border-white border-2 rounded-sm m-2'></div>
      <div className='w-3/4 p-4 rounded-lg shadow-xl bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5'>
        <Chats/>
      </div>
    </div>
  )
}

export default Home