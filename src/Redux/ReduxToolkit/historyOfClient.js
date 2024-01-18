import { createSlice } from "@reduxjs/toolkit";


const historyOfClient = createSlice({
    name:'historyClient',
    initialState:{
        billingHistoryArr:[],
        CartHistoryArr:[]
    },
    reducers:{
        addBillingHistory:(state,action)=>{
            state.billingHistoryArr = action.payload
        },
        addCartHistory:(state,action)=>{
            state.CartHistoryArr = action.payload
        }
    }
})


export default historyOfClient.reducer

export const {addBillingHistory,addCartHistory} = historyOfClient.actions