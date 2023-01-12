import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import useForm from "@/hooks/useForm";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RecoverAccountService } from "@/services/auth.service";
import useRouter from "@/hooks/useRouter";
import { useRecover } from "./hooks/useRecover";

const AccountRecover = () => {
  const { errors, handleSubmit, hasErrors, register, status } = useRecover();

  return (
    <AuthLayout>
      <Logo />
      <Card>
        <p className="text-center font-medium border-0 border-b-2 pb-2">
          Recover your account
        </p>
        <p className="text-center text-red-600 pt-3">
          {Object.values(errors)[0]}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-11/12 mx-auto py-5"
        >
          <Input placeholder="Your email" {...register("email")} />
          <Button disabled={status === "loading" || hasErrors} type="submit">
            Send
          </Button>
        </form>
      </Card>
      <div className="flex justify-center mt-3">
        <Link
          to={"/login"}
          className="hover:text-gray-300 text-white hover:underline flex items-center gap-1"
        >
          <AiOutlineArrowLeft /> Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default AccountRecover;
