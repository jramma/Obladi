"use client";

import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";

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

const Avatar: React.FC<AvatarProps> = ({ userImage, seed = "default" }) => {
  const bgOptions = ["bg-primary", "bg-secondary", "bg-tertiary"];

  const [bgClass, setBgClass] = useState<string>("");
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const index = getDeterministicIndex(seed, bgOptions.length);
    setBgClass(bgOptions[index]);

    if (!userImage) {
      const avatar = createAvatar(loreleiNeutral, { seed });
      setSvg(avatar.toString());
    }
  }, [userImage, seed]);

  if (userImage) {
    return (
      <img
        src={userImage}
        alt="User Avatar"
        className={`w-12 h-12 ${bgClass} rounded-full object-cover`}
      />
    );
  }

  if (!svg) {
    return (
      <div className={`w-12 h-12 ${bgClass} rounded-full`} />
    );
  }

  return (
    <div
      className={`w-12 h-auto aspect-square ${bgClass} rounded-full overflow-hidden flex items-center border-2 justify-center`}
    >
      <div
        className="w-full h-full scale-[1.25]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};

export default Avatar;
