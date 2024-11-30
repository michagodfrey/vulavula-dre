import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
  Pages,
} from "../../components";

import { getPosts, getPostDetails, getComments } from "../../services";

const PostDetails = ({ post }) => {
  const router = useRouter();

  const [comments, setComments] = useState([]);

  // Fetch comments initially
  useEffect(() => {
    const fetchComments = async () => {
      const newComments = await getComments(post.slug);
      setComments(newComments);
    };

    fetchComments();
  }, [post.slug]);

  // Handle comment submission and refresh
  const handleCommentSubmitted = async () => {
    const newComments = await getComments(post.slug);
    setComments(newComments);
  };

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 md:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm
            slug={post.slug}
            onCommentSubmitted={handleCommentSubmitted}
          />
          <Comments comments={comments} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Pages />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  if (!data) {
    // Return a 404 status if no data is found for the slug
    return {
      notFound: true,
    };
  }

  return {
    props: { post: data },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: "blocking", // Enables ISR for paths not pre-rendered at build time
  };
}
