"use client";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import React from "react";
import PendingOrders from "./pendingOrders";

const Page = () => {
  return (
    <Container>
      <TitlePage title="My Orders" />
      <div className="my-4">
        <PendingOrders />
      </div>
    </Container>
  );
};

export default Page;
