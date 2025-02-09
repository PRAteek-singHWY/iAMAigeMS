// Step-1 setting up routing for our application in App.jsx

import React from 'react'
import { BrowserRouter, Link, Route, Routes }
  from "react-router-dom"
import { logo } from "./assets"
import { Home, CreatePost } from './pages'
const App = () => {
  return (
    <BrowserRouter>
      {/* header consisiting o fthe top elemnts of our coponent with the app l ogo and other elements like navaigational links */}
      <header className="w-full justify-between flex items-center bg-[#F59E0B] sm:px-8 px-4 py-4 border-b border-b-[#F59E0B]  ">
        <Link to="/">
          <img
            src={logo}
            alt={logo}
            className="w-28  object-contain"
          />
        </Link>
        <div className=' flex items-center' >
        <Link
          to="/create-post"
          className="font-inter font-medium bg-black text-[#F59E0B] px-4 py-2 rounded-md hover:bg-[#F59E0B] hover:text-black hover:border 
          hover:border-black mr-5">
          Create
        </Link>
        <Link
          to="/"
          className="font-inter font-medium bg-black text-[#F59E0B] px-4 py-2 rounded-md hover:bg-[#F59E0B] hover:text-black hover:border 
          hover:border-black">
          Home
        </Link>
        </div>
      </header>

      {/* main is used to denote the main content of the component */}
      <main className="sm:p-8 px-4 py-8 w-full 
bg-black min-h-[calc(100vh-73px)]
 "  >
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>

      </main>
    </BrowserRouter>




  )
}

export default App