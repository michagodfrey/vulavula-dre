import React from 'react';
import SocialIcons from './SocialIcons';

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="author-img">
        <img src={author?.photo.url} alt={author?.name} height="100px" width="100px" className="rounded-full" />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author?.name}</h3>
      <p className="text-white text-lg mb-8">{author?.bio}</p>
      <div className="flex justify-center">
        <SocialIcons />
      </div>
    </div>
  )
}

export default Author