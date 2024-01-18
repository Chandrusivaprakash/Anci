import { useState,useEffect } from "react"
import { projectFirestore } from "../firebase/config"


function useCollection(){
    const [document,setDocument] = useState(null)
    const [error,setError] = useState(null)

    useEffect(()=>{
        let ref = projectFirestore.collection('ASPR')

        ref.get().then(snapshot=>{
            if(snapshot.empty){
                setError('No Datas to Load')
                setDocument(null)
            }else{
                let result = []
                snapshot.docs.map(e=>{
                  result.push({...e.data(),id:e.id})
                })
                setDocument(result)
                setError(null)
            }
        })

    },[])

    return {document,error}


}


export default useCollection