import moment from "moment";
import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "./CommentButton";
const PostCard = ({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/post/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          style={{ borderRadius: "50%" }}
        />

        {user && user.username === username && <DeleteButton postId={id} />}

        <Card.Header>{username}</Card.Header>

        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>

        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <CommentButton postId={id} commentCount={commentCount} role="link" />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
