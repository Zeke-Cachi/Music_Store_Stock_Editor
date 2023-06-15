'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { GoAlert } from "react-icons/go";
import toast, { Toaster } from 'react-hot-toast';

export const DeleteProducts = () => {

  const [viewForm, setViewForm] = useState(false)
  const [saveId, setSaveId] = useState("")
  const [confirm, setConfirm] = useState(false)
  const [middleScreen, setMiddleScreen] = useState(false)


  const handleDeleteForm = () => {
    viewForm ? setViewForm(false) : setViewForm(true)
  }

  const handleConfirm = (e:any) => {
    confirm ? setConfirm(false) : setConfirm(true)
    e.preventDefault()
  }

  const deleteItem = async (e:any) => {
    e.preventDefault()
    try {
      const response = await axios.get("https://musicstorecrudserver-production.up.railway.app/api/list");
      const allProducts = response.data;
      const itemToDelete = allProducts[saveId]
      const deleteRequest = await axios.delete(`https://musicstorecrudserver-production.up.railway.app/api/delete/${itemToDelete._id}`)
      setConfirm(false)
      toast.success('Item Deleted! Refresh page to view changes')
      setSaveId("")
    } catch (error) {
      console.log(error)
    }
  }

  



  return (
    <main className="flex justify-center items-center flex-col h-[100%] relative">

      <button
        className="btn bg-primary border-none mb-[1rem] text-gray-900 w-[12rem]"
        onClick={handleDeleteForm}
        >Delete Product
      </button>

      <form 
        className={`animate-show mt-[1rem] flex flex-col text-center justify-around h-[10rem] ${viewForm ? "block" : "hidden"}`}>
        <label 
          htmlFor="delete-form"
          className="text-gray-100 font-bold"
          >Select product ID
        </label>
        
        <input 
          type="text"
          id="delete-form"
          value={saveId}
          placeholder='enter ID'
          onChange={ (e) => {setSaveId(e.target.value)}}
          className="h-[3rem] w-[7rem] rounded-md text-center italic mx-auto bg-gray-100 outline-none focus:border-[2px] focus:border-primary" />
        
        <button 
          type='submit'
          onClick={handleConfirm}
          className="btn bg-primary border-none btn-md mb-[1rem] text-gray-900 mx-auto w-[6rem] "
          >Delete
        </button>

      </form>

      {confirm && 
        <div className="text-center alert bg-primary w-[18rem] sm:w-[22rem] md:w-[24rem] absolute top-[50%] left-[50%] translate-y-[-100%] 
        translate-x-[-50%] border-[2px] border-gray-100 flex flex-col">
          <GoAlert className="text-gray-900"/>
          <span>Are you sure you want to delete this item?</span>
          
          <div className='flex justify-around w-[100%]'>
            <button 
              className="btn btn-sm bg-gray-100 text-gray-900"
              onClick={ (e) => {handleDeleteForm(); handleConfirm(e);} }>Cancel</button>
            
            <button 
              className="btn btn-sm bg-gray-100 text-gray-900"
              onClick={ (e) => {deleteItem(e); handleDeleteForm(); handleConfirm(e);} }
              >Confirm
            </button>
          </div>
        </div>}

        <Toaster/>
    </main>
  )
}

