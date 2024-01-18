import { useState } from "react"
import { projectFirestore } from "./firebase/config"

function FormToFB(){
    const [category,setCategory] = useState('')
    const [features,setFeatures] = useState('')
    const [price,setPrice] = useState('')
    const [productDetails,setProductDetails] = useState('')
    const [sampleImages,setSampleImages] = useState('')
    const [spareName,setSpareName] = useState('')
    const [stock,setStock] = useState('')
    const [thumbNail,setThumbNail] = useState('')

    // specifications
    const [height,setHeight] = useState('')
    const [length,setLength] = useState('')
    const [width,setWidth] = useState('')
    const [countryOfOrigin,setCountryOfOrigin] = useState('')

    // sampleImages List
    const [sampleImgList,setSampleImgList] = useState([])


    function handleAddSampleImages(){
        if(sampleImgList.length<3){
            if(sampleImages){
                let newArry = [...sampleImgList,sampleImages]
                setSampleImgList(newArry)
                setSampleImages('')
            }else{
                alert('sampleImages not to be empty')
            }
           
        }else{
            setSampleImages('')
            alert('sampleImgList 3 is ok')
        }
    }


  async function handleSubmit(){
        if(category && features && price && productDetails && sampleImgList.length && spareName && stock && thumbNail && height && length && width && countryOfOrigin){
          let backEndData =  {
                category,
                features,
                price,
                productDetails,
                sampleImages:sampleImgList,
                spareName,
                stock,
                thumbNail,
                specifications:{height,length,width,countryOfOrigin}
            }

           await projectFirestore.collection('ASPR').add(backEndData).then(()=>{
            console.log('Data Sended')
           }).catch((err)=>{
            console.log(err.message)
           })
            setCategory('')
            setFeatures('')
            setPrice('')
            setProductDetails('')
            setSampleImages('')
            setSpareName('')
            setStock('')
            setThumbNail('')
            // specifications
            setHeight('')
            setLength('')
            setWidth('')
            setCountryOfOrigin('')
            // sampleImages List
            setSampleImgList([])
        }else{
            alert('please mentain all details')
        }
       

    }

    return(
        <div className="container">
          
            <div className="text-center">
            <h2>Backend Data</h2>
            </div>
            <label htmlFor="">category</label>
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className="form-control"/>
            <label htmlFor="">features</label>
            <input type="text" className="form-control" value={features} onChange={(e)=>setFeatures(e.target.value)}/>
            <label htmlFor="">price</label>
            <input type="number" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <label htmlFor="">productDetails</label>
            <input type="text" className="form-control" value={productDetails} onChange={(e)=>setProductDetails(e.target.value)}/>
            <label htmlFor="">sampleImages</label>
            
            <div className="row">
                <div className="col-10">
                <input type="text" className="form-control" value={sampleImages} onChange={(e)=>setSampleImages(e.target.value)}/>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleAddSampleImages}>Add</button> <b>{sampleImgList.length}</b>
                </div>
            </div>
            <label htmlFor="">spareName</label>
            <input type="text" className="form-control" value={spareName} onChange={(e)=>setSpareName(e.target.value)}/>
            <h4>specifications</h4>
            <div class="row">
            <div class="col">
                <label htmlFor="">height</label>
            <input type="number" className="form-control" value={height} onChange={(e)=>setHeight(e.target.value)}/>
            </div>
            <div class="col">
            <label htmlFor="">length</label>
            <input type="number" className="form-control" value={length} onChange={(e)=>setLength(e.target.value)}/>
            </div>
            <div class="col">
            <label htmlFor="">width</label>
            <input type="number" className="form-control" value={width} onChange={(e)=>setWidth(e.target.value)}/>
            </div>
            <div class="col">
            <label htmlFor="">countryOfOrigin</label>
            <input type="text" className="form-control" value={countryOfOrigin} onChange={(e)=>setCountryOfOrigin(e.target.value)}/>
            </div>
        </div>
        <label htmlFor="">stock</label>
            <input type="text" className="form-control" value={stock} onChange={(e)=>setStock(e.target.value)}/>
            <label htmlFor="">thumbNail</label>
            <input type="text" className="form-control" value={thumbNail} onChange={(e)=>setThumbNail(e.target.value)}/>

            <div className="text-center mt-3">
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}


export default FormToFB