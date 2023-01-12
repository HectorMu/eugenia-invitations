import Spinner from "@/components/Spinner";
import usePagination from "@/hooks/usePagination";
import React from "react";
import ReactPaginate from "react-paginate";
import InvitationRow from "./InvitationRow";

const InvitationsTable = ({ invitations = [], status }) => {
  const { currentItems, handlePageClick, pageCount } = usePagination(
    invitations,
    1
  );

  console.log(currentItems);
  return (
    <div className="rounded-lg bg-slate-900 mt-5 overflow-hidden max-h-[600px] overflow-y-auto">
      <table className="w-full text-center rounded-lg relative">
        <thead className="text-white font-bold ">
          <tr>
            <th>Host</th>
            <th>Arrival date</th>
            <th>Expiration date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {status === "error" ? (
          <h3>We can't load your invitations, try again later</h3>
        ) : (
          <tbody className="bg-slate-400 font-medium relative w-full">
            {status === "loading" ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex justify-center w-full py-3">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              currentItems?.map((item) => (
                <InvitationRow key={item.id} invitation={item} />
              ))
            )}
          </tbody>
        )}
      </table>
      <ReactPaginate onPageChange={handlePageClick} pageCount={pageCount} />
    </div>
  );
};

export default InvitationsTable;
