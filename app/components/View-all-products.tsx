'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

export const ViewAll = () => {

  //*****************  STATES ********************* //


  const [products, setProducts] = useState<any[]>([]);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [isEditActive, setIsEditActive] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    type: "",
    color: "",
    stock: 0,
    brand: "",
    active: false
  })

  useEffect( () => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          setScrollTop(true);
        } else {
          setScrollTop(false);
        }
    });
  }, []);

  useEffect( () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditActive !== null) {
        setIsEditActive(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditActive]);

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
      setProducts([]);
    } else {
      const response = await axios.get("https://musicstorecrudserver-production.up.railway.app/api/list");
      const allProducts = response.data;
      setProducts(allProducts);
      setIsDataVisible(true);
    }
  };

  const handleIsEditActive = (i:any) => {
    setIsEditActive(i);
  };

  const handleEditProduct = async (e:any, i:any) => {
    e.preventDefault()
    try {
      const idOfProduct:any = products[i]
      console.log(idOfProduct)
      await axios.put(`https://musicstorecrudserver-production.up.railway.app/api/edit/${idOfProduct._id}`, editProduct)

      setIsEditActive(null)

      toast.success('Item Successfully edited!')
    } catch (error) {
      console.log(error)
      toast.error('Please verify your input')
    }
  }

//*****************  RETURN ********************* //

  return (
    <main className="relative grid place-items-center h-[100%]">
      <button
        onClick={handleProducts}
        className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 min-w-[12rem]"
        >{isDataVisible ? "Hide products" : "View all products"}
      </button>

      {isDataVisible && (
      <div className="grid grid-cols-1 gap-[2rem]">
        {products.map((product: any, i) => (
        <div
          key={i}
          className="border-[2px] border-primary rounded-md p-[.4rem] text-gray-100 mb-[1rem] grid gird-cols-2"
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
              className="mx-auto btn bg-primary border-none my-[.5rem] text-gray-90"
              onClick={ () => {handleIsEditActive(i)} }>
              Edit
            </button>
          </>
        )}

        {isEditActive === i && (
          <form
            onSubmit={ (e) => {{handleEditProduct(e, i)}} }
            className="flex flex-col justify-center mt-[1rem]"
          >
            <input
              type="text"
              id="name"
              placeholder="enter instrument name"
              className="input mb-[.5rem] focus:border-[2px] focus:border-primary text-gray-400 text-center"
              onChange={(e) => setEditProduct((prevData) => ({...prevData, name: e.target.value }) )}
            />

            <select
              className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary text-center"
              id="type"
              onChange={(e) => setEditProduct((prevData) => ({...prevData, type: e.target.value }) )}
            >
              <option disabled selected>Instrument type</option>
              <option value="stringed">stringed</option>
              <option value="wind">wind</option>
              <option value="percussion">percussion</option>
            </select>

            <input
              type="text"
              id="color"
              placeholder="enter color"
              className="input mb-[.5rem] focus:border-[2px] focus:border-primary text-gray-400 text-center"
              onChange={(e) => setEditProduct((prevData) => ({...prevData, color: e.target.value }) )}
            />

            <input
              type="number"
              id="stock"
              placeholder="enter stock"
              className="input mb-[.5rem] text-gray-400 text-center focus:border-[2px] focus:border-primary"
              onChange={(e: any) => setEditProduct((prevData) => ({ ...prevData, stock: e.target.value }) )}
            />

            <select
              id="brand"
              className="select mb-[.5rem] text-gray-400 font-normal text-[1rem] focus:border-[2px] focus:border-primary text-center"
              onChange={(e) => setEditProduct((prevData) => ({...prevData, brand: e.target.value }) )}
            >
              <option disabled selected>choose Brand</option>
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
                onChange={(e: any) => setEditProduct((prevData) => ({...prevData, active: e.target.checked }) )}
              
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

            

          </form>
        )}
      </div>
      ))}
      </div>
      )}

      {scrollTop &&
      <FaArrowUp 
        className="text-primary h-[2rem] w-[2rem] fixed bottom-[2rem] right-[2rem] cursor-pointer"
        onClick={scrollBack}
        />}

      <Toaster/>
    </main>
  );
};