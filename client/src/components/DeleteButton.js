import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  GridColumn,
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Confirm,
} from "semantic-ui-react";

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update: () => {
      setConfirmOpen(false)
      //TODO remove from cache
    },
    variables: {
      postId,
    },
  });
  return (
    <>
      <Button
        floated="right"
        onClick={() => console.log("delete")}
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
