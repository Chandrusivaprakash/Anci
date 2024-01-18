import {useState} from 'react'
import useSignup from '../hooks/useSignup'
import {connect} from 'react-redux'
import { logIn_Auth } from '../Redux/ReduxToolkit/authSlice'

function SignUp(props){
    const [input,setInput] = useState({
        email:'',
        password:'',
        clientName:''
    })
    const {email,password,clientName} = input

    const {signupHook,error,loading} = useSignup(props.signupDispatch)

    function handleChange(e){
        setInput({
            ...input,
            [e.target.id] : e.target.value
        })
    }

   

    function handleSubmit(e){
        e.preventDefault();
        if(email,password,clientName){
            signupHook(email,password,clientName)
            setInput({
                email:'',
                password:'',
                clientName:''
            })
        }else{
            alert('Please mentain all Details')
        }
      

    }

console.log(loading)
    return(
        <form onSubmit={handleSubmit} className="container" style={{maxWidth:'500px',marginTop:'40px'}}>
            <h2>Sign-Up Page</h2>
            <div className='formInput'>
                <label htmlFor="">Email</label>
                <input type="text" id='email' value={email} className="form-control" onChange={handleChange}/>
            </div >
            <div className='formInput'>
                <label htmlFor="">Password</label>
                <input type="text" id='password' value={password} className="form-control" onChange={handleChange}/>
            </div>
            <div className='formInput'>
                <label htmlFor="">Client Name</label>
                <input type="text" id='clientName' value={clientName} className="form-control" onChange={handleChange}/>
            </div>

       

            {!loading &&   <div className='text-center'>
                <button className='btn btn-success'>Submit</button>
            </div>}

            {loading && <div className='text-center'>
                <button className='btn btn-success' disabled={true}>Loading...</button>
            </div>}
            {error && <p style={{color:'red'}}>{error}</p>}
        </form>
    )
}


const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signupDispatch:(data)=>dispatch(logIn_Auth(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (SignUp)