import React, { useContext, useRef } from 'react'
// import { Transition, Backdrop } from '@roketid/windmill-react-ui'
import SidebarContext from 'context/SidebarContext'
import SidebarContent from './SidebarContent'


function MobileSidebar() {
  const sidebarRef = useRef(null)
  const { isSidebarOpen, saveScroll } = useContext(SidebarContext)

  const linkClickedHandler = () => {
    saveScroll(sidebarRef.current)
  }
  return isSidebarOpen && <aside
    id="mobileSidebar"
    ref={sidebarRef}
    className="fixed inset-y-0 z-40 flex-shrink-0 w-full mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden"
  >
    <SidebarContent linkClicked={linkClickedHandler} />
  </aside>
}

export default MobileSidebar
