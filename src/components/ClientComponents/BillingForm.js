import './BillingForm.css'
import creditCard1 from '.././smallcomponents/images/creditCard1.png'
import InnerFooter from '../smallcomponents/InnerFooter'
import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { Button, Modal } from 'antd';
import { addBillingToForm, billingDetailsAdd } from '../../Redux/ReduxToolkit/billingFormSlice';
import {useHistory} from 'react-router-dom'
import { fetchCheckChange } from '../../Redux/ReduxToolkit/fetchDataCheck'

function BillingForm(props){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailsCorrect,setDetailsCorrect] = useState(false)
    const [countryArry,setCountryArry] = useState({
        India:['','Tamil Nadu','Kerala','Andhra Pradesh','Assam','Bihar','Gujarat'],
        Canada:['','Alberta','British Columbia','Manitoba','New Brunswick','Nova Scotia','Ontario'],
        Japan:['','Hokkaido','Tohoku','Kanto','Chubu','Shikoku','Kyushu'],
        Australia:['','Fiji','Micronesia','Kiribati','Newzealand','Tonga','Nauru'],
        'United Kingdom':['','England','Scotland','North-Eastern','Islandoffireland','islandofgreatbritain','walesandnorthernisland']
    })
    const [input,setInput] = useState({
        name:'',
        email:'',
        phno:'',
        country:'',
        state:'',
        cardName:'',
        creditCardNumber:'',
        expMonthYear:'',
        cvv:'',
        agree:'',
        dontAgree:'',
        termsCondition:'',
    })

    const [validInput,setValidInput] = useState({
        name:false,
        email:false,
        phno:false,
        country:false,
        state:false,
        cardName:false,
        creditCardNumber:false,
        expMonthYear:false,
        cvv:false,
        agree:false,
        dontAgree:false,
        termsCondition:false,
    })
    const {name,email,phno,country,state,cardName,creditCardNumber,expMonthYear,cvv,agree,dontAgree,termsCondition} = input
    const {user} = props.auth
    const {billingHistoryArr} = props.clientHistory
    const {cartNOList} = props.cartItem
    const history = useHistory()

    const {reqBillingToForm} = props.billingForm
    console.log(reqBillingToForm.billingAddress)
    useEffect(()=>{
        if(!cartNOList){
            history.push('/cartList')
        }
        if(reqBillingToForm.billingAddress !== undefined){
            setInput(reqBillingToForm.billingAddress)
        }else{
            setInput({
                ...input,
                name:user.displayName,
                email:user.email
            })
        }
    },[])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.id]:e.target.value
        })

        setValidInput({
            ...validInput,
            [e.target.id]:false
        })
    }


    function handleTermCond(tems){
        if(tems=='agree'){
            setInput({...input,agree:true,dontAgree:false,termsCondition:tems})
        }else if(tems == 'dontAgree'){
            setInput({...input,dontAgree:true,agree:false,termsCondition:tems})
        }
    }


    function handleSubmit(e){
        e.preventDefault();
        setValidInput({
            name:true,
            email:true,
            phno:true,
            country:true,
            state:true,
            cardName:true,
            creditCardNumber:true,
            expMonthYear:true,
            cvv:true,
            agree:true,
            dontAgree:true,
            termsCondition:true,
        })

        let checkName = name.length && isNaN(name) 
        let checkEmail = email.length && email.includes('@') && email.includes('.') && (email.includes('com')||email.includes('in'))
        let checkPhno = phno.length == 10
        let checkCardName = (cardName.length && isNaN(cardName))
        let checkCreditCardNo = creditCardNumber.length == 16
        let checkCvv = cvv.length == 3

        if(checkName && checkEmail && checkPhno && checkCardName && checkCreditCardNo && checkCvv && country && state && expMonthYear){
            if(termsCondition){
                showModal()
            }else{
                alert('Please fill the Treams & condition')
            }
        }

    }

    // Ant-UI model

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
        setDetailsCorrect(true);
        props.billingDetailsDispatch(input)
        props.fetchDataCheckDispatch(true)
        
        stateBackToEmptyFun()

        history.push('/paymentProcess')

      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      function handleGotoCart(){
        stateBackToEmptyFun()
        props.billingDetailsDispatch({})
        props.reqAddDetailsToFormDispatch({})
        history.push('/cartList')
      }

      function handleGotoBillingDetails(){
        stateBackToEmptyFun()
        props.billingDetailsDispatch({})
        props.reqAddDetailsToFormDispatch({})
        history.push('/clientBillingCards')
      }

      function stateBackToEmptyFun(){
        setInput({
            name:'',
            email:'',
            phno:'',
            country:'',
            state:'',
            cardName:'',
            creditCardNumber:'',
            expMonthYear:'',
            cvv:'',
            agree:'',
            dontAgree:'',
            termsCondition:'',
        })

        setValidInput({
            name:false,
            email:false,
            phno:false,
            country:false,
            state:false,
            cardName:false,
            creditCardNumber:false,
            expMonthYear:false,
            cvv:false,
            agree:false,
            dontAgree:false,
            termsCondition:false,
        })
      }


    return(
        <>
        <div class="row mt-3">
        <div class="col">
       <h2 style={{marginLeft:'40px'}}>Billing Form</h2>
        </div>
        <div class="col" style={{display:'flex',justifyContent:'space-around'}}>
        <button type="button" class="btn btn-secondary" onClick={()=>handleGotoCart()}>GoTo Cart Page</button>
        {billingHistoryArr.length ? (<button type="button" class="btn btn-secondary" onClick={()=>handleGotoBillingDetails()}>GoTo Billing-Details History</button>):''}
        
        </div>
        </div>
        <hr />
        <div class="billingFormContainer">
        <form onSubmit={handleSubmit} action="">
            <div class="row">
                <div class="col">
                    <h3 class="title">Billing Address</h3>
                    <div class="inputBox">
                        <p>Full Name :</p>
                        <input type="text" value={name} onChange={handleChange} id="name" placeholder="john deo"/>
                        <span id="error-name">{validInput.name && (name? (isNaN(name)? '' :'Please fill the alphabets only'):'Please fill the Name')}</span>
                    </div>
                    <div class="inputBox">
                        <p>Email :</p>
                        <input type="text" value={email} id="email" onChange={handleChange} placeholder="example@example.com"/>
                        <span id="error-email">{validInput.email && (email? ((email.includes('@') && email.includes('.') && (email.includes('com') || email.includes('in'))) ? '' :'Please Valid Email'):'Please fill the Email')}</span>
                    </div>
                    <div class="inputBox">
                        <p>Phone no :</p>
                        <input type="number" value={phno} id="phno" onChange={handleChange} placeholder="638****839"/>
                        <span id="error-phno">{validInput.phno && (phno? (phno.length == 10 ? '' :'Please fill correct Phone no') :'Please fill the Phone no')}</span>
                    </div>
                    <div class="inputBox">
                        <p>Country :</p>
                        <select name="" value={country} id="country" onChange={handleChange}>
                            <option value="" disabled selected hidden>Please Select the Contry</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="Japan">Japan</option>
                            <option value="Australia">Australia</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                        <span id="error-country">{validInput.country && (country? '':'Please select the Country')}</span>
                    </div>
                    <div class="inputBox">
                        <p>State :</p>
                        <select name="" value={state} onChange={handleChange} id="state">
                            {countryArry[country] ? 
                            (
                                countryArry[country].map(e=>(
                                    (e ? <option value={e}>{e}</option> :<option value={e} selected hidden>Please Select the state</option>)
                                    
                                ))
                            )
                            : (<option value="">--------</option>)}
                            
                        </select>
                        <span id="error-state">{validInput.state && (state?'':'Please Select the State')}</span>
                    </div>
                </div>
                <div class="col">
                    <h3 class="title">Payment</h3>
                    <div class="inputBox">
                        <p>Card Accepted :</p>
                        <img src={creditCard1} alt=""/>
                    </div>
                    <div class="inputBox">
                        <p>Name On Card :</p>
                        <input type="text" id="cardName" value={cardName}  onChange={handleChange} placeholder="jaya"/>
                        <span id="error-cardName">{validInput.cardName && (cardName? (isNaN(cardName)? '' :'Please fill the alphabets only'):'Please fill the Card Name')}</span>
                    </div>
                    <div class="inputBox">
                        <p>Credit Card Number :</p>
                        <input type="number" id="creditCardNumber" value={creditCardNumber} onChange={handleChange} placeholder="1111-2222-3333-4444"/>
                        <span id="error-creditCardNumber">{validInput.creditCardNumber && (creditCardNumber?(creditCardNumber.length == 16 ?'':'Please fill correct Card no'):'Please fill the Card No')}</span>
                    </div>
                    <div class="inputBox">
                        <p>Exp Month & Exp Year :</p>
                        <input type="month" value={expMonthYear}  onChange={handleChange} id="expMonthYear"/>
                        <span id="error-expMonthYear">{validInput.expMonthYear && (expMonthYear?'':'Please fill Exp no')}</span>
                    </div>
                    <div class="inputBox">
                        <p>CVV :</p>
                        <input type="number" value={cvv}  onChange={handleChange} id="cvv" placeholder="123"/>
                        <span id="error-cvv">{validInput.cvv && (cvv?(cvv.length==3 ? '':'Please fill the CVV'):'Please fill the CVV')}</span>
                    </div>

                </div>
            </div>
            <div class="termsCondition">
                <p>Terms and Condition :</p>
                <span class="agreeTerm">
                    <input type="radio" class="radio" onClick={()=>handleTermCond('agree')} checked={agree ? true : false} name="radio" id="agree"/><label for="">Agree</label>
                </span>
                <span class="dontAgreeTerm">
                    <input type="radio" class="radio" onClick={()=>handleTermCond('dontAgree')} checked={dontAgree ? true : false} name="radio" id="dontAgree"/><label for="">Don't Agree</label>
                </span>
            </div>
            <button>Procced To Checkout</button>
        </form>
    </div>
    <Modal title="Please Check Billing Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Requerment</th>
      <th scope="col">You Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Name</th>
      <td>{name}</td>
    </tr>
    <tr>
      <th>Email</th>
      <td>{email}</td>
    </tr>
    <tr>
    <th>Phone no</th>
      <td>{phno}</td>
    </tr>
    <tr>
    <th>Card Name</th>
      <td>{cardName}</td>
    </tr>
    <tr>
    <th>Credit Card  Number</th>
      <td>{creditCardNumber}</td>
    </tr>
    <tr>
    <th>Exp Month Year</th>
      <td>{expMonthYear}</td>
    </tr>
    <tr>
    <th>CVV</th>
      <td>{cvv}</td>
    </tr>
    <tr>
    <th>Address</th>
      <td>{`${country} - ${state}`}</td>
    </tr>
    <tr>
    <th>Terms Condition</th>
      <td>{termsCondition}</td>
    </tr>
  </tbody>
</table>
      </Modal>
    <div style={{marginTop:'50px'}}>
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
        billingDetailsDispatch:(data)=>dispatch(billingDetailsAdd(data)),
        reqAddDetailsToFormDispatch:(data)=>dispatch(addBillingToForm(data)),
        fetchDataCheckDispatch:(data)=>dispatch(fetchCheckChange(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (BillingForm)