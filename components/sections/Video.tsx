// components/Video.tsx

import React from 'react';

type VideoProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
};

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className = '',
}) => {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
    >
      Tu navegador no soporta la etiqueta de video.
    </video>
  );
};

export default Video;
