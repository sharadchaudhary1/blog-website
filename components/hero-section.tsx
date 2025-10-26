
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-8 text-center">
           <div className="relative w-full h-40 sm:h-72 md:h-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
             <Image
               src="/blogsphere-thumbnail.jpeg"
               alt="BlogSphere Banner"
               fill
               priority
               className="object-cover"
             />
             <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-black">
               <h1 className="text-3xl md:text-4xl font-bold">Welcome to BlogSphere</h1>
               <p className="mt-2 text-sm md:text-base text-gray-900">
                 Discover the latest stories, trends, and insights from top writers.
               </p>
             </div>
           </div>
         </section>
  )
}

export default HeroSection