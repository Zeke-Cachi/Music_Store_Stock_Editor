import { ViewAll } from "./components/View-all-products"
import { Header } from "./components/Header"
import { DeleteProducts } from "./components/Delete-products"
import { CreateProducts } from "./components/Create-products"

export default function Home() {


  return (
    
    <>
      <Header />

      <main className="pt-[1rem] pb-[15rem] px-[.5rem] bg-gray-900 min-h-screen">
          <h1 className="mt-[1rem] text-[1.6rem] mb-[3rem] text-center font-bold text-gray-100">Generic Music Store stock management system</h1>

          <ViewAll />

          <CreateProducts />

          <DeleteProducts />
        
        </main>
    </>
  )
}
