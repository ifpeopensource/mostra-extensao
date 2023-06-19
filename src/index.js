import "./style.css";
import feather from "feather-icons";

import render from "./renderers";

import { Schedule } from "./components/Schedule";
import { Speakers } from "./components/Speakers";
import { Modal } from "./components/Modal";
import ScheduleFilter from "./ScheduleFilter";

import getDaysLeft from "./util/getDaysLeft";
import scheduleData from "./schedule.json";
import speakersData from "./speakers.json";

const modalContainer = document.querySelector(".el-modal-container");
const modalOverlay = document.querySelector(".el-modal-overlay");
const modal = new Modal(modalContainer, modalOverlay);

const daysLeft = getDaysLeft(new Date("2023-06-27T00:00:00"));
render.daysLeft(daysLeft + 1, 4);

new ScheduleFilter((activeFilter) => {
  switch (activeFilter) {
    case "all":
      const newDays = schedule.render(false);
      daysContainer.replaceChildren(...newDays);
      break;
    case "next":
      const newDaysNext = schedule.render(true);
      daysContainer.replaceChildren(...newDaysNext);
      break;
  }
});

const schedule = new Schedule(scheduleData, (eventData) => {
  modal.show(eventData);
});

const daysContainer = document.querySelector(".el-schedule-days-container");
const newDays = schedule.render(true);
daysContainer.replaceChildren(...newDays);

const speakersContainer = document.querySelector(".el-speakers-container");
const loadMoreSpeakersButton = document.querySelector(".el-speakers-load");
new Speakers(speakersData, speakersContainer, loadMoreSpeakersButton);

feather.replace();
