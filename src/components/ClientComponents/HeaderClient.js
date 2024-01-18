import './HeaderClient.css'
import {connect} from 'react-redux'
import { selectCategory } from '../../Redux/ReduxToolkit/backendDataSlice'
import { useRef,useEffect } from 'react'
import {useHistory} from 'react-router-dom'

function HeaderClient({categoryList,selectCategoryDispatch,backend,cartItem,clientHistory}){

  const {cartNOList} = cartItem
  const {CartHistoryArr}= clientHistory


  const history = useHistory()

  function handleCategory(categ){
   selectCategoryDispatch(categ)
  }


  function handleCartMove(){
    history.push('/cartList')
  }
    return(
      <div className='clientHeader'>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        {categoryList.map(e=>(
           <li class="nav-item">
           <button class={e==backend.selectedCategory ? "btn btn-danger" : "btn btn-outline-danger"} onClick={()=>handleCategory(e)}>{e}</button>
         </li>
        ))}
       
       
      </ul>
      <div className='icons'>
      <div class="d-flex cartIcon" role="search">
      <button type="button" class="btn position-relative" onClick={handleCartMove}>
      <ion-icon name="cart"></ion-icon>
      {cartNOList ? ( <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
  {cartNOList}
    <span class="visually-hidden">unread messages</span>
  </span>):''}
 
</button>
      </div>
      {CartHistoryArr.length ? (<div class="d-flex heartIcon" role="search">
      <button type="button" class="btn position-relative" onClick={()=>history.push('/favouriteList')}>
      <ion-icon name="heart"></ion-icon>
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {CartHistoryArr.length}
    <span class="visually-hidden">unread messages</span>
  </span>
</button>
      </div>) :''}
      
      </div>
    </div>
  </div>
</nav>

</div>
    )
}

const mapStateToProps = (state)=>{
  return state
}


const mapDispatchToProps = (dispatch)=>{
  return{
      selectCategoryDispatch:(data)=>dispatch(selectCategory(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (HeaderClient)