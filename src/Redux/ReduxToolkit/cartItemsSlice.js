import {createSlice} from '@reduxjs/toolkit'


const cartItemsSlice = createSlice({
    name:'cartItems',
    initialState:{
        cart:[],
        cartNOList:0,
        totalPrice:0,
    },
    reducers:{
        addCartItem:(state,action)=>{
            let cardDetails = action.payload

         
            let exiting = state.cart.find(e=>{
                return e.id == cardDetails.id
            })

            if(exiting){
                if(exiting.stock >exiting.quantity){
                    exiting.quantity++
                    exiting.totalPrice+= Number(cardDetails.price)
                }
            }else{
                state.cart.push({...cardDetails,quantity:1,totalPrice:Number(cardDetails.price)})
                state.cartNOList += 1
            }

            let total = 0
            state.cart.map(e=>{
                total+= Number(e.totalPrice)
            })
            state.totalPrice = total

        },

        decrementCart:(state,action)=>{
            let cardDetails = action.payload
            let exiting = state.cart.find(e=>{
                return e.id == cardDetails.id
            })
            if(exiting.quantity >1){
                exiting.quantity--
                exiting.totalPrice-= Number(cardDetails.price)
            }else{
                state.cart = state.cart.filter(e=>e.id !== cardDetails.id)
                state.cartNOList -= 1
            }

            let total = 0
            state.cart.map(e=>{
                total+= Number(e.totalPrice)
            })
            state.totalPrice = total
        },

        removeItemCart:(state,action)=>{
            let cardDetails = action.payload
            state.cart = state.cart.filter(e=>e.id !== cardDetails.id)

            let total = 0
            state.cart.map(e=>{
                total+= Number(e.totalPrice)
            })
            state.totalPrice = total

            state.cartNOList = state.cart.length
        },
        resetCartItem:(state)=>{
            state.cart=[]
            state.cartNOList=0
            state.totalPrice=0
        }
    }
})


export default cartItemsSlice.reducer

export const {addCartItem,decrementCart,removeItemCart,resetCartItem} = cartItemsSlice.actions