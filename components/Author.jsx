import React from 'react';
import Link from "next/link";
import Image from "next/image";
import SocialIcons from './SocialIcons';
import LukeImg from '../public/luke.jpg';

const Author = () => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="">
        <Image
          src={LukeImg}
          alt="Luke Uluiburotu"
          className="rounded-full h-32 w-32 m-auto"
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">
        Post by Luke Uluiburotu
      </h3>
      <Link href="/about">
        <p className="text-white text-lg mb-8 underline">
          Read about Luke and story behind this blog
        </p>
      </Link>
      <p className="text-white mb-4 text-lg font-bold">Contact</p>
      <div className="flex justify-center">
        <SocialIcons />
      </div>
    </div>
  );
}

export default Author