import { getUserInvitations } from "@/services/invitations.service";
import { useQuery } from "@tanstack/react-query";
import InvitationsTable from "./components/InvitationsTable";

const Home = () => {
  const { data: invitations, status } = useQuery({
    queryFn: getUserInvitations,
    queryKey: ["user-invitations"],
  });
  return (
    <div className="w-11/12 lg:w-6/12 mx-auto mt-5">
      <h1 className="text-4xl text-center text-white font-medium border-0 border-b-2 pb-5">
        My invitations
      </h1>
      <InvitationsTable invitations={invitations} status={status} />
    </div>
  );
};

export default Home;
