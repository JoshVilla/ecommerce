"use client";

import { motion } from "framer-motion";
import TitlePage from "@/components/titlePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserLogin from "./loginUser";
import AdminLogin from "./loginAdmin";
import { useState } from "react";

function Page() {
  const [active, setActive] = useState("user");

  return (
    <motion.div
      className="w-[90%] md:w-[60%] lg:w-[30%]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TitlePage title="Login" className="mb-10" />

      <Tabs
        value={active}
        onValueChange={setActive}
        className="w-[90%] md:w-full"
      >
        <TabsList className="w-full">
          <TabsTrigger
            value="user"
            className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
          >
            User Login
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Admin Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="w-full">
          <div className="my-4">
            <UserLogin />
          </div>
        </TabsContent>

        <TabsContent value="admin" className="w-full">
          <div className="my-4">
            <AdminLogin />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

export default Page;
