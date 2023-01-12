import Button from "@/components/Button";
import { getInvitationDetail } from "@/services/invitations.service";
import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";

const InvitationDetail = ({ toggle, invitation: localInvitation }) => {
  const {
    data: fetchedInvitation,
    status,
    isError,
  } = useQuery({
    queryFn: () => getInvitationDetail(localInvitation.id),
    queryKey: [`invitation-detail-`, localInvitation.id],
  });

  const invitation = isError ? localInvitation : fetchedInvitation;

  return (
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-slate-400 text-left shadow-xl transition-all w-11/12  sm:w-full sm:max-w-lg ">
        <div className="bg-slate-100  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
          <div>
            {status === "loading" ? (
              <h3>Getting invitation info...</h3>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <p className="mb-2 font-medium">Invitation QrCode:</p>
                <QRCode
                  value={`Guest: ${invitation?.host_name}
Arrival: ${invitation?.arrival_date}
Expires in: ${invitation?.expiration_date}
Is valid: ${new Date() < new Date(invitation?.expiration_date)}`}
                />
              </div>
            )}
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
