"use client";

import Showcase from "@/components/showcase";
import Navbar from "@/components/navbar";
import Products from "./products";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    const state = useSelector((state:RootState) => state.user.user);
    useEffect(() => {
        if (Object.keys(state).length !== 0) {
            router.push("/shop");
        }
    }, [state]);
  return (
    <div className="w-full">
      <Navbar />
      <Showcase />
      <Products />
    </div>
  );
}
