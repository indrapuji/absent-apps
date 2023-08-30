import React from 'react'
import { CWidgetDropdown, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const WidgetsDropdown = (props) => {
   const { dashboardData } = props
   const renderWidget = () => {
      const widgetColor = [
         {
            header: `${dashboardData.pasienCount}`,
            text: 'Total Pasien',
            color: 'gradient-info',
            icon: 'cil-people',
         },
         {
            header: `${dashboardData.pasienNotUpdateCount}`,
            text: 'Pasien Belum Update',
            color: 'gradient-warning',
            icon: 'cil-user-x',
         },
      ]
      const result = widgetColor.map((data, idx) => {
         let { header, text, color, icon } = data
         return (
            <>
               <CCol sm='6' lg='6' key={data.id}>
                  <CWidgetDropdown
                     color={color}
                     header={header}
                     text={text}
                     footerSlot={
                        <div>
                           <CIcon name={icon} className='float-right mr-3 mb-1' size='4xl' />
                        </div>
                     }
                  />
               </CCol>
            </>
         )
      })
      return result
   }

   // const renderCount = () => {
   //    const widgetColor = [
   //       {
   //          header: `${dashboardData.pcrCount}`,
   //          text: `Total PCR`,
   //          color: 'gradient-info',
   //          icon: 'cil-user',
   //       },
   //    ]
   //    const result = widgetColor.map((data, idx) => {
   //       let { header, text, color, icon } = data
   //       return (
   //          <>
   //             <CCol sm='12' lg='12' key={data.id}>
   //                <CWidgetDropdown
   //                   color={color}
   //                   header={header}
   //                   text={text}
   //                   footerSlot={
   //                      <div>
   //                         <CIcon name={icon} className='float-right mr-3 mb-1' size='4xl' />
   //                      </div>
   //                   }
   //                />
   //             </CCol>
   //          </>
   //       )
   //    })
   //    return result
   // }

   const renderWid = () => {
      const widgetDetail = [
         {
            header: `${dashboardData.pasienPositiveCount}`,
            text: `Total Positive`,
            color: 'gradient-danger',
            icon: 'cil-user',
         },
         {
            header: `${dashboardData.pasienNegativeCount}`,
            text: `Total Negative`,
            color: 'gradient-success',
            icon: 'cil-user',
         },
         {
            header: `${dashboardData.antigenCount}`,
            text: `Total Antigen`,
            color: 'gradient-primary',
            icon: 'cil-user',
         },
         {
            header: `${dashboardData.pcrCount}`,
            text: `Total PCR`,
            color: 'gradient-info',
            icon: 'cil-user',
         },
      ]

      const result = widgetDetail.map((data, idx) => {
         let { header, text, color, icon } = data
         return (
            <>
               <CCol sm='3' lg='3' key={data.id}>
                  <CWidgetDropdown
                     color={color}
                     header={header}
                     text={text}
                     footerSlot={
                        <div>
                           <CIcon name={icon} className='float-right mr-3 mb-1' size='4xl' />
                        </div>
                     }
                  />
               </CCol>
            </>
         )
      })
      return result
   }

   return (
      <>
         <CRow>{dashboardData && renderWidget()}</CRow>
         {/* <CRow>{dashboardData && renderCount()}</CRow> */}
         <CRow>{dashboardData && renderWid()}</CRow>
      </>
   )
}

export default WidgetsDropdown
