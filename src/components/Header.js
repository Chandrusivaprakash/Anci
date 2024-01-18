import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './images/BrandLogo.png'
import { Button, Modal } from 'antd';
import { useState } from 'react';
import Login from './Login';
import {connect} from 'react-redux'
import { loginInput, loginValidData, modelOpen } from '../Redux/ReduxToolkit/LoginSlice';
import { Link,useHistory } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { logOut_Auth } from '../Redux/ReduxToolkit/authSlice';
import { invoicePageStatus } from '../Redux/ReduxToolkit/billingFormSlice';
import { resetCartCategory } from '../Redux/ReduxToolkit/backendDataSlice';
import { resetCartItem } from '../Redux/ReduxToolkit/cartItemsSlice';
import { fetchCheckChange } from '../Redux/ReduxToolkit/fetchDataCheck';


function Header(props) {

    const  {loginModel,loginUser} = props.loginReducer
    
    const [size, setSize] = useState('large');

  const {logout,error,loading} = useLogout()

  const {invoicePage}= props.billingForm

    const history = useHistory()
    const showModal = () => {
      history.push('/')
      setTimeout(()=>{
        props.loginModelDispatch(true);
    },300)
    };
    const handleCancel = () => {
     props.loginInputDispatch({
      email:'',
      password:''
     })
      props.loginModelDispatch(false);
      props.loginErrorDispatch(false)
    };

    function handleSignup(){
      history.push('/signUp')
    }


    function handleLogout(){
      logout()
      props.logoutAuthDispatch(null)
      props.resetCartCategoryDispatch()
      props.resetCartItemDispatch()
    }


    function handleInvoiceBtn(){
      props.resetCartCategoryDispatch()
      props.resetCartItemDispatch()
      props.invoicePageStatusDispatch(false)
      props.fetchDataCheckDispatch(true)
      history.push('/')
    }
    return (
    <Navbar collapseOnSelect bg="primary" variant="dark">
      
      <Container>
        <Link to={'/'}>
        <Navbar.Brand >
        <img src = {logo} style = {{height:'50px',marginLeft:'_54px',width:'100px'}}
         alt=''/>
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
          </Nav>
         
          <Nav>
                     
            {
              props.auth.user && (
                <>
                <Nav.Link>
              <span className='success'>
                <h4 style={{color:'#FFD700'}}>{props.auth.user.displayName}  </h4>
                </span>
            </Nav.Link>
             <Nav.Link eventKey={2}>
             <Button danger onClick={handleLogout}>Logout</Button>
             </Nav.Link>

             {invoicePage && 
             (<Nav.Link eventKey={2}>
            <Button type="primary" size={size} className='signupBtn' onClick={handleInvoiceBtn}>
            <span style={{display:'flex'}}><ion-icon name="log-in-outline" style={{fontSize: '1.5rem'}}></ion-icon><span>Re-Start to Home</span></span>
          </Button>
             </Nav.Link>)}
             </>
              )
            }


              {
                !props.auth.user && (
                  <>
                   <Nav.Link>

              <Button type="primary" size={size} className='loginBtn' onClick={showModal}>
            <span style={{display:'flex'}}><ion-icon name="log-in-outline" style={{fontSize: '1.5rem'}}></ion-icon><span>Login</span></span>
          </Button>
          </Nav.Link>

                
            <Nav.Link eventKey={2}>
            <Button type="primary" size={size} className='signupBtn' onClick={handleSignup}>
            <span style={{display:'flex'}}><ion-icon name="log-in-outline" style={{fontSize: '1.5rem'}}></ion-icon><span>SignUp</span></span>
          </Button>
             </Nav.Link>
                  </>
                )
              }

            
             </Nav>
          
        </Navbar.Collapse>
      </Container>
    
        <Modal title="Please Login" open={loginModel}  onCancel={handleCancel} footer={null}>
          <span>
           <Login />
          </span>
          </Modal>
       </Navbar>
  );
}

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return{
    loginModelDispatch:(status)=>dispatch(modelOpen(status)),
    loginErrorDispatch:(status)=>dispatch(loginValidData(status)),
    loginInputDispatch:(data)=>dispatch(loginInput(data)),
    logoutAuthDispatch:(status)=>dispatch(logOut_Auth(status)),
    invoicePageStatusDispatch:(data)=>dispatch(invoicePageStatus(data)),
    resetCartItemDispatch:()=>dispatch(resetCartItem()),
    resetCartCategoryDispatch:()=>dispatch(resetCartCategory()),
    fetchDataCheckDispatch:(data)=>dispatch(fetchCheckChange(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Header);