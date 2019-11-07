import React, { Fragment } from 'react';

import { Loading } from './Loading';
import { useQuery } from './useQuery';

type VideoResponse = {
  items: { uri: string; name: string; description: string }[];
};

export default function Home() {
  const { data, error, loading } = useQuery<VideoResponse>('/me/videos');

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <span>Whoops, something bad happened</span>;
  }

  return (
    <div>
      <h1>My Videos</h1>
      {loading && <Loading />}
      <dl>
        {data.items.map(video => {
          return (
            <Fragment key={`VIDEO_${video.uri}`}>
              <dt>{video.name}</dt>
              <dd>{video.description}</dd>
            </Fragment>
          );
        })}
      </dl>
    </div>
  );
}
