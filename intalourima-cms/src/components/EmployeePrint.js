import React from 'react'
import { CCard, CCol, CRow, CButton, CSelect, CForm, CInput, CInputCheckbox, CFormGroup, CLabel } from '@coreui/react'
import { formatDate } from 'node-format-date'

const EmployeePrint = (props) => {
   const { data } = props
   return (
      <div className='print-page'>
         <CRow>
            <CCol>
               {data.map((item, index) => {
                  return (
                     <CCard>
                        <div style={{ marginTop: 20, marginLeft: 40, marginRight: 40 }}>
                           <div style={{ textAlign: 'center' }}>
                              <h3 style={{ textDecoration: 'underline' }}>SURAT PERNYATAAN CALON PESERTA MEDICAL</h3>
                              <h5>HARAP DIISI DENGAN HURUF BESAR / CAPITAL DENGAN JELAS !!</h5>
                           </div>
                           <div>
                              <p style={{ textDecoration: 'underline' }}>DATA PRIBADI</p>
                           </div>
                           <CRow>
                              <CCol xs='6'>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Nama</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.nama}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Umur / Jenis Kelamin</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>
                                          : {item.umur} tahun / {item.gender === 'male' ? 'Laki - laki' : 'Perempuan'}
                                       </p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>No Karyawan / Passpor</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.emp_id}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Tempat / Tanggal Lahir</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>
                                          : {item.tempat_lahir ? item.tempat_lahir : '....................'} / {formatDate(item.tgl_lahir)}
                                       </p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>No Telp / Hp</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.no_hp}</p>
                                    </CCol>
                                 </CFormGroup>
                              </CCol>

                              <CCol xs='6'>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Dept / Section</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.departemen}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Jabatan</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.jabatan}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Medical Terakhir di</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.tempat_medical_terakhir}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Tanggal Medical Terakhir</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.tanggal_medical_terakhir}</p>
                                    </CCol>
                                 </CFormGroup>
                                 <CFormGroup row className='card-print'>
                                    <CCol md='4'>
                                       <CLabel>
                                          <small>Nama Ayah</small>
                                       </CLabel>
                                    </CCol>
                                    <CCol md='8'>
                                       <p>: {item.ayah}</p>
                                    </CCol>
                                 </CFormGroup>
                              </CCol>
                           </CRow>
                           <CFormGroup row className='card-print'>
                              <CCol md='2'>
                                 <CLabel>
                                    <small>Alamat tinggal sekarang</small>
                                 </CLabel>
                              </CCol>
                              <CCol md='10'>
                                 <p>: {item.alamat_1}</p>
                              </CCol>
                           </CFormGroup>
                           <div>
                              <p>
                                 Apakah anda sedang atau pernah menderita atau pernah mendapat pengobatan dari gangguan kesehatan seperti dibawah ini, beri tanda {'('}v{')'} pada
                                 kolom yang telah disediakan dan jelaskan
                              </p>
                           </div>
                        </div>
                        {/* <div style={{ marginRight: 30 }}>
                  <p className="float-right">page {index + 1}</p>
                </div> */}
                     </CCard>
                  )
               })}
            </CCol>
         </CRow>
      </div>
   )
}

export default EmployeePrint
