'use client'
import { useState, useContext } from "react"
import { ProductContext } from "../contexts/productContext";
import EditProducts from "./Edit-products";
import toast, { Toaster } from 'react-hot-toast';

export const SearchByBrand = () => {

  const [storeBrand, setStoreBrand] = useState("")
  const [showResults, setShowResults] = useState(false);

  const {
    products,
    setProducts,
    isEditActive,
    handleIsEditActive,
    handleSearch
    } = useContext(ProductContext);
  

    


  return (
    <main className="px-[1.4rem]">
      <form className="flex flex-row-reverse justify-between">
        
        <select
          className="w-[100%] bg-primary text-gray-900 select mb-[.5rem] font-normal text-[1rem] focus:border-[2px] focus:border-primary text-center]"
          onChange={ (e) => {setStoreBrand(e.target.value), handleSearch(e), setShowResults(true)}}
        >
          <option defaultValue="">Sort by brand</option>
          <option value="Gibson">Gibson</option>
          <option value="Fender">Fender</option>
          <option value="Jackson">Jackson</option>
          <option value="Romantica">Romantica</option>
          <option value="Yamaha">Yamaha</option>
          <option value="King">King</option>
          <option value="Tama">Tama</option>
          <option value="Sonor">Sonor</option>
          <option onClick={ () => {setShowResults(false)} }>Clear Search</option>
        </select>
      </form>

      {showResults && (
      
      <div className="grid grid-cols-1 place-items-center gap-[2rem]">
        {products.map((product: any, i) => (
        <div
          key={i}
          className={`${product.brand === storeBrand ? "block" : "hidden"} border-[2px] border-primary 
          rounded-md p-[.4rem] text-gray-100 mb-[1rem] grid w-[12rem]`}
        >
          <div>
            <p>
              <span className="font-bold">ID:</span> {i}
            </p>
            <p>
              <span className="font-bold">Name:</span> {product.name}
            </p>
            <p>
              <span className="font-bold">Type:</span> {product.type}
            </p>
            <p>
              <span className="font-bold">Color:</span> {product.color}
            </p>
            <p className={`${product.stock === 0 ? "text-red-500 font-bold" : null}`}>
              <span className="font-bold text-gray-100">Stock:</span>{" "}
              {product.stock}
            </p>
            <p>
              <span className="font-bold">Brand:</span> {product.brand}
            </p>

            <div className="w-[100%] grid place-items-center">
              <button
                className="mx-auto btn bg-primary border-none my-[.5rem] text-gray-900"
                onClick={ () => {handleIsEditActive(i)} }>
                Edit
              </button>
            </div>
           

          </div>

          {isEditActive === i && (
          <EditProducts 
            i={i as number}
          />
        )}
        </div>))}


      </div>)}

      <Toaster />
      

    </main>
  )
}

