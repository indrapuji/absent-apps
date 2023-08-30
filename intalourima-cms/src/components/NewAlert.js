import Swal from 'sweetalert2'

const NewAlert = ({ status, message }) => {
   return Swal.fire({
      icon: `${status}`,
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
   })
}

export default NewAlert
