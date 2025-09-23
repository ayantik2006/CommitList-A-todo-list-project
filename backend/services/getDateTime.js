exports.getDateTime = () => {
  const now = new Date();
  let returnVal;
  returnVal =
    now.getDate() +
    "/" +
    (now.getMonth() + 1) +
    "/" +
    now.getFullYear() +
    ", " +
    now.getHours() +
    ":" +
    now.getMinutes();
  return returnVal;
};
