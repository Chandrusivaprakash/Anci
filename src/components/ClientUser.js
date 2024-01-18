import { Card } from 'antd';
import CarouselCards from 'react-elastic-carousel';
import { brandLogo,breakPointsCarLogo } from './smallcomponents/cardCarDatas';
import CartItem from './ClientComponents/CartItem';
import HeaderClient from './ClientComponents/HeaderClient';
import {connect} from 'react-redux'
import InnerFooter from './smallcomponents/InnerFooter';
import SpinnerComponent from './smallcomponents/SpinnerComponent';
import { invoicePageStatus } from '../Redux/ReduxToolkit/billingFormSlice';
import { useEffect } from 'react';
import { fetchCheckChange } from '../Redux/ReduxToolkit/fetchDataCheck';
import { projectFirestore } from '../firebase/config';
import { addBillingHistory, addCartHistory } from '../Redux/ReduxToolkit/historyOfClient';

const { Meta } = Card;
function ClientUser(props){

  useEffect(()=>{
    props.invoicePageStatusDispatch(false)
    props.fetchDataCheckDispatch(true)
  },[])


  const {user} = props.auth

  useEffect(()=>{
    projectFirestore.collection('billingDetails').where('uid','==',user.uid).onSnapshot(snapshot=>{
      console.log(snapshot)
        let result=[]
        snapshot.docs.map(e=>{
            result.push({...e.data(),id:e.id})
        })
        props.historyOfBillingDispatch(result)
    })
  
      projectFirestore.collection('orderItems').where('uid','==',user.uid).onSnapshot(snapshot=>{
        let result=[]
        snapshot.docs.map(e=>{
          result.push({...e.data(),id:e.id})
        })
      props.historyOfOrderItems(result)
    })
  
    console.log('Clientuser Component render')
  },[])

    const {loading,data,error,categoryList,categoryListOfObj,selectedCategory} = props.backend

    return(
        <div className='clientPage'>
            <span className='brandCards'>

              <HeaderClient categoryList={categoryList}/>

            <div className='mt-3 container card-grid'>
            {categoryListOfObj[selectedCategory] && categoryListOfObj[selectedCategory].map((e,index)=>(
                 <CartItem cardDetails={e} index={index}/>
            )) }
            </div>   
            {!categoryListOfObj[selectedCategory] && <div className='text-center'><SpinnerComponent/></div>}  
            
  </span>
  {categoryListOfObj[selectedCategory] && 
 ( <div style={{bottom:0,marginTop:'200px'}}>
    <InnerFooter/>
  </div>)
}
        </div>
    )
}


const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps=(dispatch)=>{
  return{
    invoicePageStatusDispatch:(data)=>dispatch(invoicePageStatus(data)),
    fetchDataCheckDispatch:(data)=>dispatch(fetchCheckChange(data)),
    historyOfBillingDispatch:(data)=>dispatch(addBillingHistory(data)),
    historyOfOrderItems:(data)=>dispatch(addCartHistory(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (ClientUser)