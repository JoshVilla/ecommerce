"use client";

import Showcase from "@/components/showcase";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <Showcase />
    </div>
  );
}
