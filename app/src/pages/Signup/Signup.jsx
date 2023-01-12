import Card from "@/components/Card";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import AuthLayout from "@/components/AuthLayout";
import { useSignup } from "./hooks/useSignup";

const Signup = () => {
  const {
    deparmentsStatus,
    departments,
    errors,
    goToLogin,
    handleSubmit,
    hasErrors,
    isLoading,
    register,
  } = useSignup();

  return (
    <AuthLayout>
      <Logo />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-11/12 mx-auto py-5"
        >
          <Input {...register("name")} placeholder="Name" />
          <Input {...register("lastname")} placeholder="Lastname" />
          <Input {...register("email")} placeholder="Email" />
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          <Input
            {...register("confirmPassword")}
            placeholder="Confirm password"
            type="password"
          />
          <select
            {...register("fk_department")}
            className="rounded-md outline-none border-[1px] border-transparent  focus:border-slate-300 p-3 transition-all text-black"
          >
            {deparmentsStatus === "loading" && (
              <option value="0">Loading departments...</option>
            )}
            {deparmentsStatus === "error" && (
              <option value="0">
                We can't load the departments, try again later
              </option>
            )}
            <option value="0">Select a department</option>
            {departments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.NAME}
              </option>
            ))}
          </select>
          <p className="text-center text-red-600">{Object.values(errors)[0]}</p>

          <Button
            disabled={isLoading || hasErrors}
            className="mt-5"
            type="submit"
          >
            {isLoading ? "Wait plase..." : "Sign up"}
          </Button>

          <hr className="bg-slate-900 h-[1px]" />
          <small className="text-slate-600 text-center">
            Already have an account?
          </small>
          <Button onClick={goToLogin} type="button">
            Log in
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default Signup;
