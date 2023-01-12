import useForm from "@/hooks/useForm";
import useRouter from "@/hooks/useRouter";
import {
  ChangePasswordWithRecoverTokenService,
  VerifyRecoverAccountTokenService,
} from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const usePasswordReset = () => {
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

  const { status: verifyTokenStatus, data: verifyTokenResponse } = useQuery({
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
    if (verifyTokenResponse && !verifyTokenResponse?.status) {
      navigate("/login");
      toast.error("Recover link expired");
    }
  }, [verifyTokenResponse]);

  return {
    register,
    errors,
    hasErrors,
    handleSubmit,
    verifyTokenResponse,
    verifyTokenStatus,
  };
};
