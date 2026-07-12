import React from 'react'
import Search from './Components/Search'
import Friends from './Components/Friends'
import LogOut from './Components/LogOut'

function Sidebar() {
  return (
    <div className='h-full overflow-hidden'>
        <Search/>
        <Friends/>
        <LogOut/>
    </div>
    
  )
}

export default Sidebar