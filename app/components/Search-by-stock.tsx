'use client'
import { useState, useContext } from "react";
import axios from "axios";
import { ProductContext } from "../contexts/productContext";
import EditProducts from "./Edit-products";
import toast, { Toaster } from 'react-hot-toast';

const SearchByStock = () => {

  //*****************  USESTATES *********************//
  
  const [stockSearch, setStockSearch] = useState(0);
  const [showResults, setShowResults] = useState(false);

  //*****************  CONTEXT *********************//
  const {
    products,
    isEditActive,
    handleIsEditActive,
    handleSearch
    } = useContext(ProductContext);

//*****************  FUNCTION *********************//


  //*****************  RETURN *********************//
  
  return (
    <main className="relative grid place-items-center h-[100%]">

      <form 
        className="flex flex-row-reverse justify-around w-[100%]"
        onSubmit={ (e) => {handleSearch(e)} }>
        <input 
          type="number"
          className="input w-[3.5rem] h-[3rem] mx-auto bg-gray-100 text-gray-900 text-center"
          onChange= {(e:React.ChangeEvent<HTMLInputElement>) => {setStockSearch(Number( e.target.value) )} }
          />

        <button
          type="submit"
          onClick={ () => {setShowResults(!showResults)} }
          className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 w-[12rem] mx-auto">
          {!showResults ? "Search by stock" : "Hide results"}
        </button>
      </form>

      {showResults && (
      
      <div className="grid grid-cols-1 gap-[2rem]">
        {products.map((product: any, i) => (
        <div
          key={i}
          className={`${product.stock === stockSearch ? "block" : "hidden"} border-[2px] border-primary 
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
        </div>))}


      </div>)}

      <Toaster />
    </main>
  )
}

export default SearchByStock






