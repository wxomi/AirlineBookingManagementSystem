function compareTime(arrival, departure) {
  let dateTime1 = new Date(arrival);
  let dateTime2 = new Date(departure);
  return dateTime1.getTime() < dateTime2.getTime();
}

module.exports = {
  compareTime,
};
