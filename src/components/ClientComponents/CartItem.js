import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link,useHistory} from 'react-router-dom'
import { Badge} from 'antd';
import {connect} from 'react-redux'
import { addQuantity, decrementQuantity,removeCart } from '../../Redux/ReduxToolkit/backendDataSlice';
import { addCartItem, removeItemCart,decrementCart } from '../../Redux/ReduxToolkit/cartItemsSlice';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';



function CartItem({cardDetails,index,addQuantityDispatch,removeCartDispatch,decrementQuantityDispatch,singleCartDetailDispatch,addCartItemDispatch,decrementCartItemDispatch,removeItemCartDispatch}){

  let history = useHistory()

  function handleAddToCart(){
    addQuantityDispatch(cardDetails)
    addCartItemDispatch(cardDetails)
  }


  function handleRemoveCart(){
    removeCartDispatch(cardDetails)
    removeItemCartDispatch(cardDetails)
  }


  function handleDecreCart(){
    decrementQuantityDispatch(cardDetails)
    decrementCartItemDispatch(cardDetails)
  }


  function handlePrew(){
    history.push(`/cardDetails/${cardDetails.id}/${cardDetails.category}/${index}`)
  }
    return(
        <div className='mt-3'>
        <Card style={{ width: '15rem', height:'21rem'}}>
          <Badge.Ribbon text="!Offer 30%" color="green">

      <LazyLoadImage  style={{height:'8.2rem',width:'119.9%'}} alt={cardDetails.spareName} src={cardDetails.thumbNail} placeholderSrc={process.env.PUBLIC_URL+'/logo192.png'} effect='blur'/>
      <Card.Body>
        <Card.Title>
            <marquee width="100%" direction="left" scrollamount="3">
           {cardDetails.spareName}
            </marquee>
</Card.Title>
        <Card.Text>
            {/* <p>{'Board & De-Board from your car in style with Genuine Illuminated Door Sill Guards'.slice(0,52)+'...'}</p> */}
            <h3 className='text-center'>₹ {cardDetails.price} - <del style={{color:'gray', fontSize:'20px'}}>₹ {(Number(cardDetails.price)+Number(cardDetails.price)*0.3).toFixed(0)}</del></h3>
        
        </Card.Text>


        <div class="row">
    <div class="col">
    <b>Stock : {cardDetails.stock}</b>  
    </div>
    <div class="col text-center">
        <button onClick={handlePrew} className='btn btn-light'>Prew</button>
    </div>
  </div>

  {!cardDetails.quantity ? 
       (Number(cardDetails.stock) ? <div className='text-center mt-3'>
        <Button variant="primary" onClick={()=>handleAddToCart()}>Add To Cart</Button>
        </div> : <div className='text-center mt-3'>
        <Button variant="outline-danger">Out Of Stock</Button>
        </div>)
          :

        (<div class="row mt-3">
    <div class="col">
      <button className='removeCartBtn' onClick={()=>handleRemoveCart()}>Remove</button>
    </div>
    <div class="col">
      <div style={{display:'flex'}}>
        <button className='btn btn-outline-dark' onClick={handleAddToCart}>+</button>
        <button className='btn'>{cardDetails.quantity}</button>
        <button className='btn btn-outline-dark' onClick={handleDecreCart}>-</button>
      </div>
    </div>
  </div>)}
      </Card.Body>

    </Badge.Ribbon>
    </Card>
    </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addQuantityDispatch:(data)=>dispatch(addQuantity(data)),
    removeCartDispatch:(data)=>dispatch(removeCart(data)),
    decrementQuantityDispatch:(data)=>dispatch(decrementQuantity(data)),
    addCartItemDispatch:(data)=>dispatch(addCartItem(data)),
    decrementCartItemDispatch:(data)=>dispatch(decrementCart(data)),
    removeItemCartDispatch:(data)=>dispatch(removeItemCart(data))
  }
}

export default connect(null,mapDispatchToProps) (CartItem)