import useForm from "@/hooks/useForm";
import { createNewInvitation } from "@/services/invitations.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

const useInvitationCreator = (toggle) => {
  const queryClient = useQueryClient();
  const { form, register, errors, hasErrors, inputTouched } = useForm(
    {
      host_name: "",
      arrival_date: now.toISOString().slice(0, 16),
      expiration_date: new Date().toISOString().split("T")[0],
    },
    {
      validate: (fields) => {
        const errors = {};

        if (!fields.host_name) {
          errors.host_name = "Host name is required";
        }
        if (!fields.arrival_date) {
          errors.arrival_date = "Arrival date is required";
        }

        if (new Date(fields.expiration_date) <= new Date(fields.arrival_date)) {
          errors.expiration_date =
            "The invitation can't expire on the same day of the arrival date";
        }

        return errors;
      },
    }
  );

  const { mutateAsync: handleInvitationCreaton, status } = useMutation({
    mutationFn: createNewInvitation,
    mutationKey: ["create-invitation"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      form.expiration_date = new Date(form.expiration_date)
        .toISOString()
        .slice(0, 16);

      await handleInvitationCreaton(form);
      queryClient.invalidateQueries(`user-invitations`);
      toggle();
    } catch (error) {
      toast.error(
        error.message ?? "We can't save the invitation, try again late"
      );
    }
  };
  return {
    handleSubmit,
    status,
    register,
    errors,
    hasErrors,
    inputTouched,
    now,
  };
};

export default useInvitationCreator;
