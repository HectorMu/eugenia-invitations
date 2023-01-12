import Button from "@/components/Button";
import React from "react";

const InvitationRow = ({ invitation }) => {
  return (
    <tr className="border-0 border-b-2 border-b-slate-200 text-sm">
      <td>{invitation.host_name}</td>
      <td>
        {new Intl.DateTimeFormat("en-EN", {
          dateStyle: "full",
          timeStyle: "short",
          hourCycle: "h11",
        }).format(new Date(invitation.arrival_date))}
      </td>
      <td>
        {new Intl.DateTimeFormat("en-EN", {
          dateStyle: "full",
        }).format(new Date(new Date(invitation.expiration_date)))}
      </td>
      <td className="flex gap-1 justify-center items-center py-2">
        <Button className="text-xs rounded-md">Edit</Button>
        <Button className="text-xs rounded-md">Delete</Button>
      </td>
    </tr>
  );
};

export default InvitationRow;
