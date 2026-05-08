/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { TVideoCourseProps } from './VideoCourse.types.d';

const Plyr = dynamic(() => import('plyr-react'), {
  ssr: false,
});

const VideoCourse: React.FC<TVideoCourseProps> = React.memo(({ title, src, onClick }) => {
  const plyrProps: any = {
    source: {
      type: 'video',
      title,
      sources: [
        {
          src,
          type: 'video/mp4',
        },
      ],
    },
    options: {},
  };

  return (
    <div className="VideoCourse" onClick={onClick}>
      <Plyr {...plyrProps} />
    </div>
  );
});

export default VideoCourse;
