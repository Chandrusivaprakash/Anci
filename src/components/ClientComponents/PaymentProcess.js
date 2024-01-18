import { Button, Modal,Result  } from 'antd';
import {useEffect,useState} from 'react';
import { projectFirestore } from '../../firebase/config';
import {connect} from 'react-redux'
import { timeStamp } from '../../firebase/config';
import {useHistory} from 'react-router-dom'
import { invoicePageStatus } from '../../Redux/ReduxToolkit/billingFormSlice';
import { fetchCheckChange } from '../../Redux/ReduxToolkit/fetchDataCheck';

function PaymentProcess(props){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerCount,setTimerCount] = useState(5)

  const {user} = props.auth
  const {billingDetails} = props.billingForm
  const {cart} = props.cartItem
  const history = useHistory()

  const {fetchCheck} = props.fetchDataCheck
 
console.log(fetchCheck)

  useEffect(()=>{
    if(fetchCheck){
      props.invoicePageStatusDispatch(false)
      showModal()
        let handleTimer = setInterval(()=>{
         if(timerCount){
          setTimerCount(timerCount-1)
         }else{
           setIsModalOpen(false)
          clearInterval(handleTimer)
          if(timerCount !== null){
          setTimeout(()=>{
              fetchToDB()
              setTimerCount(0)
            },500)
          }
         }
        },1000)
      return ()=> clearInterval(handleTimer)
      }
  },[timerCount])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  let dateTime = new Date()
  let orderedAT = timeStamp.fromDate(dateTime)
  let orderNumber = `${user.uid+Math.random()}-Ran${dateTime.getMinutes()}${dateTime.getSeconds()}${dateTime.getUTCMilliseconds()}-D${dateTime.getDate()}-M${dateTime.getMonth()+1}-Y${dateTime.getFullYear()}`

 async function fetchToDB(){
  if(fetchCheck){
    await projectFirestore.collection('orderItems').add({cart:cart,uid:user.uid,orderNumber:orderNumber,orderedAT:orderedAT})
    .then(()=>{
      console.log('orderItems Sended')
    })
    .catch(err=>{
      console.log(err.message)
    })

    await projectFirestore.collection('billingDetails').add({billingAddress:billingDetails,uid:user.uid,orderNumber:orderNumber,orderedAT:orderedAT})
    .then(()=>{
      console.log('billingDetails Sended')
    })
    .catch(err=>{
      console.log(err.message)
    })
    props.fetchDataCheckDispatch(false)
    history.push(`/InvoiceOrder/${orderNumber}`)
  }
  }


    
    return(
        <div>
{fetchCheck && (<Modal title="Payment Process" open={isModalOpen} onOk={handleOk} footer={null}>
<Result
    status="warning"
    title={`Payment Status on Process it will Complete with in ${timerCount} Sec`}
  />
      </Modal>)}


{timerCount==0 || !fetchCheck ?  (
<><Result
    status="success"
    title="Successfully Payment Completed"
    subTitle="Order number: 2017182818828182881, please wait Invoice will generate soon"
  />
  {!fetchCheck && <div className='text-center'><button className='btn btn-success' onClick={()=>history.push(`/InvoiceOrder/${orderNumber}`)}>Go to Invoice</button></div>}
  
  </>
  ) : ''}
        </div>
    )
}


const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps=(dispatch)=>{
  return{
    invoicePageStatusDispatch:(data)=>dispatch(invoicePageStatus(data)),
    fetchDataCheckDispatch:(data)=>dispatch(fetchCheckChange(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (PaymentProcess)