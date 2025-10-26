



import Footer from '@/components/footer';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import Pagination from '@/components/pagination';
import React from 'react'

type PageProps = {
  searchParams: Promise<{ query?: string }>;
};

const QueryBlog = async ({ searchParams }: PageProps) => {
  const { query } = await searchParams;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/query-blog?query=${query || ''}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  const blogs = data.data || [];

  return (
    <div>
      <Header />
      <HeroSection />
      <Pagination blogs={blogs} />
      <Footer />
    </div>
  );
}

export default QueryBlog;