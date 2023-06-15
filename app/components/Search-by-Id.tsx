'use client'
import React from 'react'
import { useState, useContext, useRef } from 'react'
import { ProductContext } from "../contexts/productContext";
import EditProducts from "./Edit-products";

export const SearchById = () => {
  
//*****************  CONTEXT *********************//
  const {
    products,
    isEditActive,
    handleIsEditActive,
    } = useContext(ProductContext);

//*****************  STATES *********************//
  const [storeId, setStoreId] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const idRef = useRef<HTMLInputElement>(null!);
  
//*****************  FUNCTION *********************//
  const checkNoCoincidences = (e:any) => {
    e.preventDefault();
    idRef.current.value = ""
  }

//*****************  RETURN *********************//
  return (
    <main className="relative grid place-items-center h-[100%]">
    <form 
      className="flex flex-row-reverse justify-center w-[100%] sm:w-[70%] md:w-[60%] lg:w-[40%] 2xl:w-[30%]"
      onSubmit={ (e:any) => {checkNoCoincidences(e)} }>
      <input 
        type="number"
        ref={idRef}
        className="input w-[3.5rem] h-[3rem] mx-auto bg-gray-100 text-gray-900 text-center"
        onChange= {(e:React.ChangeEvent<HTMLInputElement>) => {setStoreId(Number( e.target.value) )} }
        />

      <button
        type="submit"
        className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 w-[12rem] mx-auto"
        onClick={ () => {setShowResults(true)} }>
          Search by Id
      </button>
    </form>

    {showResults && (
    
    <div className="animate-show grid grid-cols-1 gap-[2rem]">

      <button
        onClick={ () => {setShowResults(false), setStoreId(0)} }
        className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 w-[12rem] mx-auto">
          Hide Results
      </button>

      {products.map((product: any, i) => (
      <div
        key={i}
        className={`${ i === storeId ? "block" : "hidden"} border-[2px] border-primary 
        rounded-md p-[.4rem] text-gray-100 mb-[1rem] grid`}
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

      </div>

      ))}

      {storeId > products.length || storeId < 0 ? 
      <div className='text-primary text-[1.5rem] mb-[2rem]'>No items found</div> :
      null}

    </div>)}

  </main>
  )
}

