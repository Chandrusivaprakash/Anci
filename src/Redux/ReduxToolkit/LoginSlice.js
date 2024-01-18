import {createSlice} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name:'loginForm',
    initialState:{
        loginUser:{
            email:'',
            password:''
        },
        inputValid:false,
        loginModel:false,
     },
     reducers:{
        loginInput:(state,action)=>{
            let loginValue = action.payload
            state.loginUser.email = loginValue.email
            state.loginUser.password = loginValue.password
        },
        modelOpen:(state,action)=>{
            state.loginModel = action.payload
        },
        loginValidData:(state,action)=>{
            state.inputValid = action.payload
        }
     }
})

export default LoginSlice.reducer
export const {loginInput,modelOpen,loginValidData} = LoginSlice.actions