import {useState} from 'react'
import { projectAuth } from '../firebase/config'


function useLogout(){
const [error,setError] = useState('')
const [loading,setLoading] = useState(false)

const logout = async ()=>{
    setLoading(true)
    setError(false)
    try{
      let res =  await projectAuth.signOut()
    }catch(err){
        console.log(err.message)
        setError(err.message)
        setLoading(false)
    }
}

return {logout,error,loading}

}


export default useLogout