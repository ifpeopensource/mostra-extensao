/**
 * Render the days left until the event.
 * @param {number} daysLeft Days left until the event.
 */
export default function renderDaysLeft(daysLeft) {
  const daysLeftElement = document.querySelector(".el-days-left");
  if (daysLeft >= 1) {
    daysLeftElement.innerHTML = `O evento começa em ${daysLeft} dia${
      daysLeft > 1 ? "s" : ""
    }!`;
  } else {
    daysLeftElement.innerHTML = `O evento já começou!`;
  }
}
