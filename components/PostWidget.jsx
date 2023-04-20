import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    getRecentPosts()
        .then((result) => setRecentPosts(result));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-b font-semibold border-b pb-4">Recent Posts</h3>
      {recentPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img src={post.featuredImage.url} alt={post.title} height="60px" width="60px" className="align-middle rounded-full" />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('DD MMM YYYY')}</p>
          </div>
          <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PostWidget