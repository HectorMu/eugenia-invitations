import React from "react";
import { motion } from "framer-motion";

const Modal = ({ children }) => {
  return (
    <motion.div
      initial={{
        transform: "scale(0)",
        opacity: 0,
        animationFillMode: "forwards",
      }}
      animate={{
        transform: "scale(1)",
        opacity: 1,
        animationFillMode: "forwards",
      }}
      exit={{
        transform: "scale(0)",
        opacity: 0,
        animationFillMode: "forwards",
      }}
      class="fixed  inset-0 mt-5 lg:inset-y-0 z-50 overflow-y-scroll"
    >
      {children}
    </motion.div>
  );
};

export default Modal;
