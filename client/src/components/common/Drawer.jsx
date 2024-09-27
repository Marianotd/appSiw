import React from 'react'
import { useAppStore } from '../../context/useAppStore'
import { IoMdClose } from "react-icons/io";
import LinkList from '../list/LinkList'

export default function Drawer({ state, data, drawerRef, handleState }) {
  const { userDetail } = useAppStore()

  return (
    <div
      ref={drawerRef}
      role='dialog'
      aria-hidden={!state}
      className={`
                lg:hidden absolute top-0 border-s border-[#444] w-1/2 h-screen z-50 bg-[#3B82F6] flex flex-col py-8 px-4 gap-6 ease-linear duration-300 
                ${state ? 'right-0' : ' -right-full '} 
            `}
    >
      <div className='flex justify-between items-center ps-4'>
        <h1 className='max-w-[75%] truncate text-xl font-bold text-white tracking-wide'>
          {userDetail.firstName}
        </h1>

        <button
          className={`w-[36px] lg:hidden text-4xl text-white`}
          type="button"
          onClick={() => handleState(false)}
          aria-expanded={open}
          aria-controls="drawer"
        >
          <IoMdClose />
        </button>
      </div>

      <LinkList
        data={data}
        isDrawer={true}
      />

      <button
        className='rounded-xl text-center text-white w-full text-lg py-2 font-bold mt-auto'
        onClick={() => console.log('Click')}
      >
        Cerrar sesión
      </button>
    </div>
  )
}