import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../../../hooks/useLogout';

function LogOut() {
  const {loading,logout} = useLogout()
  return (
    <div className='h-14 flex items-center'>
      {!loading?(
        <button type='submit' className='btn btn-circle bg-transparent h-full text-white hover:bg-transparent hover:text-red-600 border-none'>
          <TbLogout2 className='w-10 h-10' onClick={logout}/>
        </button>
      ):(
        <span className="loading loading-dots loading-lg"></span>
      )}
      
    </div>
  )
}

export default LogOut