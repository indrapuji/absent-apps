import React from 'react' // useEffect, useState
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

const TheHeaderDropdown = () => {
   const history = useHistory()
   const logoutUser = () => {
      localStorage.clear()
      history.push('/login')
   }
   return (
      <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
         <CDropdownToggle className='c-header-nav-link' caret={false}>
            <div className='c-avatar'>
               <CImg src={'avatars/doctor-icon.png'} className='c-avatar-img' alt='admin@bootstrapmaster.com' />
            </div>
         </CDropdownToggle>
         <CDropdownMenu className='pt-0' placement='bottom-end'>
            <CDropdownItem onClick={() => history.push('/password')}>
               <CIcon name='cil-lock-locked' className='mfe-2' />
               ganti Password
            </CDropdownItem>
            <CDropdownItem onClick={() => logoutUser()}>
               <CIcon name='cil-input' className='mfe-2' />
               Logout
            </CDropdownItem>
         </CDropdownMenu>
      </CDropdown>
   )
}

export default TheHeaderDropdown
