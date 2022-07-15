import React from 'react';

import { env } from '../config';

import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  const { posts } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `${env.API_URL}${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={0}
              tags={obj.tags}
              key={index}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};
