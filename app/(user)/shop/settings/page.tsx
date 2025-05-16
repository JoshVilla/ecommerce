"use client"
import React from "react"
import TitlePage from "@/components/titlePage";
import {Info} from "lucide-react";
import Address from "@/app/(user)/shop/settings/components/address";

const Page = () => {
    return(
        <div>
            <TitlePage title="Settings" />
           <Address />
        </div>
    )
}

export default Page