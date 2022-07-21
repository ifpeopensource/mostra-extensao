/**
 * Event object
 * @typedef {Object} EventObject
 * @property {string} title - Title of the event
 * @property {string} speakers - Speakers of the event
 * @property {string} description - Description of the event
 * @property {Date} startDate - Start date of the event
 * @property {Date} endDate - End date of the event
 * @property {string} location - Location of the event
 */

/**
 * Generate a event URL for the calendar.
 * @param {string} calendarService The calendar service to use.
 * @param {EventObject} event Event object.
 * @returns {string} URL to create the event.
 */
export default function generateCalendarURL(calendarService, event) {
  function genGoogleCalendarURL({
    title,
    speakers,
    description,
    location,
    startDate,
    endDate,
  }) {
    const url = new URL("https://calendar.google.com/calendar/render");

    const start = startDate.toISOString().replace(/-|:|\./g, "");
    const end = endDate.toISOString().replace(/-|:|\./g, "");
    url.searchParams.set("dates", `${start}/${end}`);

    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", `${title} | X Mostra de Extensão do IFPE`);
    url.searchParams.set("ctz", "America/Recife");
    if (speakers) {
      url.searchParams.set(
        "details",
        `Palestrantes: ${speakers}\n\n${description}`
      );
    } else {
      url.searchParams.set("details", description);
    }
    url.searchParams.set("location", location);
    url.searchParams.set("crm", "BUSY");
    url.searchParams.set(
      "sprop",
      "sprop=website:mostraextensaoifpe.com.br&sprop=name:Mostra-Extensão"
    );

    return url.href;
  }
  function genOutlookCalendarURL({
    title,
    speakers,
    description,
    location,
    startDate,
    endDate,
  }) {
    const url = new URL("https://outlook.live.com/calendar/0/deeplink/compose");

    const start = startDate.toISOString();
    const end = endDate.toISOString();
    url.searchParams.set("startdt", start);
    url.searchParams.set("enddt", end);

    url.searchParams.set("path", "/calendar/action/compose");
    url.searchParams.set("rru", `addevent`);
    url.searchParams.set("subject", `${title} | X Mostra de Extensão do IFPE`);
    if (speakers) {
      url.searchParams.set(
        "body",
        `Palestrantes: ${speakers}\n\n${description}`
      );
    } else {
      url.searchParams.set("body", description);
    }
    url.searchParams.set("location", location);

    return url.href;
  }

  const calendarServices = {
    google: genGoogleCalendarURL,
    outlook: genOutlookCalendarURL,
  };

  if (!calendarServices[calendarService]) {
    throw new Error(`Unknown calendar service: ${calendarService}`);
  }
  return calendarServices[calendarService](event);
}
