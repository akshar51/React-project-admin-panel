import React, { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Form from './pages/Form'
import Datatable from './pages/Datatable'

const App = () => {

  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [godown, setGodown] = useState([]);
  
  const handleChange = (e)=>{
    let {name,value,checked,files} = e.target;

    if(name == "godown"){
      let newGodown = [...godown]
      if(checked){
        newGodown.push(value)
      }
      else{
        newGodown = newGodown.filter((val)=> val != value)
      }
      setGodown(newGodown);
      value = newGodown
    }

    // if(name == "product_image"){
    //   let file = files[0];
    //   let reader = new FileReader()

    //   reader.onloadend = ()=>{
    //     let fileData = {
    //       name : ,
    //       type : ,
    //       url : 
    //     }
    //   }
    // }

  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  }



  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/form' element={
        <Form handleChange = {handleChange} 
        handleSubmit = {handleSubmit}
        product = {product}/>
        }/>
      <Route path='/datatable' element={<Datatable/>}/>
    </Routes>
    </>
  )
}

export default App
