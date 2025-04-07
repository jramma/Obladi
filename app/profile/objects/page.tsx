import Image from "next/image";
export default async function ChatPage() {
  return (
    <Image
      src="/strategy.png"
      width={400}
      height={400}
      alt="aeroport"
      className="dark:bg-white dark:rounded-full"
    />
  );
}
