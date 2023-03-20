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

      fetchApi(urlApi)
        .then((data) => {
          pastEvents = data.events;

          calculateStats(upcomingEvents, pastEvents);
      })
    })
    .catch((error) => console.log(error));
});

/* Functions -------------------------------- */

function calculateStats(upcomingEvents, pastEvents) {

  let stats = {}

  stats["highestAttendanceEvent"] = getHighestAttendanceEvent(pastEvents);
  stats["lowestAttendanceEvent"] = getLowestAttendanceEvent(pastEvents);
  stats["largerCapacityEvent"] = getLargerCapacityEvent(pastEvents);

  stats["upcomingEventsStatsByCategory"] = getEventsStatsByCategory(upcomingEvents);
  stats["pastEventsStatsByCategory"] = getEventsStatsByCategory(pastEvents);
  
  createTableView(stats)
}

function getHighestAttendanceEvent(eventsAttendance) {
  return eventsAttendance.find(event => event.assistance == Math.max(...eventsAttendance.map((event) => event.assistance)))
}

function getLowestAttendanceEvent(eventsAttendance) {
  return eventsAttendance.find((event) => event.assistance == Math.min(...eventsAttendance.map((event) => event.assistance)))
}

function getLargerCapacityEvent(eventsAttendance) {
  return eventsAttendance.find((event) => event.capacity == Math.max(...eventsAttendance.map((event) => event.capacity)))
}

function getEventsStatsByCategory(eventsList) {
  let eventsStatsByCategory = [];
  let sortedEventsStatsByCategory = [];

  eventsList.forEach((event) => {
    (eventsStatsByCategory[event.category] =
      eventsStatsByCategory[event.category] || []).push({
      ["assistance"]: event.estimate || event.assistance,
      ["price"]: event.price,
      ["capacity"]: event.capacity,
    });
  });

  for (let category in eventsStatsByCategory) {
    sortedEventsStatsByCategory.push({
      category: category,
      data: eventsStatsByCategory[category],
    });
  }

  sortedEventsStatsByCategory.sort((a, b) =>
    a.category > b.category ? 1 : -1
  );

  return sortedEventsStatsByCategory;
}


/* Create views ---------------------------------------------------- */

function createTableView(stats) {
  let container = document.getElementById("events-statistics-container");
  container.innerHTML = defineEventsStatisticsTable(stats);
  container.classList.add("show");

  container = document.getElementById("upcoming-events-statistics-by-category-container");
  container.innerHTML = defineEventsStatsByCategory(stats.upcomingEventsStatsByCategory);
  container.classList.add("show");

  container = document.getElementById("past-events-statistics-by-category-container");
  container.innerHTML = defineEventsStatsByCategory(stats.pastEventsStatsByCategory);
  container.classList.add("show");
}