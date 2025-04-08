import { IconCloud } from "./Icon-cloud";

const icons = [
  "unjs:unimport",
  "unjs:bundle-runner",
  "unjs:unctx",
  "unjs:destr",
  "unjs:knitwork",
  "unjs:unstorage",
  "unjs:std-env",
  "unjs:magic-regexp",
  "unjs:mongoz",
  "unjs:image-meta",
  "unjs:ipx",
  "unjs:jimp-compact",
  "unjs:db0",
  "unjs:fs-memo",
  "unjs:nanotar",
  "unjs:destr",
  "fxemoji:balloon",
  "fxemoji:catside",
  "fxemoji:aubergine",
  "fxemoji:crown",
  "fxemoji:glasses",
  "fxemoji:honeypot",
  "fxemoji:keyboard",
  "fxemoji:moviecamera",
  "fxemoji:mensrunner",
  "fxemoji:peach",
  "fxemoji:rose",
  "fxemoji:tractor",
  "fxemoji:tropicaldrink",
  "fxemoji:turtle",
  "fxemoji:womanshat",
  "fxemoji:soccerball",
  "fxemoji:redheart",
  "fxemoji:pineapple",
  "fxemoji:lightbulb",
];

export function IconCloudDemo() {
  const images = icons.map((name) => `https://api.iconify.design/${name}.svg`);

  return (
    <div className="relative flex scale-110 size-full items-center justify-center flex-grow overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
