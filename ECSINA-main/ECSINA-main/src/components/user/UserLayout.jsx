'use client'
import React from 'react'
import UserHeader from './UserHeader'
import { buttons, buttons1 } from './userDb'
import ButtonUser from './ButtonUser'
import ButtonsMobile from './ButtonsMobile'
import { usePathname } from 'next/navigation'

const UserLayoutComponent = ({children}) => {
  const pathname=usePathname()
  return (
  <div className=' '>
    <UserHeader/>
    <div className="flex items-center justify-between mt-[20px]  container mx-auto h-full">
        {pathname.startsWith('/user/my-documents')?buttons1.map((b) => (
          <ButtonUser key={b.id} {...b} />
        )):pathname==='/user'|| pathname.startsWith('/user/home')&&buttons.map((b) => (
          <ButtonUser key={b.id} {...b} />
        ))}
      </div>
    <main>
      {children}
    </main>
   <div className='mt-[50px] md:hidden pb-[10px]'>
        <ButtonsMobile/>
   </div>
  </div>
  )
  
}

export default UserLayoutComponent