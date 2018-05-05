
module.exports = (date) => {

  let today;

  if (date) {
    today = new Date(date);
  } else {
    today = new Date();
  }

  let dd = today.getDate();

  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  let newDate;

  if (dd < 10 && mm < 10) {
    newDate = yyyy + '-0' + mm + '-0' + dd;
  } else if (dd < 10) {
    newDate = yyyy + '-' + mm + '-0' + dd;
  } else if (mm < 10) {
    newDate = yyyy + '-0' + mm + '-' + dd;
  } else {
    newDate = yyyy + '-' + mm + '-' + dd;
  }

  return newDate;

};
