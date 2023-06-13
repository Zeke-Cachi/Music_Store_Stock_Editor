'use client'
import { useState, useEffect, createContext } from "react";
import axios from "axios";

//*****************  DECLARING INTERFACES *********************//

interface ProductContextValue {
  products: any[];
  setProducts: (products: any[]) => void;
  isDataVisible: boolean;
  setIsDataVisible: (isDataVisible: boolean) => void;
  scrollTop: boolean;
  setScrollTop: (scrollTop: boolean) => void;
  isEditActive: any;
  setIsEditActive: (isEditActive: any) => void;
  editProduct: any;
  setEditProduct: (editProduct: any) => void;
  handleIsEditActive: Function,
  handleSearch: Function
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue);

export interface editProductValue {
name: string;
type: string;
color: string;
stock: number;
brand: string;
active: boolean}

const ProductProvider = ( {children}: { children: React.ReactNode } ) => {

//*****************  USESTATES *********************//
  
  const [products, setProducts] = useState<any[]>([]);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [isEditActive, setIsEditActive] = useState(null);
  const [editProduct, setEditProduct] = useState<editProductValue>({
    name: "",
    type: "",
    color: "",
    stock: 0,
    brand: "",
    active: false
  })

  //*****************  USEEFFECTS *********************//

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

  const handleIsEditActive = (i:any) => {
    setIsEditActive(i);
  };
  

  const handleSearch = async (e:any) => {
    e.preventDefault();
    try {
      const result:any = await axios.get(`https://musicstorecrudserver-production.up.railway.app/api/list/`);
      setProducts(result.data)
    } catch (error) {
      console.log(error)
    }
  }
//*****************  RETURN *********************//

  return (
    <ProductContext.Provider
      value={{
      products,
      setProducts,
      isDataVisible,
      setIsDataVisible,
      scrollTop,
      setScrollTop,
      isEditActive,
      setIsEditActive,
      editProduct,
      setEditProduct,
      handleIsEditActive,
      handleSearch
      }}
    >{ children }</ProductContext.Provider>
  )
}

export { ProductContext, ProductProvider };