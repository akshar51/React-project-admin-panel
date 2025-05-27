import React, { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Form from './pages/Form'
import Datatable from './pages/Datatable'

const App = () => {

  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [godown, setGodown] = useState([]);
  const [editId,setEditId] = useState(-1)

  const handleChange = (e)=>{
    let {name,value,checked,files} = e.target;

    if(name === "godown"){
      let newGodown = [...godown]
      if(checked){
        newGodown.push(value)
      }
      else{
        newGodown = newGodown.filter((val)=> val != value)
      }
      setGodown(newGodown);
      setProduct({...product,godown : newGodown})
    }
    else if(name === "product_image"){
      let file = files[0];
      let reader = new FileReader()
      reader.onloadend = ()=>{
        let fileData = {
          name : file.name ,
          type : file.type,
          url : reader.result
        }
        setProduct({...product, product_image :fileData})
      }
      reader.readAsDataURL(file)
    }
    else{
      setProduct({...product,[name]:value})
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    let data = [...list,{...product,id: Date.now()}];
    setList(data);
    setProduct({})
  }
  
  const handleDelete = (id)=>{
    let data = list.filter((item)=>item.id != id)
    setList(data);
  }

  const handleEdit = (id)=>{
    let data = list.filter((item)=>item.id === id);
    setProduct(data);
    setEditId(id)
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
      <Route path='/datatable' element={
        <Datatable 
        list={list}
        handleDelete={handleDelete}/>
        }/>
    </Routes>
    </>
  )
}

export default App
