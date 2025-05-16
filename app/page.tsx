"use client";

import Showcase from "@/components/showcase";
import Navbar from "@/components/navbar";
import Products from "./products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/slices/userSlice";

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        // If there's a logged-in user, clear it and redirect to /shop
        if (Object.keys(user).length !== 0) {
            dispatch(clearUser());
            router.push("/shop");
        }
    }, [user, dispatch, router]);

    return (
        <div className="w-full">
            <Navbar />
            <Showcase />
            <Products />
        </div>
    );
}
