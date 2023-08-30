import moment from 'moment'

const arrPrint = (newData) => {
   const result = newData
      .filter((data) => Number(data.status) !== 0 && !data.isCanceled && data.tanggalHasil === moment(new Date()).format('YYYY-MM-DD'))
      .map((data) => Number(data.patientId))
   return result
}

const arrNew = (newData) => {
   let temp = ''
   let result = []
   for (let i = 0; i < newData.length; i++) {
      if (newData[i] !== ',') {
         temp = temp + newData[i]
      } else if (newData[i] === ',') {
         result.push(temp)
         temp = ''
      }
   }
   result.push(temp)
   return result
}

export { arrPrint, arrNew }
