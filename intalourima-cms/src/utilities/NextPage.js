const NextPage = (data, dataId) => {
   const dataIndex = data.indexOf(dataId)
   return data[dataIndex + 1]
}

export default NextPage
