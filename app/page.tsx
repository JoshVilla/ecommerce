"use client";

import Showcase from "@/components/showcase";
import Navbar from "@/components/navbar";
import Products from "./products";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <Showcase />
      <Products />
    </div>
  );
}
