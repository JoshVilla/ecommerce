"use client";
import React, { useState } from "react";
import TitlePage from "@/components/titlePage";
import { Info } from "lucide-react";
import Address from "@/app/(user)/shop/settings/components/address/address";
import BasicInfo from "./components/basicInfo/basicInfo";
import ChangePassword from "./components/changePassword/changePassword";

interface ITabs {
  label: string;
  id: number;
}

const Page = () => {
  const [tabState, setTabState] = useState<number>(0);

  const tabs: ITabs[] = [
    {
      label: "Basic Information",
      id: 0,
    },
    {
      label: "Address",
      id: 1,
    },
    {
      label: "Change Password",
      id: 2,
    },
  ];
  return (
    <div>
      <TitlePage title="Settings" />
      <div className="flex items-center my-4">
        {tabs.map((tab: ITabs) => (
          <div
            key={tab.id}
            onClick={() => setTabState(tab.id)}
            className={`hover:bg-sky-100 cursor-pointer border px-4 text-sm py-1 ${
              tabState === tab.id ? "bg-sky-100" : null
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabState === 0 && <BasicInfo />}
      {tabState === 1 && <Address />}
      {tabState === 2 && <ChangePassword />}
    </div>
  );
};

export default Page;
