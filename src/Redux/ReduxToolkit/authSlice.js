import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        authIsReady:false
    },
    reducers:{
        logIn_Auth:(state,action)=>{
            state.user = action.payload
        },
        logOut_Auth:(state,action)=>{
            state.user = action.payload
        },
        Auth_Is_Ready:(state,action)=>{
            state.user = action.payload
            state.authIsReady = true
        }
    }
})


export default authSlice.reducer

export const {logIn_Auth,logOut_Auth,Auth_Is_Ready} = authSlice.actions