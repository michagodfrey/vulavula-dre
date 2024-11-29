import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState([]);

      useEffect(() => {
        getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full flex justify-between border-blue-400 py-8">
            <div className="">
                <Link href="/">
                    <span className="cursor-pointer font-bold text-4xl text-white">Vulavula Dre</span>
                </Link>
            </div>
            <div className="hidden md:block">
                {categories?.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}</span>
                    </Link>
                ))}
                <Link href="/about"><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">About</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Header