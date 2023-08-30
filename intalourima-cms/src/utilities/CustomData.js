import Logo from '../assets/images/logo.png'
import LogoHeader from '../assets/images/header-biomedica.png'
import LongLogo from '../assets/images/logo_long.png'
import ShortLogo from '../assets/images/logo_short.png'
import TTD_Nasir from '../assets/images/TDD-dr-Nasir.png'
import ttd_zada from '../assets/images/ttd_zada.png'
import ttd_biocare from '../assets/images/ttd_biocare.png'
import TTD_Alya from '../assets/images/TDD-dr-Alya.png'
import LogoName from '../assets/images/logoName.png'
import Bottom from '../assets/images/footer-biomedica.jpg'
import CapZada from '../assets/images/cap-zada.png'

const ClinicName = 'Klinik & Apotek BIOCARE'
const CustomToken =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiMTQiLCJ1c2VybmFtZSI6InphZGFtZWRpa2EiLCJhZG1pblR5cGUiOjEsImlhdCI6MTYzNDk2MDMzN30.HJd8mFPXgoiLdwW5djIkzmemXLyGdXM3QMStTDLqPMc'
const CustomUrl = 'https://api.griyamedika.co.id'

const SIP_Alya = 'SIP.No.005.11/001-281/SIP.TM/DPMPTSP-BTM/VII/2021'
const SIP_Nasir = 'SIP.No.004.1/012-028/SIP.TM/DPMPTSP-BTM/V/21'

const ClinicNameFront = (
   <div style={{ marginTop: 10 }}>
      Klinik {'&'} Apotek
      <br />
      <span style={{ color: 'green' }}>BIOCARE</span>
   </div>
)

const ClinicAlamat = (
   <div>
      <p>
         Jl. KH. Ahmad Dahlan No. 11,
         <br />
         Sei. Harapan, Kec. Sekupang
         <br />
         No. Telp. (0778) 801-4936
         <br />
         WA 0822-6819-3422
      </p>
   </div>
)

export {
   CustomToken,
   CustomUrl,
   Logo,
   LogoName,
   Bottom,
   LongLogo,
   LogoHeader,
   ShortLogo,
   ClinicName,
   ClinicNameFront,
   ClinicAlamat,
   TTD_Nasir,
   SIP_Nasir,
   TTD_Alya,
   SIP_Alya,
   CapZada,
   ttd_biocare,
   ttd_zada,
}
