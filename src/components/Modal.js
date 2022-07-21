import generateCalendarURL from "../util/generateCalendarURL";
import generateShareURL from "../util/generateShareURL";

const MODAL_STYLES = {
  details: {
    titleEl: "style-modal-event-details-title",
  },
  shareButton: "style-modal-share-calendar-button",
  calendarButton: "style-modal-share-calendar-button",
};

const SOCIAL_NETWORKS_SHARE = [
  "whatsapp",
  "facebook",
  "twitter",
  "telegram",
  "linkedin",
  "gmail",
  "email",
];

const CALENDAR_SERVICES = ["google", "outlook"];

export class Modal {
  #containerEl;
  #overlayEl;
  #closeButtonEl;
  #eventEls;
  eventData;
  body = document.querySelector("body");

  constructor(backgroundEl, overlayEl) {
    this.#containerEl = backgroundEl;

    this.#overlayEl = overlayEl;
    this.#overlayEl.addEventListener("click", () => {
      this.hide();
    });

    this.#closeButtonEl = this.#containerEl.querySelector(".el-modal-close");
    this.#closeButtonEl.addEventListener("click", () => {
      this.hide();
    });

    this.#eventEls = {
      title: this.#containerEl.querySelector(".el-modal-event-title"),
      details: this.#containerEl.querySelector(".el-modal-event-details"),
      description: this.#containerEl.querySelector(
        ".el-modal-event-description"
      ),
      share: this.#containerEl.querySelector(".el-modal-share"),
      calendar: this.#containerEl.querySelector(".el-modal-calendar"),
    };
  }

  show(eventData) {
    this.#overlayEl.classList.remove("hidden");
    this.#containerEl.classList.remove("hidden");
    this.body.style.overflow = "hidden";

    this.eventData = eventData;
    this.#render();
  }

  hide() {
    this.#overlayEl.classList.add("hidden");
    this.#containerEl.classList.add("hidden");

    this.body.style.overflow = "auto";
  }

  #render() {
    this.#eventEls.title.innerText = this.eventData.title;
    this.#eventEls.details.replaceChildren();
    this.#renderDetails();

    if (this.eventData.description) {
      this.#eventEls.description.innerText = this.eventData.description;
    }
    this.#renderShare();
    this.#renderCalendar();
  }

  #renderDetails() {
    const elements = {
      speakers: renderDetailElement("Palestrante(s)", this.eventData.speakers),
      location: renderDetailElement("Local", this.eventData.location),
      day: renderDetailElement("Data", this.#formattedDay),
      startTime: renderDetailElement("Horário", this.#formattedTime),
    };

    function renderDetailElement(title, content) {
      const detailEl = document.createElement("h2");

      const titleEl = document.createElement("span");
      titleEl.classList.add(MODAL_STYLES.details.titleEl);
      titleEl.innerText = `${title}: `;

      const contentEl = document.createElement("span");
      contentEl.innerText = content;

      detailEl.appendChild(titleEl);
      detailEl.appendChild(contentEl);
      return detailEl;
    }

    for (const key in elements) {
      if (this.eventData[key]) {
        this.#eventEls.details.appendChild(elements[key]);
      }
    }
  }

  #renderShare() {
    const buttons = SOCIAL_NETWORKS_SHARE.map((network) => {
      const url = generateShareURL(network, {
        title: this.eventData.title,
        startDate: new Date(this.eventData.startTime),
        location: this.eventData.location,
      });
      return new Button({
        href: url,
        text: network.charAt(0).toUpperCase() + network.slice(1),
        img: `/assets/icons/${network}.svg`,
      }).render();
    });

    this.#eventEls.share.replaceChildren(...buttons);
  }

  #renderCalendar() {
    const buttons = CALENDAR_SERVICES.map((service) => {
      const url = generateCalendarURL(service, {
        title: this.eventData.title,
        speakers: this.eventData.speakers,
        description: this.eventData.description,
        location: this.eventData.location,
        startDate: new Date(this.eventData.startTime),
        endDate: new Date(this.eventData.endTime),
      });
      return new Button({
        href: url,
        text: service.charAt(0).toUpperCase() + service.slice(1),
        img: `/assets/icons/${service}.svg`,
      }).render();
    });

    this.#eventEls.calendar.replaceChildren(...buttons);
  }

  get #formattedDay() {
    const formatted = new Date(this.eventData.day).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  get #formattedTime() {
    function formatTime(time) {
      return time.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const formattedStart = formatTime(new Date(this.eventData.startTime));
    const formattedEnd = formatTime(new Date(this.eventData.endTime));

    return `${formattedStart} às ${formattedEnd}`;
  }
}

class Button {
  #href;
  #text;
  #img;

  constructor({ href, text, img }) {
    this.#href = href;
    this.#text = text;
    this.#img = img;
  }

  render() {
    const button = document.createElement("a");
    button.href = this.#href;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.classList.add(MODAL_STYLES.shareButton);

    const img = document.createElement("img");
    img.src = this.#img;
    img.alt = this.#text;
    img.width = "24";

    const text = document.createElement("span");
    text.innerText = this.#text;

    button.appendChild(img);
    button.appendChild(text);

    return button;
  }
}
