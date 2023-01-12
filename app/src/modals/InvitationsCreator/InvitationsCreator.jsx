import useForm from "@/hooks/useForm";
import { createNewInvitation } from "@/services/invitations.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Button from "../../components/Button";
import Input from "../../components/Input";

let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

const InvitationsCreator = ({ toggle }) => {
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
          errors.host_name = "Host name is required";
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
      const res = await handleInvitationCreaton(form);
      console.log(res);
      toggle();
    } catch (error) {
      toast.error(
        error.message ?? "We can't save the invitation, try again late"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div className="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all w-11/12  sm:w-full sm:max-w-lg ">
        <div className="bg-slate-100  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          <form className="flex flex-col gap-4 w-full items-center">
            <p className="text-lg font-medium">New invitation</p>
            <Input {...register("host_name")} placeholder="Host name" />
            <div className="w-full">
              <label
                htmlFor="Arrival date"
                className="text-sm text-slate-500 ml-1"
              >
                Arrival date
              </label>
              <Input
                {...register("arrival_date")}
                type="datetime-local"
                placeholder="Arrival date"
                min={now.toISOString().slice(0, 16)}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="Arrival date"
                className="text-sm text-slate-500 ml-1"
              >
                Expiration date
              </label>
              <Input
                {...register("expiration_date")}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                placeholder="Arrival date"
              />
            </div>
          </form>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button
            disabled={hasErrors || status === "loading"}
            id="saveForm"
            type="submit"
            className="mx-1 w-fit px-3"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={toggle}
            disabled={status === "loading"}
            className="mx-1 w-fit px-3 bg-slate-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InvitationsCreator;
