export default class ScheduleFilter {
  activeFilter = "next";
  callback;
  static #filters = [];

  constructor(callback) {
    ScheduleFilter.callback = callback;
    document
      .querySelectorAll(".el-schedule-filter")
      .forEach((filterElement) => {
        ScheduleFilter.#filters.push(filterElement);
        filterElement.addEventListener("click", ScheduleFilter.filter);
      });
  }

  static filter(event) {
    ScheduleFilter.activeFilter =
      event.target.id === "el-schedule-filter-all" ? "all" : "next";

    ScheduleFilter.#filters.forEach((filterElement) => {
      if (filterElement === event.target) {
        filterElement.classList.remove("el-schedule-filter--inactive");
        filterElement.classList.add("el-schedule-filter--active");
      } else {
        filterElement.classList.remove("el-schedule-filter--active");
        if (!filterElement.classList.contains("el-schedule-filter--inactive")) {
          filterElement.classList.add("el-schedule-filter--inactive");
        }
      }
    });

    ScheduleFilter.callback(ScheduleFilter.activeFilter);
  }
}
