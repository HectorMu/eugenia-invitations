import useForm from "@/hooks/useForm";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "@/store/slices/SessionSlice";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "@/services/auth.service";
import { toast } from "react-hot-toast";

import useRouter from "@/hooks/useRouter";

export const useLogin = () => {
  const { navigate } = useRouter();
  const { form, register } = useForm({
    email: "",
    password: "",
  });

  const goToSignup = () => navigate("/signup");

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
  return {
    register,
    handleSubmit,
    isLoading,
    goToSignup,
  };
};
