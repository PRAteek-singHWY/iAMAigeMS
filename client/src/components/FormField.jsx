import React from 'react'
import { BrowserRouter, Link, Route, Routes }
  from "react-router-dom"
function FormField(
  { LabelName, type, placeholder, name, value, handleChange, isSurpriseMe, handleSurpriseMe }
) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm text-[#F59E0B]"
        >
          {LabelName}
          {isSurpriseMe &&
            <button 
            onClick={handleSurpriseMe}
            type="button" className="font-semibold text-xs  ml-4 py-1 px-3 rounded-[5px] text-yellow-300 bg-[#da27e7] ">
              SurPriSE Me
            </button>
          }
        </label>
      </div>
      <input
      type = {type}
      id={name}
      name={name}
      placeholder={placeholder}
      value = {value}
      onChange={handleChange}
      required
      className="bg-[#efece7] border border-[#F59E0B] text-gray-900 text-sm rounded-lg focus:ring-[#F59E0B] focus:border-[#F59E0B]
      outline-none block w-full p-3 "
      />
    </div>
  )
}

export default FormField