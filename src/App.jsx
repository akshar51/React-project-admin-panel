import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Form from './pages/Form'
import Datatable from './pages/Datatable'

const App = () => {

  const [product, setProduct] = useState({});
  const [list, setList] = useState([]);
  const [godown, setGodown] = useState([]);
  const [editId,setEditId] = useState(-1)
  const navigate = useNavigate();


  useEffect(() => {
    let oldData = JSON.parse(localStorage.getItem("product")) || [];
    setList(oldData)
  }, []);
  

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

    if(editId == -1){
      let data = [...list,{...product,id: Date.now()}];
      setList(data);
      localStorage.setItem("product",JSON.stringify(data))
    }
    else{
      let data = list.map((item)=>{
        if(item.id == editId){
          return {...product , id : editId}
        }
        return item;
      })
      setList(data);
      localStorage.setItem("product",JSON.stringify(data))
    }
      setEditId(-1)
    setProduct({})
    setGodown([])
    navigate('/datatable')
  }
  
  const handleDelete = (id)=>{
    let data = list.filter((item)=>item.id != id)
    setList(data);
    localStorage.setItem("product",JSON.stringify(data))
  }

  const handleEdit = (id)=>{
    let data = list.filter((item)=>item.id === id)[0];
    setProduct(data);
    setEditId(id)
    setGodown(data.godown)
    navigate('/form')
  }


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/form' element={
        <Form handleChange = {handleChange} 
        handleSubmit = {handleSubmit}
        product = {product}
        godown={godown}/>
        }/>
      <Route path='/datatable' element={
        <Datatable 
        list={list}
        handleDelete={handleDelete}
        handleEdit={handleEdit}/>
        }/>
    </Routes>
    </>
  )
}

export default App
