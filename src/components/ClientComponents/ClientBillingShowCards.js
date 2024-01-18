import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { addBillingToForm, billingDetailsAdd } from '../../Redux/ReduxToolkit/billingFormSlice';
import { projectFirestore } from '../../firebase/config';
import { fetchCheckChange } from '../../Redux/ReduxToolkit/fetchDataCheck';

function ClientBillingShowCards(props){

    const {billingHistoryArr} = props.clientHistory
    const {cartNOList} = props.cartItem
    const history = useHistory()

    useEffect(()=>{
      if(!cartNOList){
        history.push('/cartList')
      }
        if(!billingHistoryArr.length){
            history.push('/billingForm')
        }
    },[])

    function handleViewToForm(details){
        props.addDetailsToFormDispatch(details)
        history.push('/billingForm')
    }

    function handleDetailsDelete(id){
      projectFirestore.collection('billingDetails').doc(id).delete().then(()=>{
        console.log('billing card Detail deleted')
      })
    }


    function handleNewBilling(){
      props.addDetailsToFormDispatch({})
      history.push('/billingForm')
    }


    function handleCheckOut(data){
      props.billingDetailsDispatch(data)
      props.fetchDataCheckDispatch(true)
      history.push('/paymentProcess')
    }
  
    return(
      <>
          <div class="row mt-3">
        <div class="col-8">
       <h3 style={{marginLeft:'40px'}}>Billing Details-History</h3>
        </div>
        <div class="col-4">
        <button type="button" class="btn btn-secondary" onClick={()=>history.push('/cartList')}>GoTo Cart Page</button>
        </div>
        </div>
        <hr />
        <div className="container">
            <div className='billingCards'>
            {billingHistoryArr.map(e=>(
                 <Card className="mt-3" style={{ maxWidth: '25rem', }}>
                 <Card.Header >
                    <div>

                    <div class="row text-center">
                    <div class="col">
                    <button type="button" class="btn btn-success btn-sm" onClick={()=>{handleCheckOut(e.billingAddress)}}>Check Out</button>
                    </div>
                    <div class="col">
                    <button type="button" class="btn btn-primary btn-sm" onClick={()=>{handleViewToForm(e)}}>Edit</button>
                    </div>
                    <div class="col">
                    <button type="button" class="btn btn-danger btn-sm" onClick={()=>handleDetailsDelete(e.id)}>Delete</button>
                    </div>
                    </div>

                    </div>

                    <div className=''>

                    <div class="row">
                    <div class="col mt-3">
                    <marquee width="100%" direction="left" scrollamount="1">
                    <p>{e.orderNumber}</p>
                    </marquee>
                    </div>
                    <div class="col mt-3 text-center">
                    {new Date(e.orderedAT.toDate()).toLocaleDateString()}
                    <br/>
                    {new Date(e.orderedAT.toDate()).toLocaleTimeString()}
                    </div>
                    </div>

                    </div>
                 </Card.Header>
                      {/* <Card.Body> */}
                      <table class="table table-bordered" style={{fontSize:'small'}}>
                      <thead>
                    <tr>
                      <th scope="col"><ul>Requerment</ul></th>
                      <th scope="col"><ul>You Details</ul></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{e.billingAddress.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{e.billingAddress.email}</td>
                    </tr>
                    <tr>
                    <td>Phone no</td>
                      <td>{e.billingAddress.phno}</td>
                    </tr>
                    <tr>
                    <td>Card Name</td>
                      <td>{e.billingAddress.cardName}</td>
                    </tr>
                    <tr>
                    <td>Credit Card  Number</td>
                      <td>{e.billingAddress.creditCardNumber}</td>
                    </tr>
                    <tr>
                    <td>Exp Month Year</td>
                      <td>{e.billingAddress.expMonthYear}</td>
                    </tr>
                    <tr>
                    <td>CVV</td>
                      <td>{e.billingAddress.cvv}</td>
                    </tr>
                    <tr>
                    <td>Address</td>
                      <td>{`${e.billingAddress.country}-${e.billingAddress.state}`}</td>
                    </tr>
                    <tr>
                    <td>Terms Condition</td>
                      <td>{e.billingAddress.termsCondition}</td>
                    </tr>
                  </tbody>
                </table>
                      {/* </Card.Body> */}
                    </Card>

            ))}

            <div className='mt-5 text-center'>
                <div style={{marginTop:'10rem',border:'1px solid black',padding:'100px',cursor:'pointer'}} onClick={handleNewBilling}>
                <img src="https://www.property118.com/wp-content/uploads/2013/06/How-to-I-add-my-picture-to-comments.jpg" width={'100rem'} alt="" />
                </div>
            </div>
    </div>
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
    return state
}


const mapDispatchToProps=(dispatch)=>{
    return{
        addDetailsToFormDispatch:(data)=>dispatch(addBillingToForm(data)),
        billingDetailsDispatch:(data)=>dispatch(billingDetailsAdd(data)),
        fetchDataCheckDispatch:(data)=>dispatch(fetchCheckChange(data))
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (ClientBillingShowCards)