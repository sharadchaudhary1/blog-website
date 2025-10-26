"use client";

import { useEffect, useState } from "react";
import { LogOut, PlusCircle, Search, User } from "lucide-react";
import Link from "next/link";
import SignOut from "./signout-button";
import GetCurrentUser from "@/services/get-current-user";
import { useUserStore } from "@/store/useUserStore";


export default function Header() {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const[user,setUser]=useState('')



  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

   useEffect(()=>{
        async function getcurrentuser(){
            const user=await GetCurrentUser()
    
            setUser(user)
        }
        getcurrentuser()
      },[])
    


  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">
            BlogSphere
          </span>
        </Link>

        {/* Search */}
        <form 
        action='/query-blog'
        method="GET"
        className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px]">
          <Search className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            name="query"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none ml-2 w-full text-sm text-gray-700"
          />
        </form>

       
        <div className="flex items-center space-x-4">

          {
            user ? <Link
            href="/create-blog"
            className="bg-orange-600 flex  hover:bg-orange-700 text-white px-4 py-2 rounded-2xl text-sm font-medium transition"
          >
            <PlusCircle height={15} className="mt-0.5" />
           <span> Create Blog</span>
          </Link> : <Link
            href="/login"
            className="bg-orange-600 flex  hover:bg-orange-700 text-white px-4 py-2 rounded-2xl text-sm font-medium transition"
          >
             <PlusCircle height={15} className="mt-0.5" /> 
           <span>Create Blog</span> 
          </Link>

          }     

      

          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Login
          </Link>
                               
          <Link
            href="/get-started"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Get Started
          </Link>

          {/*  Profile */}
          <div className="relative">
        
            <button
              onClick={toggleDropdown}
              className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className=" flex gap-3 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                   <SignOut/>
                  <LogOut className="w-4 h-4 text-gray-800" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
