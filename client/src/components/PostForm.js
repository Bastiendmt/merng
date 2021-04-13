import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Input
          placeholder="Hi world!"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
      {error && (
        <div className="ui message error" style={{marginBottom : 20}}>{error.graphQLErrors[0].message}</div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
