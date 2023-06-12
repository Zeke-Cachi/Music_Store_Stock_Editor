import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Stock management',
  description: 'Generic Music Store stock management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={montserrat.className}
        suppressHydrationWarning={true}
      >{children}</body>
    </html>
  )
}
