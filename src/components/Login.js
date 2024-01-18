import {useState,useEffect,useMemo} from 'react' 
import {connect} from 'react-redux'
import { loginInput, loginValidData, modelOpen } from '../Redux/ReduxToolkit/LoginSlice'
import useLogin from '../hooks/useLogin'
import { logIn_Auth } from '../Redux/ReduxToolkit/authSlice'


function Login(props){
    // const [inputValid,setInputValid] = useState({
    //       email:false,
    //       password:false
    // })

    // const [input,setInput] = useState({
    //     email:'',
    //     password:''
    // })
    // const {email,password} = input

    const {login,error,loading} = useLogin(props.loginAuthDispatch,props.loginModelDispatch)

    const  {loginModel,loginUser,inputValid} = props.loginReducer
    const {email,password} = loginUser




    function handleSubmit(){
            login(email,password)
           props.loginErrorDispatch(true)
    }
    function handleChange(e){
        props.loginInputDispatch({
            ...loginUser,
            [e.target.id] : e.target.value
        })

        props.loginErrorDispatch(false)
       
    }
    
    return(
        <div className="container  mt-3">
            <div className='formInput'>
            <label>Email</label>
            <input type="email" id='email' placeholder='apple@gmail.com' value={email} onChange={handleChange} className="form-control"/>
            </div>
            <div className='formInput'>
            <label>Password</label>
            <input type="password" id='password' placeholder='********' value={password} onChange={handleChange} className="form-control"/>
            </div>
           
            {
                !loading && (
                    <div className="text-center">
                    <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                     </div>
                )
            }
            {
                loading && (
                    <div className="text-center">
           <button className="btn btn-success" disabled={true}>Loading...</button>
            </div>
                )
            }
            {inputValid && (error && (<p style={{color:'red'}}>{error}</p>))}
        </div>
        
    )
}

const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
    return{
        loginInputDispatch:(data)=>dispatch(loginInput(data)),
        loginErrorDispatch:(status)=>dispatch(loginValidData(status)),
        loginModelDispatch:(status)=>dispatch(modelOpen(status)),
        loginAuthDispatch:(data)=>dispatch(logIn_Auth(data))

    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Login)
