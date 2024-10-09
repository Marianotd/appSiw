import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../context/useAppStore'
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import LinkList from '../list/LinkList'

export default function Drawer({ state, data, drawerRef, handleState }) {
  const navigate = useNavigate()
  const { userDetail, logoutStore } = useAppStore()
  const [width, setWidth] = useState(window.innerWidth);

  const handleLogout = async () => {
    const isClosed = await logoutStore()
    if (isClosed) {
      navigate('/auth/login')
    } else {
      alert('Algo salió mal')
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth >= 768 && state) {
        handleState(false);
      }
      setWidth(newWidth);
    }

    window.addEventListener("resize", handleResize);
    handleState(false)
  }, [width])

  return (
    <div
      ref={drawerRef}
      role='dialog'
      className={`
                lg:hidden absolute top-0 right-0 border-[#444]  h-screen z-50 bg-[#3B82F6] flex flex-col gap-6 ease-linear duration-150 
                ${state ? 'w-1/2 py-8 px-4 border-s' : ' w-0 p-0 overflow-hidden'} 
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
        className='rounded-xl text-center text-white w-full text-lg py-2 font-bold mt-auto mb-10'
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  )
}