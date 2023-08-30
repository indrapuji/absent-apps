const changeRespon = (data) => {
  const newData = data.filter((item) => item.keluar !== null);
  const organizedByTitle = newData.reduce(
    (map, e) => ({
      ...map,
      [e.event]: [...(map[e.event] ?? []), e],
    }),
    {}
  );
  const result = [];
  for (let key in organizedByTitle) {
    result.push({
      title: key,
      data: organizedByTitle[key],
    });
  }
  return result;
};

module.exports = changeRespon;
