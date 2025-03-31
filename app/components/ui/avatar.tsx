'use client';

import { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

interface AvatarProps {
  userImage?: string;
  seed?: string;
}

function getDeterministicIndex(seed: string, length: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % length);
}

const Avatar: React.FC<AvatarProps> = ({ userImage, seed = 'default' }) => {
  const bgOptions = ['bg-primary', 'bg-secondary', 'bg-tertiary'];
  const index = getDeterministicIndex(seed, bgOptions.length);
  const bgClass = bgOptions[index];

  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!userImage) {
      const avatar = createAvatar(lorelei, { seed });
      setSvg(avatar.toString());
    }
  }, [userImage, seed]);

  if (userImage) {
    return (
      <img
        src={userImage}
        alt="User Avatar"
        className={`w-10 h-10 ${bgClass} rounded-full`}
      />
    );
  }

  if (!svg) {
    return <div className={`w-10 h-10 ${bgClass} rounded-full`} />;
  }

  return (
    <div
      className={`w-10 h-10 ${bgClass} rounded-full aspect-square`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Avatar;
