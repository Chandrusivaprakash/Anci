import './CartList.css'
import {Link,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import { addQuantity, decrementQuantity } from '../../Redux/ReduxToolkit/backendDataSlice'
import { addCartItem, decrementCart } from '../../Redux/ReduxToolkit/cartItemsSlice'
import { useState } from 'react'
import InnerFooter from '../smallcomponents/InnerFooter'

function CartList(props){
    const {user} = props.auth
    const {cart,cartNOList,totalPrice} = props.cartItem
    const history = useHistory()
   
    let buyNowPrice = (totalPrice+totalPrice*0.08+totalPrice*0.18-totalPrice*0.13).toFixed()

  

    function handleIncreament(productItem){
        props.addCartItemBackEndDispatch(productItem)
        props.addCartItemCartListDispatch(productItem)
    }


    function handleDecrement(productItem){
        props.decrementItemBackEndDispatch(productItem)
        props.decrementItemCartListDispatch(productItem)
    }

    function handleByProduct(){
       if(window.confirm(`Billing Price ₹${buyNowPrice} Ok to confirm`)){
        history.push('/clientBillingCards')
       }
    }

    return(
        <>
        <div className="mt-3" style={{margin:'0 18px 0 18px'}}>
             <div class="row">
        <div class="col">
       <h2>Product List</h2>
        </div>
        <div class="col" style={{marginLeft:'60%'}}>
        <Link to={`/client/${user.displayName}`} type="button" class="btn btn-secondary">GoTo Product Page</Link>
        </div>
        </div>
        <hr />
            {cartNOList ? 
       ( 
       <>
             <div class="row mt-3">
            <div class="col-8">
                <div className='cart-container'>
                {cart.map(e=>(
                     <div className="cartItem mt-3">
                        <img src={e.thumbNail} width='80px' alt="" />
                        {e.spareName.length < 25 ? <p>{e.spareName}</p> :
                            <marquee width="20%" direction="left" scrollamount="3">
                    {e.spareName}
                    </marquee>}
                    
                     <p>₹ {e.price}</p>
                     <p>X {e.quantity}</p>
                     <div>Total ₹ {e.totalPrice}</div>
                     <button className="cart-actions" onClick={()=>handleDecrement(e)}>-</button>
                     <button className="cart-actions" onClick={()=>handleIncreament(e)}>+</button>
                 </div>
                ))}
                </div>
               
            </div>
            <div class="col-3">

                    <div class="card" style={{width: "20rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Products Price Details</h5>
                    <hr />
                    <table class="table">
                   
                    <tbody style={{textAlign:'center'}}>
                        <tr>
                        <td>Total Price</td>
                        <td>{'₹ '+totalPrice}</td>
                        </tr>
                        <tr>
                        <td>Delivery Change(8%)</td>
                        <td>{'₹ '+(totalPrice*0.08).toFixed()}</td>
                        </tr>
                        <tr>
                        <td>GST(18%)</td>
                        <td>{'₹ '+(totalPrice*0.18).toFixed()}</td>
                        </tr>
                        <tr>
                        <td>Discount (13%)</td>
                        <td>{'₹ '+'-'+(totalPrice*0.13).toFixed()}</td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="row text-center">
                    <div class="col" style={{marginLeft:'40px'}}>
                        <button className='btn btn-success' onClick={handleByProduct}>Buy Now</button>
                    </div>
                    <div class="col">
                       <h5 style={{marginLeft:'20px'}}>{'₹ '+buyNowPrice}</h5>
                    </div>
                    </div>
                </div>
            </div>

            </div>
        </div></>) : <div className='container text-center'><img src={'https://hsnbazar.com/images/empty-cart.png'} width='400px'/></div>}
        </div>
   
         <div style={{bottom:0,marginTop:'150px'}}>
         <InnerFooter/>
     </div>

     </>
    )
}

const mapStateToProps = (state)=>{
    return state
}


const mapDispatchToProps = (dispatch)=>{
    return{
        addCartItemBackEndDispatch:(data)=>dispatch(addQuantity(data)),
        decrementItemBackEndDispatch:(data)=>dispatch(decrementQuantity(data)),
        addCartItemCartListDispatch:(data)=>dispatch(addCartItem(data)),
        decrementItemCartListDispatch:(data)=>dispatch(decrementCart(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (CartList)