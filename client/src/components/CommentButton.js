import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Popup } from "semantic-ui-react";

const CommentButton = ({ postId, commentCount, role }) => {
  return (
    <Popup
      content="Comment on post"
      inverted
      trigger={
        <Button
          color="blue"
          basic
          as={role === "link" ? Link : "div"}
          to={`/post/${postId}`}
          floated="right"
        >
          <Icon name="comments" />
          {commentCount}
        </Button>
      }
    />
  );
};

export default CommentButton;
