const AdminCheck = (data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].klinik !== "" && data[i].klinik !== null && data[i].username !== "programmer") {
      result.push(data[i]);
    }
  }
  return result;
};

export default AdminCheck;
