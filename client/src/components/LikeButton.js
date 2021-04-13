import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const LikeButton = user ? (
    liked ? (
      <Button color="teal" onClick={likePost}>
        <Icon name="heart" /> {likeCount}
      </Button>
    ) : (
      <Button color="teal" basic onClick={likePost}>
        <Icon name="heart" /> {likeCount}
      </Button>
    )
  ) : (
    //Render a links to login if user not logged
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" /> {likeCount}
    </Button>
  );

  return LikeButton;
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
