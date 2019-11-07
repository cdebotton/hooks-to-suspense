import React, { Fragment } from 'react';

import { createSuspender, request } from './Resource';

type VideoResponse = {
  items: { uri: string; name: string; description: string }[];
};

const resource = createSuspender<VideoResponse>(request('/me/videos'));

export default function Home() {
  const data = resource.read();

  return (
    <div>
      <h1>My Videos</h1>
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
