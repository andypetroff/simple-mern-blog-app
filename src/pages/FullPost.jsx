import React from "react";

import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";

import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = React.useState();

  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert('Failed to get the post content!');
        console.warn(err);
      });
      // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? data.imageUrl : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
