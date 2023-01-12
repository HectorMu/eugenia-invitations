import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { usePasswordReset } from "./hooks/usePasswordReset";

const PasswordReset = () => {
  const {
    errors,
    handleSubmit,
    hasErrors,
    register,
    verifyTokenResponse,
    verifyTokenStatus,
  } = usePasswordReset();

  return (
    <AuthLayout>
      <Logo />
      <Card>
        {verifyTokenStatus === "loading" ? (
          <h1 className="text-center font-medium text-2xl">
            We are validating your link...
          </h1>
        ) : verifyTokenStatus === "error" ? (
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
