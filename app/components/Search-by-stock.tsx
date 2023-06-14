'use client'
import { useState, useContext, useRef, useEffect } from "react";
import { ProductContext } from "../contexts/productContext";
import EditProducts from "./Edit-products";
import toast, { Toaster } from 'react-hot-toast';

const SearchByStock = () => {

    //*****************  CONTEXT *********************//
    const {
      products,
      isEditActive,
      handleIsEditActive
      } = useContext(ProductContext);
  

  //*****************  USESTATES *********************//
  const [stockSearch, setStockSearch] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [noItemsFound, setNoItemsFound] = useState(false);


  useEffect(() => {
    // Check if any product matches the stock search
    const foundItems = products.some((product: any) => product.stock === stockSearch);
    setNoItemsFound(!foundItems);
  }, [products, stockSearch]);


//*****************  FUNCTION *********************//
const checkNoCoincidences = (e:any) => {
  e.preventDefault();
  inputRef.current.value = ""
}

  //*****************  RETURN *********************//
  return (
    <main className="relative grid place-items-center h-[100%]">

      <form 
        className="flex flex-row-reverse justify-around w-[100%]"
        onSubmit={ (e:any) => {checkNoCoincidences(e)} }>
        <input 
          type="number"
          ref={inputRef}
          className="input w-[3.5rem] h-[3rem] mx-auto bg-gray-100 text-gray-900 text-center"
          onChange= {(e:React.ChangeEvent<HTMLInputElement>) => { setStockSearch(Number( e.target.value)) }}
          />

        <button
          type="submit"
          onClick={ () => {setShowResults(true)} }
          className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 w-[12rem] mx-auto">
            Search by stock
        </button>
      </form>

      {showResults && (
      <div className="grid grid-cols-1 gap-[2rem]">

        <button
          onClick={ () => {setShowResults(false), setStockSearch(0)} }
          className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 w-[12rem] mx-auto">
            Hide Results
        </button>

        {products.map((product: any, i) => (
        <div
          key={i}
          className={`${product.stock === stockSearch ? "block" : "hidden"} border-[2px] border-primary 
          rounded-md p-[.4rem] text-gray-100 mb-[1rem] grid relative`}
        >
          <div className="z-20">
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

        {noItemsFound && showResults && (
        <div className="text-center text-primary text-[1.5rem] mb-[2rem]">
          No items found.
        </div>
      )}

      </div>)}

      <Toaster />
    </main>
  )
}

export default SearchByStock






