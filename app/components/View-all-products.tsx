'use client'
import { useContext } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { ProductContext } from "../contexts/productContext";
import EditProducts from "./Edit-products";

export const ViewAll = () => {

  //*****************  CONTEXT ********************* //
  
  const {
    products,
    setProducts,
    isDataVisible,
    setIsDataVisible,
    scrollTop,
    isEditActive,
    handleIsEditActive
    } = useContext(ProductContext)

   //*****************  FUNCTIONS ********************* //

  const scrollBack = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleProducts = async () => {
    if (isDataVisible) {
      setIsDataVisible(false);
    } else {
      const response = await axios.get("https://musicstorecrudserver-production.up.railway.app/api/list");
      const allProducts = response.data;
      setProducts(allProducts);
      setIsDataVisible(true);
    }
  };

//*****************  RETURN *********************//

  return (
    <main className="relative grid place-items-center h-[100%]">
      <button
        onClick={handleProducts}
        className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 min-w-[12rem]"
        >{isDataVisible ? "Hide products" : "View all products"}
      </button>

      {isDataVisible && (
      <div className="flex justify-around basis-[100%] flex-wrap">
        {products.map((product: any, i) => (
        <div
          key={i}
          className="animate-show border-[2px] border-primary rounded-md p-[.4rem] text-gray-100 m-[1rem] grid min-w-[15rem] min-h-[16rem]"
        >
        {isEditActive !== i && (
          <>
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

            <button
              className="mx-auto btn bg-primary border-none my-[.5rem] text-gray-900"
              onClick={ () => {handleIsEditActive(i)} }>
              Edit
            </button>
          </>
        )}

        {isEditActive === i && (
          <EditProducts 
            i={i as number}
          />
        )}
      </div>
      ))}
      </div>
      )}

      {scrollTop &&
      <FaArrowUp 
        className="text-primary h-[2rem] w-[2rem] fixed bottom-[10rem] right-[2rem] cursor-pointer"
        onClick={scrollBack}
        />}

      <Toaster/>
    </main>
  );
};