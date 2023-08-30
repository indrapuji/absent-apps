const timeInfo = () => {
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds

  return `${hours}:${min}:${sec}`;
};

export default timeInfo;
