const SCHEDULE_STYLES = {
  dayContainer: "style-dayContainer",
  dayHeader: "style-dayHeader",
  eventList: "style-eventList",
  eventItem: "style-eventItem",
  eventButton: "style-eventButton",
  eventHourContainer: "style-eventHourContainer",
  eventHour: "style-eventHour",
  eventLabel: "style-eventLabel",
  eventTitle: "style-eventTitle",
};

export class Schedule {
  scheduleEvents = {};
  showModalCallback;

  constructor(scheduleData, showModalCallback) {
    this.showModalCallback = showModalCallback;

    scheduleData.forEach((dayObject) => {
      const events = dayObject.events.map((event) => {
        return new ScheduleEvent({
          day: dayObject.day,
          title: event.title,
          label: event.label,
          description: event.description,
          startTime: event.start,
          endTime: event.end,
          speakers: event.speakers,
          location: event.location,
        });
      });

      this.scheduleEvents[dayObject.day] = events;
    });
  }

  render(isNext = false) {
    const days = Object.entries(this.scheduleEvents);
    const newElements = [];

    days.forEach(([day, events]) => {
      if (
        isNext &&
        new Date(day) < new Date().setHours(0, 0, 0, 0)
      ) {
        return;
      }

      const dayContainer = document.createElement("div");
      dayContainer.classList.add(SCHEDULE_STYLES.dayContainer);

      const dayHeader = document.createElement("h2");
      dayHeader.classList.add(SCHEDULE_STYLES.dayHeader);
      const formattedDate = new Date(day).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      dayHeader.innerHTML =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      dayContainer.appendChild(dayHeader);

      const eventList = document.createElement("ul");
      eventList.classList.add(SCHEDULE_STYLES.eventList);

      const filteredEvents = events.filter((event) => {
        if (isNext && new Date(event.endTime) < new Date()) {
          return;
        }

        return event;
      });

      if (filteredEvents.length === 0) return;

      filteredEvents.forEach((event) => {
        eventList.appendChild(event.render(this.showModalCallback));
      });

      dayContainer.appendChild(eventList);
      newElements.push(dayContainer);
    });

    return newElements;
  }
}

class ScheduleEvent {
  day;
  startTime;
  endTime;
  title;
  label;
  description;
  speakers;
  location;

  constructor({
    day,
    startTime,
    endTime,
    title,
    label,
    description,
    speakers,
    location,
  }) {
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.title = title;
    this.label = label;
    this.description = description;
    this.speakers = speakers;
    this.location = location;
  }

  render(handleClick) {
    const eventItemEl = document.createElement("li");
    eventItemEl.classList.add(SCHEDULE_STYLES.eventItem);

    const eventButtonEl = document.createElement("button");
    eventButtonEl.classList.add(SCHEDULE_STYLES.eventButton);
    eventButtonEl.addEventListener("click", () => {
      handleClick(this);
    });

    const eventHourContainerEl = document.createElement("div");
    eventHourContainerEl.classList.add(SCHEDULE_STYLES.eventHourContainer);
    const eventHourEl = document.createElement("span");
    eventHourEl.classList.add(SCHEDULE_STYLES.eventHour);
    eventHourEl.innerHTML = this.#eventHour;

    eventHourContainerEl.appendChild(eventHourEl);
    if (this.label) {
      eventHourContainerEl.appendChild(this.#renderLabel());
    }

    const eventTitleEl = document.createElement("span");
    eventTitleEl.innerHTML = this.title;
    eventTitleEl.classList.add(SCHEDULE_STYLES.eventTitle);

    eventButtonEl.appendChild(eventHourContainerEl);
    eventButtonEl.appendChild(eventTitleEl);
    eventItemEl.appendChild(eventButtonEl);

    return eventItemEl;
  }

  #renderLabel() {
    const eventLabelEl = document.createElement("p");
    eventLabelEl.classList.add(this.label.split(" ").join("-"));

    eventLabelEl.classList.add(SCHEDULE_STYLES.eventLabel);
    eventLabelEl.innerHTML = this.label;

    return eventLabelEl;
  }

  get #eventHour() {
    return new Date(this.startTime).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
