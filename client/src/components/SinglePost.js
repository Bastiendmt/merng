import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import React, { useContext } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              style={{ borderRadius: "50%" }}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={10}>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow(true)}
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id}/>
                  )}
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
