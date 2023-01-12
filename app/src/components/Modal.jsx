import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import Input from "./Input";

const Modal = ({ toggle }) => {
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
      class="fixed  inset-x-0 mt-5 lg:inset-y-0 z-50 overflow-y-auto"
    >
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all w-11/12  sm:w-full sm:max-w-lg ">
          <div class="bg-slate-100  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <form action="" className="flex flex-col gap-4 w-full items-center">
              <p>New invitation</p>
              <Input placeholder="Host name" />
              <div className="w-full">
                <label
                  htmlFor="Arrival date"
                  className="text-sm text-slate-500 ml-1"
                >
                  Arrival date
                </label>
                <Input type="datetime-local" placeholder="Arrival date" />
              </div>
              <div className="w-full">
                <label
                  htmlFor="Arrival date"
                  className="text-sm text-slate-500 ml-1"
                >
                  Expiration date
                </label>
                <Input type="date" placeholder="Arrival date" />
              </div>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button className="mx-1 w-fit px-3">Save</Button>
            <Button onClick={toggle} className="mx-1 w-fit px-3 bg-slate-400">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
