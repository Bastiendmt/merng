import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Grid, GridColumn, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={2} />
        {user && (
          <GridColumn width={12}>
            <PostForm />
          </GridColumn>
        )}
      </Grid.Row>
      {loading ? (
        <Grid.Row>
          <h2>Loading posts...</h2>
        </Grid.Row>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map((post) => (
              <>
                <Grid.Row>
                  <Grid.Column width={2} />
                  <Grid.Column
                    key={post.id}
                    style={{ marginBottom: 20 }}
                    width={12}
                  >
                    <PostCard post={post} />
                  </Grid.Column>
                </Grid.Row>
              </>
            ))}
        </Transition.Group>
      )}
    </Grid>
  );
}

export default Home;
