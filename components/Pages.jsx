import React from 'react';
import Link from 'next/link';

const Pages = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 md:hidden">
      <h3 className="text-xl mb-6 font-semibold border-b pb-4">Pages</h3>
        <Link href="about">
          <span className="cursor-pointer block pb-3 mb-3 transition-colors hover:text-blue-500">About</span>
        </Link>
        <Link href="/gallery">
          <span className="cursor-pointer block pb-3 mb-3 transition-colors hover:text-blue-500">Gallery</span>
        </Link>
    </div>
  )
}

export default Pages