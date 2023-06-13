import { Header } from "../components/Header"
import SearchByStock from "../components/Search-by-stock"
import { SearchByBrand } from "../components/Search-by-brand"

const advancedSearch = () => {
  return (
    <>
      <Header />

      <main className="py-[1rem] px-[.5rem] bg-gray-900 min-h-screen">
        <h1 className="mt-[1rem] text-[1.6rem] mb-[3rem] text-center font-bold text-gray-100">Generic Music Store stock management system</h1>

        <SearchByStock />

        <SearchByBrand />

        
        </main>
    </>
  )
}

export default advancedSearch