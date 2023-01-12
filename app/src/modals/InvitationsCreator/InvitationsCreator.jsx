import Button from "../../components/Button";
import Input from "../../components/Input";
import useInvitationCreator from "./hooks/useInvitationCreator";

const InvitationsCreator = ({ toggle }) => {
  const {
    errors,
    handleSubmit,
    hasErrors,
    inputTouched,
    now,
    register,
    status,
  } = useInvitationCreator(toggle);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div className="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all w-11/12  sm:w-full sm:max-w-lg ">
        <div className="bg-slate-100  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          <form className="flex flex-col gap-4 w-full items-center">
            <p className="text-lg font-medium">New invitation</p>

            <div className="w-full">
              <Input {...register("host_name")} placeholder="Host name" />
              {inputTouched?.host_name && errors?.host_name && (
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
                min={now.toISOString().slice(0, 16)}
              />
              {inputTouched?.arrival_date && errors?.arrival_date && (
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
                min={new Date().toISOString().split("T")[0]}
                placeholder="Arrival date"
              />
              {errors?.expiration_date && (
                <p className="text-sm text-red-500 text-center mt-1">
                  {errors.expiration_date}
                </p>
              )}
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
            className="mx-1 w-fit px-3 "
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InvitationsCreator;
