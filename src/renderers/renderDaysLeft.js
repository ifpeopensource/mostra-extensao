/**
 * Render the days left until the event.
 * @param {number} daysLeft Days left until the event.
 * @param {number} eventDuration Duration of the event in days.
 */
export default function renderDaysLeft(daysLeft, eventDuration) {
  const daysLeftElement = document.querySelector(".el-days-left");
  if (daysLeft > 1) {
    daysLeftElement.innerHTML = `O evento começa em ${daysLeft} dias!`;
  } else if (daysLeft === 1) {
    daysLeftElement.innerHTML = `O evento começa amanhã!`;
  } else if (daysLeft > -eventDuration) {
    daysLeftElement.innerHTML = `O evento já começou!`;
  } else {
    daysLeftElement.innerHTML = `Obrigado a todos que participaram do evento!`;
  }
}
