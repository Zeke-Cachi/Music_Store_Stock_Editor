'use client'
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import { editProductValue } from "../contexts/productContext";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const EditProducts = ({i}: {i:number}) => {
  
//*****************  CONTEXT ********************* //
  const {
    products,
    setIsEditActive,
    editProduct,
    setEditProduct
    } = useContext(ProductContext)

//*****************  FUNCTIONS ********************* //

    const handleEditProduct = async (e:any, i:any) => {
      e.preventDefault()
      try {
        const idOfProduct:any = products[i]
        console.log(idOfProduct)
        await axios.put(`https://musicstorecrudserver-production.up.railway.app/api/edit/${idOfProduct._id}`, editProduct)
  
        setIsEditActive(null)
  
        toast.success('Item Successfully edited! Please refresh page to view changes')
      } catch (error) {
        console.log(error)
        toast.error('Please verify your input')
      }
    }

    //*****************  RETURN *********************//
  
  return (
    <form
      onSubmit={ (e) => {{handleEditProduct(e, i)}} }
      className="animate-show flex flex-col justify-center mt-[1rem]"
    >
      <input
        type="text"
        id="name"
        placeholder="enter instrument name"
        className="input mb-[.5rem] focus:border-[2px] focus:border-primary text-gray-400 text-center bg-gray-100"
        onChange={(e) => setEditProduct((prevData:editProductValue) => ({...prevData, name: e.target.value }) )}
      />

      <select
        className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary text-center bg-gray-100"
        id="type"
        onChange={(e) => setEditProduct((prevData:editProductValue) => ({...prevData, type: e.target.value }) )}
      >
        <option defaultValue="">Instrument type</option>
        <option value="stringed">stringed</option>
        <option value="wind">wind</option>
        <option value="percussion">percussion</option>
      </select>

      <input
        type="text"
        id="color"
        placeholder="enter color"
        className="input mb-[.5rem] focus:border-[2px] focus:border-primary text-gray-400 text-center bg-gray-100"
        onChange={(e) => setEditProduct((prevData:editProductValue) => ({...prevData, color: e.target.value }) )}
      />

      <input
        type="number"
        id="stock"
        placeholder="enter stock"
        className="input mb-[.5rem] text-gray-400 text-center focus:border-[2px] focus:border-primary bg-gray-100"
        onChange={(e: any) => setEditProduct((prevData:editProductValue) => ({ ...prevData, stock: e.target.value }) )}
      />

      <select
        id="brand"
        className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary text-center bg-gray-100"
        onChange={(e) => setEditProduct((prevData:editProductValue) => ({...prevData, brand: e.target.value }) )}
      >
        <option defaultValue="">choose Brand</option>
        {editProduct.type === "stringed" ? (
          <>
            <option value="Gibson">Gibson</option>
            <option value="Fender">Fender</option>
            <option value="Jackson">Jackson</option>
            <option value="Romantica">Romantica</option>
          </>
        ) : editProduct.type === "wind" ? (
          <>
            <option value="Yamaha">Yamaha</option>
            <option value="King">King</option>
          </>
        ) : editProduct.type === "percussion" ? (
          <>
            <option value="Tama">Tama</option>
            <option value="Sonor">Sonor</option>
          </>
        ) : null}
      </select>

      <div className="mx-auto w-[100%] flex justify-around w-[60%]">
        <label htmlFor="active" className="text-gray-100 font-bold">
          Active?:
        </label>

        <input
          type="checkbox"
          id="active"
          checked={editProduct.active}
          className="checkbox bg-gray-100 h-[1rem] w-[1rem] my-auto"
          onChange={(e: any) => setEditProduct((prevData:editProductValue) => ({...prevData, active: e.target.checked }) )}
        
        />
      </div>

      <div className="flex justify-between">
          <button
          type="submit"
          className="mx-auto btn bg-primary border-none text-gray-900 max-w-[5rem] mt-[1rem] leading-[1.2rem]"
          onClick={ (e) => {handleEditProduct(e, i)} } 
        >
          Edit product
        </button>
        
        <button
          className="mx-auto btn bg-primary border-none text-gray-900 max-w-[5rem] mt-[1rem]"
          onClick={ () => {setIsEditActive(null)} } 
        >
          Cancel
        </button>
      </div>

      <Toaster />
    </form>
    
  )
}

export default EditProducts