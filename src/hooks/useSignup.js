import { useState } from "react";
import { projectAuth } from "../firebase/config";


function useSignup(signupDispatch){
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const signupHook = async (email,password,clientName)=>{
        setError(null)
        setLoading(true)
        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email,password)
           
            if(!res){
                throw Error('Could not Complete SignUp')
            }

            await res.user.updateProfile({displayName:clientName})
            signupDispatch(res.user)

            setLoading(false)
            setError(null)
        }catch(err){
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        }
    }

    return {signupHook,error,loading}
}


export default useSignup