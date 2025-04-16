import { getDecodedToken } from "@/utils/nonAsyncHelpers";
import { JwtPayload } from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [tokenInfo, setTokenInfo] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true); // 👈

  useEffect(() => {
    const decoded = getDecodedToken();
    setTokenInfo(decoded);
    setLoading(false); // 👈 after checking token
  }, []);

  return (
    <div className="bg-sky-500 py-2 px-6 flex items-center justify-between">
      <div className="text-xl text-white font-semibold">Milktea</div>
      <div className="text-white">
        {loading ? null : tokenInfo?.name ? (
          <div>
            <span>Hello, </span>
            <span className="cursor-pointer hover:underline">
              {tokenInfo.name}
            </span>
          </div>
        ) : (
          <Button
            size="sm"
            variant="link"
            className="text-white cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
