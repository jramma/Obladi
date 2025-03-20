import Image from "next/image";

import Welcome from "@/components/sections/Welcome";

export default function AboutPage() {
  return (
      <Welcome 
        title="Welcome to About Page!" 
        subtitle="Here is some information about us." 
      />
  );
}
