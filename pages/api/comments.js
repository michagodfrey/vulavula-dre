// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res) {
  const { name, email, slug, comment } = req.body;
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  // Mutation to create a comment
  const createCommentMutation = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  // Mutation to publish a comment
  const publishCommentMutation = gql`
    mutation PublishComment($id: ID!) {
      publishComment(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    // Create the comment
    const createResponse = await graphQLClient.request(createCommentMutation, {
      name,
      email,
      comment,
      slug,
    });
    const commentId = createResponse.createComment.id;

    // Publish the comment
    await graphQLClient.request(publishCommentMutation, { id: commentId });

    // Send email alert via Getform
    const getformEndpoint =
      "https://getform.io/f/7c1a6ab1-0cd7-42d3-8bf0-d9dc5f85fab6"; 
    await fetch(getformEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `New Comment on Vulavula-Dre by ${name}!`,
        email: { email },
        message: `A new comment has been posted by ${name}:\n\n"${comment}"\n\nat: https://vulavula-dre.vercel.app/post/${slug}`,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
