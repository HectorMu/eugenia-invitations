import Card from "@/components/Card";
import React from "react";
import { Link } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import useForm from "@/hooks/useForm";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "@/store/slices/SessionSlice";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "@/services/auth.service";
import { toast } from "react-hot-toast";

const Login = () => {
  const { form, register } = useForm({
    email: "",
    password: "",
  });

  const { isLoading, mutateAsync: handleLogin } = useMutation({
    mutationFn: LoginService,
    mutationKey: ["user-login"],
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Loading...");
    try {
      const response = await handleLogin(form);

      toast.success("Welcome", {
        id: tLoading,
      });

      dispatch(storeLogin(response.SessionData));
    } catch (error) {
      toast.error(error.message, {
        id: tLoading,
      });
    }
  };

  return (
    <div className="w-11/12 lg:w-3/12 mx-auto mt-16">
      <Logo />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-11/12 mx-auto py-5"
        >
          <Input {...register("email")} placeholder="Email" />
          <Input {...register("password")} placeholder="Password" />

          <Button className="mt-5" type="submit">
            Log in
          </Button>

          <hr className="bg-slate-900 h-[1px]" />
          <small className="text-slate-600 text-center">
            You don't have an account?
          </small>
          <Button type="button">Create account</Button>
        </form>
      </Card>
      <div className="flex justify-center mt-3">
        <Link
          to={"/auth/recover"}
          className="hover:text-gray-300 text-white hover:underline flex items-center gap-1"
        >
          <BiHelpCircle /> Recover my account
        </Link>
      </div>
    </div>
  );
};

export default Login;
