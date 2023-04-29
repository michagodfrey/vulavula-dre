import React, { useState } from 'react';
import Head from 'next/head';
import ReactPaginate from 'react-paginate';
import { PostCard, Categories, PostWidget, Pages, FeaturedPosts, Newsletter } from "../components";

import { getPosts } from "../services";

export default function Home({ posts }) {
  const [currentPage, setCurrentPage] = useState(0);

  const postsPerPage = 5;
  const pages = currentPage * postsPerPage;
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);

    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="container mx-auto px-4 md:px-10 mb-8">
      <Head>
        <title>Vulavula Dre</title>
        <link rel="icon" href="../public/logo.jpg" />
        <meta
          name="description"
          content="A blog authored by Luke Uluiburoto. 
          Vulavula Dre is the name of Luke's late great-grandfather 
          in the Fijian villiage of Namalata Kubulau Bau."
        />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts
            .sort((a, b) => {
              if (a.node.date && b.node.date) {
                return new Date(b.node.date) - new Date(a.node.date);
              } else if (a.node.date || b.node.date) {
                return b.node.date ? 1 : -1;
              } else {
                return new Date(b.node.createdAt) - new Date(a.node.createdAt);
              }
            })
            .slice(pages, pages + postsPerPage)
            .map((post, index) => (
              <PostCard post={post.node} key={index} />
            ))}
          <div className="flex justify-center">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              forcePage={currentPage}
              containerClassName={"inline-flex items-center -space-x-px"}
              previousLinkClassName={
                "block px-3 py-2 ml-0 leading-tight text-gray-500 text-xl bg-white border border-gray-300 rounded-l-lg hover:bg-pink-600 hover:text-white"
              }
              nextLinkClassName={
                "block px-3 py-2 leading-tight text-gray-500 text-xl bg-white border border-gray-300 rounded-r-lg hover:bg-pink-600 hover:text-white"
              }
              pageClassName={
                "px-3 py-2 leading-tight text-gray-500 text-xl bg-white border border-gray-300 hover:bg-pink-600 hover:text-white"
              }
              activeClassName={"active-pag-btn"}
            />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Pages />
            <Newsletter />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}