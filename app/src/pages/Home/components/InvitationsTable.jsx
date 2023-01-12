import { useState } from "react";
import Spinner from "@/components/Spinner";
import usePagination from "@/hooks/usePagination";
import React from "react";
import ReactPaginate from "react-paginate";
import InvitationRow from "./InvitationRow";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import InvitationDetail from "@/modals/invitationDetail/InvitationDetail";
import Modal from "@/components/Modal";

const InvitationsTable = ({ invitations = [], status }) => {
  const [selectedInvitation, setSelectedInvitation] = useState(null);

  const handleInvitationSelection = (invitation) =>
    setSelectedInvitation(invitation);

  const cleanInvitationSelection = () => setSelectedInvitation(null);

  const { currentItems, handlePageClick, pageCount } = usePagination(
    invitations,
    10
  );

  console.log(selectedInvitation);

  return (
    <>
      <AnimatePresence>
        {Boolean(selectedInvitation) && (
          <Modal>
            <InvitationDetail
              invitation={selectedInvitation}
              toggle={cleanInvitationSelection}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className="rounded-lg bg-slate-900 mt-5 overflow-hidden max-h-[600px] overflow-y-auto">
        <table className="w-full text-center rounded-lg relative">
          <thead className="text-white font-bold ">
            <tr>
              <th>Host</th>
              <th>Arrival date</th>
              <th>Expires in</th>
              <th>Actions</th>
            </tr>
          </thead>
          {status === "error" ? (
            <h3>We can't load your invitations, try again later</h3>
          ) : (
            <tbody className="bg-slate-400 font-medium relative w-full">
              {status === "loading" ? (
                <tr className="pointer-events-none">
                  <td colSpan={4}>
                    <div className="flex justify-center w-full py-3">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr className="pointer-events-none">
                  <td colSpan={4}>
                    <div className="flex justify-center w-full py-3">
                      You don't have invitations yet, create one clicking in the
                      the navbar "New invitation button"
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems?.map((item) => (
                  <InvitationRow
                    onRowClick={handleInvitationSelection}
                    key={item.id}
                    invitation={item}
                  />
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-end">
        <ReactPaginate
          breakLabel="..."
          renderOnZeroPageCount={null}
          pageRangeDisplayed={3}
          breakClassName="bg-white rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300"
          activeClassName={
            "bg-gray-400 rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300"
          }
          className="inline-flex items-center gap-2 justify-center mt-2"
          nextClassName="bg-white rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300 "
          previousClassName="bg-white rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300"
          nextLabel={<RiArrowRightSLine />}
          previousLabel={<RiArrowLeftSLine />}
          disabledLinkClassName={
            "bg-slate-100 pointer-events-none rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300 "
          }
          pageClassName="bg-white rounded-full p-2 text-sm w-[20px] h-[20px] flex items-center justify-center hover:bg-slate-300"
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </>
  );
};

export default InvitationsTable;
