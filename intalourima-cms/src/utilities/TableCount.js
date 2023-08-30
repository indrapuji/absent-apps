const tableCount1 = (newData) => {
   let count = Math.round(newData.length / 2)
   let result = []
   let newIndex = newData.sort(function (a, b) {
      return a.no_urut - b.no_urut
   })
   for (let i = 0; i < newIndex.length; i++) {
      if (i < count) {
         result.push(newIndex[i])
      }
   }
   return result.sort(function (a, b) {
      return a.no_urut - b.no_urut
   })
}
const tableCount2 = (newData) => {
   let count = Math.round(newData.length / 2)
   let result = []
   let newIndex = newData.sort(function (a, b) {
      return a.no_urut - b.no_urut
   })
   for (let i = 0; i < newIndex.length; i++) {
      if (i >= count) {
         result.push(newIndex[i])
      }
   }
   return result.sort(function (a, b) {
      return a.no_urut - b.no_urut
   })
}

export { tableCount1, tableCount2 }
