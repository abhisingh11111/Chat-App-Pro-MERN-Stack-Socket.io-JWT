import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext'

const useSignup = () => {
  const [loading,setLoading] = useState(false)

  const {setAuthUser} = useAuthContext()

  const signup = async({fullname,username,password,confirmpassword,gender})=>{
    const success =  handleInputs({fullname,username,password,confirmpassword,gender})

    if(!success)
        return;
    setLoading(true)
    try{
        const res = await fetch('/api/auth/signup',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({fullname,username,password,confirmpassword,gender})
        })

        const data = await res.json()
        // console.log(data)
        if(data.error)
            // toast.error(data.error)
            throw new Error(data.error)


    // Conetext
        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
    }
    catch(e){
        toast.error(e.message)
    }
    finally{
        setLoading(false)
    }
  }

  return {loading,signup}
}

export default useSignup

function handleInputs({fullname,username,password,confirmpassword,gender}){
    if(!fullname||!username||!password||!confirmpassword||!gender){
        toast.error('Please Fill All Input Fields')
        return false
    }

    if(password!==confirmpassword){
        toast.error("Password Doesn't Match")
        return false;
    }

    if(password.length<6){
        toast.error("Password too short")
        return false;
    }

    return true
}