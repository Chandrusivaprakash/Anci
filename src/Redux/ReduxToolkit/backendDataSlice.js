import {createSlice} from '@reduxjs/toolkit'


const backendDataSlice = createSlice({
    name:'backend',
    initialState:{
        loading:false,
        data:[],
        error:false,
        categoryList:[],
        categoryListOfObj:{},
        selectedCategory:''
    },
    reducers:{
        loadingData:(state)=>{
            state.loading = true 
            state.data = []
            state.error = false
        },
        successData:(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = false

            // categoryList 
            let category = action.payload
           let categoryData = [...new Set(category.map(e=>{
                return e.category
            }))]
            state.categoryList = categoryData
            state.selectedCategory = categoryData[0]


            // categoryListOfObj
          state.categoryListOfObj =  state.categoryList.reduce((acc,cur)=>{
                acc[cur] = state.data.filter(e=>{
                    return e.category == cur
                })
                return acc
            },{})
        },
        errorData:(state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.payload

            state.categoryList = []
        },
        selectCategory:(state,action)=>{
            state.selectedCategory = action.payload
        },
        addQuantity:(state,action)=>{
            let cardDetails = action.payload
            let exiting = state.categoryListOfObj[cardDetails.category].find(e=>{
                return e.id == cardDetails.id
            })

            if(exiting.quantity == undefined || exiting.stock> exiting.quantity){
                if(exiting.quantity){
                    exiting.quantity++
                    exiting.totalPrice+= Number(cardDetails.price)
                }else{
                    exiting.quantity = 1
                    exiting.totalPrice = Number(cardDetails.price)
                }
            }else{
                alert(`${exiting.spareName} - Stock is ${exiting.stock} Please Select that Ratio Quantity`)
            }
           
           
        },
        removeCart:(state,action)=>{
            let cardDetails = action.payload
        //    state.categoryListOfObj[cardDetails.category][index] = {...cardDetails,quantity:0}  
        let exsiting = state.categoryListOfObj[cardDetails.category].find(e=>{
            return e.id == cardDetails.id
        })

        exsiting.quantity = 0

        },
        decrementQuantity:(state,action)=>{
            let cardDetails = action.payload
            let exsiting = state.categoryListOfObj[cardDetails.category].find(e=>{
                return e.id == cardDetails.id
            })

            if(exsiting.quantity){
                exsiting.quantity--
                exsiting.totalPrice-= Number(cardDetails.price)
            }
        },
        resetCartCategory:(state)=>{
              // categoryList 
              let category = state.data
              let categoryData = [...new Set(category.map(e=>{
                   return e.category
               }))]
               state.categoryList = categoryData
               state.selectedCategory = categoryData[0]
   
   
               // categoryListOfObj
             state.categoryListOfObj =  state.categoryList.reduce((acc,cur)=>{
                   acc[cur] = state.data.filter(e=>{
                       return e.category == cur
                   })
                   return acc
               },{})
        }
    }
})


export default backendDataSlice.reducer

export const {loadingData,successData,errorData,selectCategory,addQuantity,removeCart,decrementQuantity,resetCartCategory} = backendDataSlice.actions