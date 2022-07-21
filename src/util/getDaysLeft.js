/**
 * Function to calculate the number of days left until the event
 *
 * @param {Date} date Event date
 * @returns {number} Days left
 */
export default function getDaysLeft(date) {
  if (!date) {
    throw new Error("No date provided");
  }

  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // diff / Milliseconds in a day
}
