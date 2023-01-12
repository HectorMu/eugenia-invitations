import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import useForm from "@/hooks/useForm";
import useRouter from "@/hooks/useRouter";
import {
  ChangePasswordWithRecoverTokenService,
  VerifyRecoverAccountTokenService,
} from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const { params, navigate } = useRouter();

  const { form, register, errors, hasErrors } = useForm(
    {
      password: "",
      confirmPassword: "",
    },
    {
      validate: (fields) => {
        const errors = {};

        if (Object.values(fields).includes("")) {
          errors.required = "All fields are required";
        } else if (fields.password !== fields.confirmPassword) {
          errors.required = "Passwords don't match";
        }
        return errors;
      },
    }
  );

  const { status, data } = useQuery({
    queryFn: () => VerifyRecoverAccountTokenService(params?.token),
    queryKey: ["verify-token-", params?.token],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Loading...");
    try {
      await ChangePasswordWithRecoverTokenService(params?.token, form.password);

      toast.success("Password changed", {
        id: tLoading,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        id: tLoading,
      });
    }
  };

  useEffect(() => {
    if (data && !data?.status) {
      navigate("/login");
      toast.error("Recover link expired");
    }
  }, [data]);

  console.log(form);
  return (
    <AuthLayout>
      <Logo />
      <Card>
        {status === "loading" ? (
          <h1 className="text-center font-medium text-2xl">
            We are validating your link...
          </h1>
        ) : status === "error" ? (
          <h1 className="text-center font-medium text-2xl">
            We can't validate your link...
          </h1>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-11/12 mx-auto py-5"
          >
            <h3 className="text-center font-medium text-2xl border-0 border-b-2 py-2">
              Reset your password
            </h3>
            <p className="text-center text-red-600 pt-3">
              {Object.values(errors)[0]}
            </p>
            <Input
              type="password"
              {...register("password")}
              placeholder="New password"
            />
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm new password"
            />
            <Button disabled={hasErrors} type="submit">
              Change my password
            </Button>
          </form>
        )}
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

export default PasswordReset;
