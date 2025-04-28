"use client";

import TitlePage from "@/components/titlePage";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<number>(0);

  const tabs = ["Main Settings", "Website Settings"];

  const handleChangeTab = (val: number) => {
    setTab(val);
  };

  return (
    <div>
      <TitlePage title="Settings" />
      <div>{children}</div>
    </div>
  );
};

export default layout;
