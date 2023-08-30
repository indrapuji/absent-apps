import { formatDate } from 'node-format-date'

const MapData = (data) => {
   let result = []
   for (let i = 0; i < data.length; i++) {
      result.push({
         // patientId: data[i].patientId,
         kodePos: data[i].kodePos,
         nama: data[i].nama,
         nik: data[i].nik,
         gender: data[i].gender === 1 ? 'L' : 'P',
         tanggalLahir: formatDate(data[i].tanggalLahir),
         noHP: data[i].noHP,
         alamat: data[i].alamat,
         organisasiName: data[i].organisasiName,
         status: data[i].status === 0 ? '' : data[i].status === 1 ? 'POSITIVE' : 'NEGATIVE',
         sampleDate: formatDate(data[i].sampleDate),
         resultDate: formatDate(data[i].resultDate),
         tipePemeriksaanNama: data[i].tipePemeriksaanNama,
      })
   }
   return result
}

export default MapData
