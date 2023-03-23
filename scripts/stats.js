// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  // Get the Events List asynchronously
  let urlApi;
  let upcomingEvents = [];
  let pastEvents = [];

  urlApi = fetchApiEvents("upcoming");

  fetchApi(urlApi)
    .then((data) => {
      upcomingEvents = data.events;

      urlApi = fetchApiEvents("past");

      fetchApi(urlApi).then((data) => {
        pastEvents = data.events;

        calculateStats(upcomingEvents, pastEvents);
      });
    })
    .catch((error) => console.log(error));
});

/* Functions -------------------------------- */

function calculateStats(upcomingEvents, pastEvents) {
  let stats = {};

  stats["highestPctAttendanceEvent"] = getHighestPctAttendanceEvent(pastEvents);
  stats["lowestPctAttendanceEvent"] = getLowestPctAttendanceEvent(pastEvents);
  stats["largerCapacityEvent"] = getLargerCapacityEvent(pastEvents);

  stats["upcomingEventsStatsByCategory"] =
    getEventsStatsBySortedCategory(upcomingEvents);
  stats["pastEventsStatsByCategory"] =
    getEventsStatsBySortedCategory(pastEvents);

  createTableView(stats);
}

function getHighestPctAttendanceEvent(eventsAttendance) {
  let event = eventsAttendance.find(
    (event) =>
      event.assistance / event.capacity ==
      Math.max(
        ...eventsAttendance.map((event) => event.assistance / event.capacity)
      )
  );
  event.pctAttendance = ((event.assistance / event.capacity) * 100).toFixed(2);

  return event;
}

function getLowestPctAttendanceEvent(eventsAttendance) {
  let event = eventsAttendance.find(
    (event) =>
      event.assistance / event.capacity ==
      Math.min(
        ...eventsAttendance.map((event) => event.assistance / event.capacity)
      )
  );

  event.pctAttendance = ((event.assistance / event.capacity) * 100).toFixed(2);

  return event;
}

function getLargerCapacityEvent(eventsAttendance) {
  return eventsAttendance.find(
    (event) =>
      event.capacity ==
      Math.max(...eventsAttendance.map((event) => event.capacity))
  );
}

function getEventsStatsBySortedCategory(eventsList) {
  let categories = [...new Set(eventsList.map((event) => event.category))].sort(
    (a, b) => (a > b ? 1 : -1)
  );

  let eventsStatsBySortedCategory = [];

  categories.forEach((category) => {
    let events = eventsList.filter((event) => event.category === category);
    let revenue = events.reduce(
      (accumulator, event) =>
        accumulator +
        Number(event.estimate || event.assistance) * Number(event.price),
      0
    );
    let attendancePct =
      (events.reduce(
        (accumulator, event) =>
          accumulator + Number(event.estimate || event.assistance),
        0
      ) /
        events.reduce(
          (accumulator, event) => accumulator + Number(event.capacity),
          0
        )) *
      100;

    eventsStatsBySortedCategory.push({
      category: category,
      revenue: revenue,
      attendancePct: attendancePct.toFixed(2),
    });
  });

  return eventsStatsBySortedCategory;
}

/* Create views ---------------------------------------------------- */

function createTableView(stats) {
  let container = document.getElementById("events-statistics-container");
  container.innerHTML = defineEventsStatisticsTable(stats);
  container.classList.add("show");

  container = document.getElementById(
    "upcoming-events-statistics-by-category-container"
  );
  container.innerHTML = defineEventsStatsByCategory(
    stats.upcomingEventsStatsByCategory
  );
  container.classList.add("show");

  container = document.getElementById(
    "past-events-statistics-by-category-container"
  );
  container.innerHTML = defineEventsStatsByCategory(
    stats.pastEventsStatsByCategory
  );
  container.classList.add("show");
}
