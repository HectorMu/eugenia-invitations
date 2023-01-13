import React from "react";

const InvitationRow = ({ invitation, onRowClick }) => {
  return (
    <tr
      onClick={() => onRowClick(invitation)}
      className="border-0 border-b-2 border-b-slate-200 text-sm hover:cursor-pointer hover:bg-slate-300"
    >
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
    </tr>
  );
};

export default InvitationRow;
