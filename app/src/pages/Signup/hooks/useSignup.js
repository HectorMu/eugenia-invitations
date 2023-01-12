import useForm from "@/hooks/useForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SignupService } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import useRouter from "@/hooks/useRouter";
import { getDepartments } from "@/services/department.service";
import { isEmail } from "@/helpers/helpers";

export const useSignup = () => {
  const { navigate } = useRouter();

  const { data: departments, status: deparmentsStatus } = useQuery({
    queryFn: getDepartments,
    queryKey: ["departments"],
  });

  const { form, register, errors, hasErrors } = useForm(
    {
      email: "",
      name: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      fk_department: 0,
    },
    {
      validate: (fields) => {
        const errors = {};

        if (
          Object.values(fields).includes("") ||
          Object.values(fields).includes(0)
        ) {
          errors.required = "All fields are required";
        } else if (!isEmail(fields.email)) {
          errors.email = "The email is not valid";
        } else if (fields.password !== fields.confirmPassword) {
          errors.password = "The passwords don't match";
        }

        return errors;
      },
    }
  );

  const goToLogin = () => navigate("/login");

  const { isLoading, mutateAsync: handleSignup } = useMutation({
    mutationFn: SignupService,
    mutationKey: ["user-signup"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Loading...");
    const { confirmPassword, ...restOfUser } = form;
    try {
      if (hasErrors)
        return toast.error("Check all your fields", { id: tLoading });

      await handleSignup(restOfUser);

      toast.success("Now you can Sign in", {
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
    goToLogin,
    handleSubmit,
    isLoading,
    departments,
    deparmentsStatus,
    errors,
    register,
    hasErrors,
  };
};
