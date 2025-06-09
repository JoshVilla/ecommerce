"use client";

import TitlePage from "@/components/titlePage";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TitlePage title="Settings" />
      <div>{children}</div>
    </div>
  );
};

export default layout;
