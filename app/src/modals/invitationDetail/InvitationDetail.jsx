import Button from "@/components/Button";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import {
  deleteInvitation,
  getInvitationDetail,
  updateInvitation,
} from "@/services/invitations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import QRCode from "react-qr-code";

let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

const calculateTimeLimit = (dateStr) => {
  let date = new Date(dateStr);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
};

const InvitationDetail = ({ toggle, invitation: localInvitation }) => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: fetchedInvitation,
    status,
    isError,
  } = useQuery({
    queryFn: () => getInvitationDetail(localInvitation.id),
    queryKey: [`invitation-detail-`, localInvitation.id],
  });

  const invitation = isError ? localInvitation : fetchedInvitation;

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    // if (isEditing) {
    //   setForm((prev) => ({
    //     ...prev,
    //     ...fetchedInvitation,
    //     expiration_date: fetchedInvitation.expiration_date.split("T")[0],
    //   }));
    // }
  };

  const { form, register, errors, hasErrors, inputTouched, setForm } = useForm(
    {
      host_name: "",
      arrival_date: "",
      expiration_date: "",
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

  const { mutateAsync: handleInvitationUpdate, status: updateStatus } =
    useMutation({
      mutationFn: updateInvitation,
      mutationKey: ["update-invitation"],
    });

  const { mutateAsync: handleInvitationDelete, status: deleteStatus } =
    useMutation({
      mutationFn: deleteInvitation,
      mutationKey: ["delete-invitation"],
    });

  const handleDelete = async () => {
    try {
      const result = window.confirm("Do you wan't to delete the invitation?");
      if (result) {
        await handleInvitationDelete(invitation?.id);
        queryClient.invalidateQueries("invitation-detail-", localInvitation.id);
        queryClient.invalidateQueries("user-invitations");
        toggle();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message ?? "We can't delete the invitation, try again later"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleInvitationUpdate(form);
      queryClient.invalidateQueries("invitation-detail-", localInvitation.id);
      queryClient.invalidateQueries("user-invitations");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message ?? "We can't update the invitation, try again later"
      );
    }
  };

  useEffect(() => {
    if (fetchedInvitation) {
      setForm((prev) => ({
        ...prev,
        ...fetchedInvitation,
        expiration_date: fetchedInvitation.expiration_date?.split("T")[0],
      }));
    }
  }, [fetchedInvitation]);

  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all w-11/12  sm:w-full sm:max-w-lg ">
        <div className="bg-slate-100  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          <div>
            {status === "loading" ? (
              <h3>Getting invitation info...</h3>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <p className="mb-2 font-medium text-center">
                  Invitation QrCode:
                </p>

                <QRCode
                  value={`Guest: ${invitation?.host_name}
Arrival: ${invitation?.arrival_date}
Expires in: ${invitation?.expiration_date}
Is valid: ${new Date() < new Date(invitation?.expiration_date)}`}
                />
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full items-center mt-5"
            >
              <fieldset disabled={!isEditing}>
                <div className="w-full">
                  <Input {...register("host_name")} placeholder="Host name" />
                  {isEditing &&
                    inputTouched?.host_name &&
                    errors?.host_name && (
                      <p className="text-sm text-red-500 text-center mt-1">
                        {errors.host_name}
                      </p>
                    )}
                </div>

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
                    min={calculateTimeLimit(form.arrival_date)}
                  />
                  {isEditing &&
                    inputTouched?.arrival_date &&
                    errors?.arrival_date && (
                      <p className="text-sm text-red-500 text-center mt-1">
                        {errors.arrival_date}
                      </p>
                    )}
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
                    min={new Date().toISOString()?.split("T")[0]}
                    placeholder="Arrival date"
                  />
                  {isEditing && errors?.expiration_date && (
                    <p className="text-sm text-red-500 text-center mt-1">
                      {errors.expiration_date}
                    </p>
                  )}
                </div>
              </fieldset>
              <div className="flex gap-x-2 items-center">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSubmit}
                      type="button"
                      disabled={hasErrors}
                      className="px-2"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={toggleEditing}
                      type="button"
                      className="px-2"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      className="px-3"
                      onClick={toggleEditing}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleDelete}
                      type="button"
                      className="px-2"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button onClick={toggle} className="mx-1 w-fit px-3">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitationDetail;
