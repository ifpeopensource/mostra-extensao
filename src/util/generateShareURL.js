/**
 * Event object
 * @typedef {Object} EventObject
 * @property {string} title - Title of the event
 * @property {Date} startDate - Start date of the event
 * @property {string} location - Location of the event
 */

/**
 * Generate a share URL
 * @param {string} socialMedia Social media service
 * @param {EventObject} event Event data
 * @returns {string} Share URL
 */
export default function generateShareURL(
  socialMedia,
  { title, startDate, location }
) {
  function copy() {
    return message;
  }

  function whatsapp() {
    const url = new URL("https://api.whatsapp.com/send");
    url.searchParams.set("text", message);
    return url.href;
  }

  function facebook() {
    const url = new URL("https://www.facebook.com/sharer/sharer.php");
    url.searchParams.set("u", "https://mostraextensaoifpe.vercel.app/");
    return url.href;
  }

  function twitter() {
    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", message);
    url.searchParams.set("hashtags", "mostraifpe");
    return url.href;
  }

  function telegram() {
    const url = new URL("https://telegram.me/share");
    url.searchParams.set("text", message);
    return url.href;
  }

  function linkedin() {
    const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
    url.searchParams.set("url", "https://mostraextensaoifpe.vercel.app/");
    return url.href;
  }

  function gmail() {
    const url = new URL("https://mail.google.com/mail/");
    url.searchParams.set("view", "cm");
    url.searchParams.set("su", `${title} na X Mostra de Extensão do IFPE`);
    url.searchParams.set("body", message);
    return url.href;
  }

  function email() {
    const url = new URL("mailto:");
    url.searchParams.set("subject", `${title} na X Mostra de Extensão do IFPE`);
    url.searchParams.set("body", message);
    return url.href;
  }

  const socialMediaServices = {
    copy,
    whatsapp,
    facebook,
    twitter,
    telegram,
    linkedin,
    gmail,
    email,
  };

  const formmatedDate = {
    day: startDate.toLocaleString("pt-BR", {
      day: "numeric",
      month: "numeric",
    }),
    weekday: startDate.toLocaleString("pt-BR", {
      weekday: "long",
    }),
    hour: startDate.toLocaleString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    }),
  };

  const message = `${
    formmatedDate.weekday.charAt(0).toUpperCase() +
    formmatedDate.weekday.slice(1)
  } (${formmatedDate.day}) às ${
    formmatedDate.hour
  } vai acontecer o evento ${title} durante a X Mostra de Extensão do IFPE.\n\nLocal: ${location} - IFPE Campus Recife.\n\nPara mais informações, acesse: https://mostraextensaoifpe.vercel.app`;

  if (!socialMediaServices[socialMedia]) {
    throw new Error(`Unknown social media service: ${socialMedia}`);
  }
  return socialMediaServices[socialMedia]();
}
