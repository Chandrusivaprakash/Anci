import {createSlice} from '@reduxjs/toolkit'


const billingFormSlice = createSlice({
    name:'billingForm',
    initialState:{
        billingDetails:{},
        reqBillingToForm:{},
        invoicePage:false,
    },
    reducers:{
        billingDetailsAdd:(state,action)=>{
            state.billingDetails = action.payload
        },
        addBillingToForm:(state,action)=>{
            state.reqBillingToForm = action.payload
        },
        invoicePageStatus:(state,action)=>{
            state.invoicePage = action.payload
        }
    }
})


export default billingFormSlice.reducer

export const {billingDetailsAdd,addBillingToForm,invoicePageStatus} = billingFormSlice.actions