import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading,setLoading] = useState(false)

  const {setAuthUser} = useAuthContext()
  
  
  const login = async({username,password})=>{

    if(!username||!password){
        toast.error('Please Fill All Input Fields')
        return
    }

    setLoading(true);

    try{
        const res = await fetch('/api/auth/login',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({username,password})
        })
        const data = await res.json();
        // console.log(data);
        if(data.error)
            throw new Error(data.error)
        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
    }
    catch(e) {
        toast.error(e.message);
    }
    finally{
        setLoading(false);
    }
  }
  return {loading,login}
}

export default useLogin