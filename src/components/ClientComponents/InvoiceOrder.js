import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import logo from '../images/BrandLogo.png'
import {useParams} from 'react-router-dom'
import { invoicePageStatus } from '../../Redux/ReduxToolkit/billingFormSlice'
import { projectFirestore } from '../../firebase/config'

function InvoiceOrder(props){
    const {cart,cartNOList,totalPrice} = props.cartItem
    const [totalToPay,setTotalToPay] = useState(0)
    const {order_no} = useParams()
    const {cardName,country,creditCardNumber,email,phno,state,termsCondition,name    } = props.billingForm.billingDetails

    useEffect(()=>{
        props.invoicePageStatusDispatch(true)
        let total = 0
        cart.map(e=>{
            total+= Number((Number(e.price)-(Number(e.price)*0.13)+(Number(e.price)*0.18)).toFixed())
        })
        setTotalToPay(total)

        cart.map(e=>(
            projectFirestore.collection('ASPR').doc(e.id).update({
                category:e.category,
                features:e.features,
                price:e.price,
                productDetails:e.productDetails,
                sampleImages:e.sampleImages,
                spareName:e.spareName,
                stock:Number(e.stock)-Number(e.quantity),
                thumbNail:e.thumbNail,
                specifications:e.specifications
            }).then(()=>console.log('updated ASPR'))
        ))

    },[])

console.log(cart)

    function handlePrint(){
        window.print()
    }
    return(
        <div className="container mt-3">
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <button onClick={handlePrint}>Print</button>
            <div>
               <span style={{fontSize:'1.5rem',fontWeight: 'bold'}}>Automobile Spare Part Re-Order</span> <img src={logo} alt="" style = {{height:'30px',marginLeft:'_54px',width:'80px'}}/>
               </div>
            </div>
          
            <hr />
             <div class="row mt-5">
            <div class="col-6">
            <h1>Tax Invoice</h1>
            <h6>Client Name</h6>
            <p>{name}</p>
            <h6>Mobile No.</h6>
            <p>{phno}</p>
            <h6>Email</h6>
            <p>{email}</p>
            <h6>Terms & Condition</h6>
            <p>{termsCondition}</p>
            </div>
            <div class="col-4">
            <h6>Invoice Date</h6>
            <p>{new Date().toLocaleDateString()}</p>
            <h6>Invoice Number</h6>
            <p style={{fontSize:'small'}}>INV-{order_no}</p>
            <h6>Order Number</h6>
            <p style={{fontSize:'small'}}>{order_no}</p>
            <h6>GST NO</h6>
            <p>{order_no.slice(0,27)}</p>
            </div>
            <div class="col-2">
            <h6>Delevery Address</h6>
            <p>{`${country} - ${state}`}</p>
            </div>
        </div>
        <hr />
        <table class="table mt-5 text-center">
        <thead>
            <tr>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Discount(13%)</th>
            <th scope="col">GST(18%)</th>
            <th scope="col">Amount AUD</th>
            </tr>
        </thead>
        <tbody>
            {cart.map(e=>(
                <tr>
                    <td>{e.spareName}</td>
                    <td>{e.quantity}</td>
                    <td>{`₹ ${e.price}`}</td>
                    <td>{`₹ -${(e.price*0.13).toFixed()}`}</td>
                    <td>{'₹ '+(e.price*0.18).toFixed()}</td>
                    <td>{`₹ ${(Number(e.price)-(Number(e.price)*0.13)+(Number(e.price)*0.18)).toFixed()}`}</td>
                </tr>
            ))}
        </tbody>
        </table>
        <h4 style={{marginLeft:'87%'}}>
            {'₹ '+totalToPay}
        </h4>
        </div>
    )
}


const mapStateToProps=(state)=>{
    return state
}

const mapDispatchToProps=(dispatch)=>{
    return{
        invoicePageStatusDispatch:(data)=>dispatch(invoicePageStatus(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (InvoiceOrder)