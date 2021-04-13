import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update: (proxy) => {
      setConfirmOpen(false);
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      let newData;
      newData = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      if (callback) callback();
    },
    variables: {
      postId,
    },
  });
  return (
    <>
      <Button
        floated="right"
        onClick={() => setConfirmOpen(true)}
        icon="trash"
        size="medium"
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
