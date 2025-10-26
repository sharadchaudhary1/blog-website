
import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import Pagination from '@/components/pagination';
import React from 'react'

const QueryBlog = async ({searchParams}:{
  searchParams: { query?: string };
} ) => {

  const blog=searchParams.query

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/query-blog?query=${blog}`;


  const res=await fetch(url)
  const data=await res.json()

  const blogs=data.data||[]

  return (
    <div>

     <Header/>
     <HeroSection/>
     <Pagination blogs={blogs}/>
     <Footer/>

    </div>
  )
}

export default QueryBlog