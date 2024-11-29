import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query Assets {
            postsConnection (first: 100) {
                edges {
                    node {
                        createdAt
                        date
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }`;

    try {
      const result = await request(graphqlAPI, query);
      return result.postsConnection.edges;
    } catch (error) {
      console.log(error.message);
    }
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                title
                excerpt
                featuredImage {
                    url
                }
                createdAt
                date
                slug
                content {
                    raw
                }
                categories {
                    name
                    slug
                }
            }
        }
    `;

    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.post;
    } catch (error) {
      console.log(error.message);
    }
};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                date
                slug
            }
        }
    `;

    try {
      const result = await request(graphqlAPI, query);
      return result.posts;
    } catch (error) {
      console.log(error.message);
    }
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    try {
      const result = await request(graphqlAPI, query);
      return result.categories;
    } catch (error) {
      console.log(error.message)
    }
}

export const submitComment = async (obj) => {

    try {
      const result = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      return result.json();
    } catch (error) {
      console.log(error.message);
    }
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  
  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.comments;
  } catch (error) {
    console.log(error.message);
  }
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}, first: 100) {
        featuredImage {
          url
        }
        title
        slug
        createdAt
        date
      }
    }   
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.posts;
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            createdAt
            date
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGalleries = async () => {
  const query = gql`
    query GetGalleries {
      galleries {
        title
        images {
          url
          height
          width
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.galleries;
  } catch (error) {
    console.log(error.message);
  }
};