import {connect} from 'react-redux'
import { projectFirestore } from '../../firebase/config'
import {useHistory} from 'react-router-dom'


function FavouriteList(props){

    const {CartHistoryArr} = props.clientHistory
    const history = useHistory()

  //  async function handleDelete(id){
  //   projectFirestore.collection('orderItems').doc(id).delete().then(()=>{
  //       console.log('orderItems card deleted')
  //     })
  //   }

    return(
        <div className="container mt-3">
            <div style={{marginLeft:'80%'}}>
            <button className='btn btn-outline-success' onClick={()=>{history.push('/')}}>Go to Products</button>
            </div>
            <hr />
            {CartHistoryArr.length ? 
            (CartHistoryArr.map(e=>(
                <div class="card mt-5" style={{width: '90%'}}>
                <div class="card-header">
                <div class="row">
                    <div class="col">
                    {new Date(e.orderedAT.toDate()).toLocaleDateString()} - { new Date(e.orderedAT.toDate()).toLocaleTimeString()}
                    </div>
                    {/* <div class="col">
                        Total Amount : {}
                    </div> */}
                    {/* <div class="col">
                   <button className='btn btn-danger' onClick={()=>handleDelete(e.id)}>Delete</button>
                    </div> */}
                </div>
                </div>
                <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">*</th>
                    <th scope="col">Spare Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                    {e.cart.map(f=>(
                         <tr>
                         <th scope="row"><img src={f.thumbNail} alt="" width={40}/></th>
                         <td>{f.spareName}</td>
                         <td>{f.price}</td>
                         <td style={{marginLeft:'30px'}}><h5>{f.quantity}</h5></td>
                         <td>{f.totalPrice}</td>
                       </tr>
                    ))}
                 
                  
                </tbody>
              </table>
              <div class="card-footer">
              orderNumber : {e.orderNumber}
  </div>
              </div>
            )))
            : <div className='text-center'><img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428238-2902697.png?f=webp" alt="" /></div>}
            
        </div>
    )
}


const mapStateToProps = (state)=>{
    return state
}

export default connect(mapStateToProps) (FavouriteList)