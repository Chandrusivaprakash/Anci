import {createSlice} from '@reduxjs/toolkit'


const fetchDataCheck = createSlice({
    name:'fetchDataCheck',
    initialState:{
        fetchCheck:false
    },
    reducers:{
        fetchCheckChange:(state,action)=>{
            state.fetchCheck = action.payload
        }
    }
})


export default fetchDataCheck.reducer

export const {fetchCheckChange} = fetchDataCheck.actions


