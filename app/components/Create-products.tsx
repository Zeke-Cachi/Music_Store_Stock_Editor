'use client'
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

export const CreateProducts = () => {
  
  const [showForm, setShowForm] = useState(false)
  const [addProduct, setAddProduct] = useState({
    name: "",
    type: "",
    color: "",
    stock: 0,
    brand: "",
    active: false
  })

  const handleAddProduct = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post("https://musicstorecrudserver-production.up.railway.app/api/create", addProduct)
      .then(response => { console.log(`item added: ${response.data}`)})

      toast.success('Item Added! Refresh page to see changes')

      setAddProduct({
        name: "",
        type: "",
        color: "",
        stock: 0,
        brand: "",
        active: false
      })

      setShowForm(false)

    } catch(error) {
      console.log(error)
    }
  }

  const handleShowForm = (e:any) => {
    showForm ? setShowForm(false) : setShowForm(true)
    e.preventDefault()
  }

  
  return (

    <div className="grid place-items-center mb-[1rem] h-[100%] w-[100%]">
      <button
        className="btn bg-primary border-none text-gray-900 min-w-[12rem]"
        onClick={handleShowForm}>Add Product</button>

      {showForm && 
      <form 
        onSubmit={handleAddProduct}
        className="animate-show flex flex-col justify-center mt-[1rem]">

        <input 
          type="text" 
          id="name"
          value={addProduct.name}
          placeholder="enter instrument name"
          className="input mb-[.5rem] focus:border-[2px] focus:border-primary"
          onChange={ (e) => setAddProduct( (prevData) => ({...prevData, name: e.target.value}) )} />

        <select 
          className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary"
          id="type"
          onChange={ (e) => setAddProduct( (prevData) => ({...prevData, type: e.target.value}) )}>
          <option defaultValue="">Instrument type</option>
          <option value="stringed">stringed</option>
          <option value="wind">wind</option>
          <option value="percussion">percussion</option>
        </select>

        <input 
          type="text" 
          id="color"
          value={addProduct.color}
          placeholder="enter instrument color"
          className="input mb-[.5rem] focus:border-[2px] focus:border-primary"
          onChange={ (e) => setAddProduct( (prevData) => ({...prevData, color: e.target.value}) )} />

        <input 
          type="number" 
          id="stock"
          value={addProduct.stock}
          placeholder="enter stock"
          className="input mb-[.5rem] text-gray-400 text-center focus:border-[2px] focus:border-primary"
          onChange={ (e:any) => setAddProduct( (prevData) => ({...prevData, stock: e.target.value}) )} />

        <select 
          id="brand"
          className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary"
          onChange={ (e) => setAddProduct( (prevData) => ({...prevData, brand: e.target.value}) )} >
            <option disabled selected>choose Brand</option>
            {addProduct.type === "stringed" ? 
            <>
              <option value="Gibson">Gibson</option>
              <option value="Fender">Fender</option>
              <option value="Jackson">Jackson</option>
              <option value="Romantica">Romantica</option>
            </> :
            addProduct.type === "wind" ?
            <>
              <option value="Yamaha">Yamaha</option>
              <option value="King">King</option>
            </> :
            addProduct.type === "percussion" ?
            <>
              <option value="Tama">Tama</option>
              <option value="Sonor">Sonor</option>
            </> :
            null}
        </select>

        <div className="mx-auto w-[100%] flex justify-around w-[60%]">
          <label 
          htmlFor="active"
          className="text-gray-100 font-bold">Active?: </label>
          
          <input 
            type="checkbox" 
            id="active"
            checked={addProduct.active}
            className="checkbox bg-gray-100 h-[1rem] w-[1rem] my-auto"
            onChange={ (e:any) => setAddProduct( (prevData) => ({...prevData, active: e.target.checked}) )} />
        </div>
        
        <button
          type="submit"
          className="mx-auto btn bg-primary border-none text-gray-900 w-[8rem] mt-[1rem]"
          >Add product
        </button>

      </form>}

      <Toaster/>
    </div>
    
  )
}

