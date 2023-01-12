import useForm from "@/hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RecoverAccountService } from "@/services/auth.service";
import useRouter from "@/hooks/useRouter";

export const useRecover = () => {
  const { navigate } = useRouter();
  const { form, register, errors, hasErrors } = useForm(
    {
      email: "",
    },
    {
      validate: (fields) => {
        const errors = {};

        if (!fields.email) {
          errors.email = "The email is required";
        }

        return errors;
      },
    }
  );

  const { mutateAsync: handleRecover, status } = useMutation({
    mutationFn: RecoverAccountService,
    mutationKey: ["user-recover-account"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Sending...");
    try {
      await handleRecover(form);
      toast.success("Email with instructions send", {
        id: tLoading,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        id: tLoading,
      });
    }
  };
  return {
    register,
    errors,
    hasErrors,
    handleSubmit,
    status,
  };
};
