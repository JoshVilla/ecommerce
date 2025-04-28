import Image from "next/image";
import React from "react";

const Showcase = () => {
  return (
    <div className="mb-10 flex items-center lg:flex-row flex-col h-[500px]">
      <div className="flex-1">
        <div className="mx-auto text-center my-10">
          <div>
            <h1 className="text-6xl font-bold mb-2 drop-shadow-lg">
              Welcome to Boba Ville!
            </h1>
            <p className="text-lg drop-shadow-md">
              Your cozy destination for the finest milk tea — brewed with love
              and served with a smile.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Image
          alt="showcase"
          src={require("@/public/assets/showcase.jpg")}
          width={350}
          height={350}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default Showcase;
