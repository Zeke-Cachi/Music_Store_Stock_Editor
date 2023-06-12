'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export const Header = () => {
  
  const pathname = usePathname()

  return (
    <header className="bg-gray-900 h-[6rem] border-[1px] border-gray-100 flex items-center ps-[1rem]">
      
    <div 
      className="btn btn-square btn-ghost">
      
    <div className="dropdown">
      <button className="btn btn-square btn-ghost">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          className="inline-block w-5 h-5 stroke-current text-gray-100 h-[3rem] w-[3rem]">
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">
            </path>
        </svg>
      </button>

      <ul tabIndex={0} className="dropdown-content shadow bg-primary rounded-md w-[11rem] h-[2.5rem] grid place-items-center">
        <li>
          {pathname !== '/advanced-search' ? 
          <Link href="/advanced-search">Advanced Search</Link> :
          <Link href="/">Create, edit or delete</Link>}
        </li>
      </ul>

    </div>

      
    </div>

  </header>
  )
}
