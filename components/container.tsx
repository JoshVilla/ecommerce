import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default Container;
