"use client";
import TitlePage from "@/components/titlePage";
import React from "react";

function page() {
  return (
    <div>
      <TitlePage title="Dashboard" />
      <div className="text-sm md:text-base lg:text-lg xl:text-xl">
  <span className="block md:hidden">This is mobile screen</span>
  <span className="hidden md:block lg:hidden">This is tablet screen</span>
  <span className="hidden lg:block xl:hidden">This is laptop screen</span>
  <span className="hidden xl:block">This is desktop screen</span>
</div>

    </div>
  );
}

export default page;
