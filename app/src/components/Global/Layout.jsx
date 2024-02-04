import { useCallback, useState } from 'react'
import { useSession } from '@/hooks/useSession'
import Navbar from '@/components/Navigation/Navbar'
import Sidebar from '@/components/Navigation/Sidebar'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Modal from '../Modal'
import InvitationsCreator from '../../modals/InvitationsCreator/InvitationsCreator'

export const Layout = ({ children }) => {
  const user = useSession()

  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleSideBar = useCallback(() => setIsActive((prev) => !prev), [])
  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), [])

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            <InvitationsCreator toggle={toggleModal} />
          </Modal>
        )}
      </AnimatePresence>
      <Navbar
        isActive={isActive}
        toggleSideBar={toggleSideBar}
        toggleModal={toggleModal}
      />

      <div className="wrapper">
        {user && <Sidebar isActive={isActive} toggleSideBar={toggleSideBar} />}

        <div className="content">{children}</div>
      </div>
      <Toaster />
    </>
  )
}
