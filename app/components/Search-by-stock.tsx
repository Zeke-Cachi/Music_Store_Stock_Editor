'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const SearchByStock = () => {
  
  const [stockSearch, setStockSearch] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);


  useEffect( () => {
    products.length === 0 ? toast.error('There´s no products with that stock') : null
  }, [products])

  const handleSearchStock = async (e:any) => {
    e.preventDefault();
    try {
      const result:any = await axios.get(`https://musicstorecrudserver-production.up.railway.app/api/list/`);
      const searchByStock = result.data
      setProducts(searchByStock)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main>
      <form 
        onSubmit={handleSearchStock}>
        <input 
          type="number"
          onChange= {(e:React.ChangeEvent<HTMLInputElement>) => {setStockSearch(Number( e.target.value) )} }
          />

        <button
          type="submit"
          className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 min-w-[12rem]"
          onClick={ () => {setShowResults(!showResults)} }>
          Search by stock
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
          </div>
        </div>))}
      </div>)}

    <Toaster/>
    </main>
  )
}

export default SearchByStock






