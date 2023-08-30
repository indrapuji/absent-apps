const ChangeData = (newData) => {
   let result = []
   for (let i = 0; i < newData.length; i++) {
      result.push({
         id: newData[i].id,
         nama: newData[i].nama,
         gender: newData[i].gender,
         tgl_lahir: newData[i].tgl_lahir,
         emp_id: newData[i].emp_id,
         nama_company: newData[i].company.nama,
         status: newData[i].status,
      })
   }
   return result
}

export default ChangeData
