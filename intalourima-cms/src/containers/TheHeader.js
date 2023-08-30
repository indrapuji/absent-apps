import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHeader, CToggler, CHeaderBrand, CHeaderNav, CBreadcrumbRouter, CImg } from '@coreui/react'

// routes config
import routes from '../routes'
import { Logo } from 'src/utilities/CustomData'

import { TheHeaderDropdown } from './index'

const TheHeader = () => {
   const type = localStorage.getItem('type')
   const dispatch = useDispatch()
   const sidebarShow = useSelector((state) => state.sidebarShow)

   const toggleSidebar = () => {
      const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
      dispatch({ type: 'set', sidebarShow: val })
   }

   const toggleSidebarMobile = () => {
      const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
      dispatch({ type: 'set', sidebarShow: val })
   }

   return (
      <CHeader withSubheader>
         <CToggler inHeader className='ml-md-3 d-lg-none' onClick={toggleSidebarMobile} />
         <CToggler inHeader className='ml-3 d-md-down-none' onClick={toggleSidebar} />
         <CHeaderBrand className='mx-auto d-lg-none' to='/'>
            <CImg src={Logo} height={40} className='c-sidebar-brand-full' />
         </CHeaderBrand>

         <CHeaderNav className='d-md-down-none mr-auto'>
            {type !== 'employee' && <CBreadcrumbRouter className='border-0 c-subheader-nav m-0 px-0 px-md-3' routes={routes} />}
         </CHeaderNav>

         <CHeaderNav className='px-3'>
            <TheHeaderDropdown />
         </CHeaderNav>
      </CHeader>
   )
}

export default TheHeader
