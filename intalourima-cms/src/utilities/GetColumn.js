const getColumn = (newData) => {
   let column = []
   let newKey = ''

   // console.log(newData)

   for (let key in newData[0]) {
      if (
         key !== 'createdAt' &&
         key !== 'patientId' &&
         key !== 'updatedAt' &&
         key !== 'pekerjaan' &&
         key !== 'noRegistrasi' &&
         key !== 'tipePemeriksaanId' &&
         key !== 'tipePemeriksaanAlias' &&
         key !== 'harga' &&
         key !== 'dokterId' &&
         key !== 'adminPrintId' &&
         key !== 'outlet' &&
         key !== 'dokterKlinik' &&
         key !== 'tempatLahir' &&
         key !== 'umur' &&
         key !== 'noIzinAlat' &&
         key !== 'noSurat' &&
         key !== 'dokterNama' &&
         key !== 'adminPrintNama' &&
         key !== 'isCanceled' &&
         key !== 'numberLab' &&
         key !== 'petugas' &&
         key !== 'code' &&
         key !== 'genE' &&
         key !== 'genEKeterangan' &&
         key !== 'genN' &&
         key !== 'genNKeterangan' &&
         key !== 'genORF' &&
         key !== 'genORFKeterangan' &&
         key !== 'sample' &&
         key !== 'noRekamMedis' &&
         key !== 'tanggalPeriksa' &&
         key !== 'tanggalHasil' &&
         key !== 'jamHasil' &&
         key !== 'jamPeriksa' &&
         key !== 'noHasil' &&
         key !== 'clinic' &&
         key !== 'tipePemeriksaanNama' &&
         key !== 'noSuratKeterangan' &&
         key !== 'noLab' &&
         key !== 'organisasi' &&
         key !== 'kodePos'
      ) {
         if (key === 'gender') {
            newKey = 'JENIS KELAMIN'
            column.push({ header: newKey, field: key })
         } else if (key === 'status') {
            newKey = 'Hasil Pemeriksaan'
            column.push({ header: newKey, field: key })
            // } else if (key === 'kodePos') {
            //    newKey = 'No. Sample'
            //    column.push({ header: newKey, field: key })
         } else if (key === 'sampleDate') {
            newKey = 'Sampel Diterima'
            column.push({ header: newKey, field: key })
         } else if (key === 'resultDate') {
            newKey = 'Tanggal Hasil'
            column.push({ header: newKey, field: key })
         } else if (key === 'nik') {
            newKey = 'NIK/PASSPORT'
            column.push({ header: newKey, field: key })
         } else if (key === 'tanggalLahir') {
            newKey = 'Tgl Lahir/Umur'
            column.push({ header: newKey, field: key })
         } else if (key === 'noHP') {
            newKey = 'No. Handphone'
            column.push({ header: newKey, field: key })
            // } else if (key === 'organisasi') {
            //    newKey = 'ID Grup'
            //    column.push({ header: newKey, field: key })
         } else if (key === 'organisasiName') {
            newKey = 'Grup'
            column.push({ header: newKey, field: key })
         } else {
            column.push({ header: key.toUpperCase().replace(/_/g, ' '), field: key })
         }
      }
   }
   return column
}

export default getColumn
