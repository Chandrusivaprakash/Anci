import { useState } from "react"
import { projectAuth } from "../firebase/config"

function useLogin(loginAuthDispatch,loginModelDispatch=false){
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const login = async (email,password)=>{
        setError(null)
        setLoading(true)
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email,password)
            console.log(res)
            loginAuthDispatch(res.user)
            loginModelDispatch(false)
            setError(null)
            setLoading(false)
        }catch(err){
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        }
    }


    return {login,error,loading}


}


export default useLogin