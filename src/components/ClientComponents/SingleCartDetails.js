import './SingleCartDetails.css'
import {Link,useHistory, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { projectFirestore } from '../../firebase/config'
import { useEffect,useState } from 'react'
import SpinnerComponent from '../smallcomponents/SpinnerComponent'
import { addQuantity, decrementQuantity, removeCart } from '../../Redux/ReduxToolkit/backendDataSlice'
import { addCartItem, decrementCart, removeItemCart } from '../../Redux/ReduxToolkit/cartItemsSlice'


function SingleCartDetails(props){

    const [productDetails,setProductDetails] = useState(null)
    const [selectImg,setSelectImg] = useState(0)
    const {user} = props.auth
    const history = useHistory()
    const params = useParams()

    const {prod_id,catg_name,index_pos} = params
       

    const {categoryListOfObj } = props.backend
   

 
    useEffect(()=>{
      projectFirestore.collection('ASPR').doc(prod_id).get().then(snapshot=>{
          setProductDetails({...snapshot.data(),id:snapshot.id})
      })
},[])




    function handleSelectImg(index){
      setSelectImg(index)
    }

  
    function handleAddCart(){
      props.addQuantityDispatch(productDetails)
      props.addCartItemDispatch(productDetails)
    }
 
    function handleDecrCart(){
      props.decrementQuantityDispatch(productDetails)
      props.decrementCartItemDispatch(productDetails)
    }


    function handleGoBack(){
      history.push(`/client/${user.displayName}`)
    }



    function handleRemoveCart(){
      props.removeCartDispatch(productDetails)
      props.removeItemCartDispatch(productDetails)
    }


    return(
        <>
        {productDetails ? 
        (<div class="body">
           
  <div class="singleCardContainer">
    <div class="card-left">
      <div class="main-image">
          <img src={productDetails.sampleImages[selectImg]}/>
      </div>
      <div class="img-select">
        {productDetails.sampleImages.map((e,index)=>(
             <div class={`img ${index == selectImg ? 'active':''}`}>
             <a onClick={()=>handleSelectImg(index)} data-id={index+1}><img src={e}/></a>
           </div>
        ))}
       
      
        
      </div>
    </div>
    <div class="card-right">
    <div class="row">
    <div class="col-9">
    <h3>{productDetails.spareName}</h3>
    </div>
    <div class="col">
      <button onClick={handleGoBack}  className='btn btn-secondary btn-sm'>Go Back</button>
    </div>
  </div>
        
        <h4>${productDetails.price}   <span> ${Number(productDetails.price)+(Number(productDetails.price)*0.3)}</span></h4>
        <p>{productDetails.productDetails}</p>

        <div class="form">
          <div class="form-group">
            <label>Stock  </label>
            <span style={{fontWeight:'bold'}}>{productDetails.stock} - Available</span>
          </div>
          {
            categoryListOfObj[catg_name][index_pos]['quantity'] ? (  <div class="form-group">
            <label>Qty</label>
            <div class="input-group">
              <button class="minus" onClick={handleDecrCart}>-</button>
              <input type="text" value={(categoryListOfObj[catg_name][index_pos]['quantity'] !== undefined ? categoryListOfObj[catg_name][index_pos]['quantity'] : 0)} id="qty"/>
              <button class="plus" onClick={handleAddCart}>+</button>
            </div>
          </div>) : ''
          }
        
        </div>

        {
          !categoryListOfObj[catg_name][index_pos]['quantity'] ? (Number(productDetails.stock) ? <button class="btn btn-success" style={{marginTop:'4rem'}} onClick={handleAddCart}>Add Cart</button> : <button class="btn btn-danger" style={{marginTop:'4rem'}}>Out Of Stock</button>) : ''
        }
        
        {
          categoryListOfObj[catg_name][index_pos]['quantity'] ? (<button class="btn btn-secondary" style={{marginTop:'4rem'}} onClick={handleRemoveCart}>Remove Cart</button>) :''
        }

    </div>
  </div>

</div>) : <SpinnerComponent/>}
</>
    )
}

const mapStateToProps = (state)=>{
    return state
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

export default connect(mapStateToProps,mapDispatchToProps) (SingleCartDetails)