import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label, Popup } from "semantic-ui-react";

const CommentButton = ({ postId, commentCount, role }) => {
  return (
    <Popup
      content="Comment on post"
      inverted
      trigger={
        <Button
          labelPosition="right"
          as={role === 'link' ? Link : "div"}
          to={`/post/${postId}`}
          floated="right"
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      }
    />
  );
};

export default CommentButton;
