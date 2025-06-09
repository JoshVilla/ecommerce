"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import MainSettings from "./mainSettings";
import WebsiteSettings from "./websiteSettings";

const page = () => {
  const [tab, setTab] = useState<number>(0);

  const tabs = ["Main Settings", "Website Settings"];

  const handleChangeTab = (val: number) => {
    setTab(val);
  };
  return (
    <div className="my-4">
      <div className="flex gap-2 items-center">
        {tabs.map((item: string, idx: number) => (
          <div
            key={idx}
            className={`text-sm  px-4 py-1 rounded-tl-md rounded-tr-md cursor-pointer hover:bg-gray-300 transition ${
              tab === idx ? "bg-gray-300" : null
            }`}
            onClick={() => handleChangeTab(idx)}
          >
            {item}
          </div>
        ))}
      </div>
      <Separator />
      <div className="my-4">
        {tab === 0 ? <MainSettings /> : <WebsiteSettings />}
      </div>
    </div>
  );
};

export default page;
