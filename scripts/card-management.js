let data = [];

function getEventsList(data, timeEvents = null) {
  // 'upcoming' , 'past'
  let eventsList = [];

  for (let eventDetails of data.events.filter((event) =>
    timeEvents == "upcoming"
      ? event.date > data.currentDate
      : timeEvents == "past"
      ? event.date < data.currentDate
      : event.date == event.date
  )) {
    eventsList.push(eventDetails);
  }

  sortEventsList(eventsList, "desc");

  return eventsList;
}

function sortEventsList(eventsList, order = "asc") {
  if (order == "asc") {
    eventsList.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  } else {
    eventsList.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }
}

function getCategoriesList(eventsList) {
  let categoryEventsList = [];

  eventsList.forEach((event) => {
    if (!categoryEventsList.includes(event.category)) {
      categoryEventsList.push(event.category);
    }
  });

  sortCategoriesList(categoryEventsList, "asc");

  return categoryEventsList;
}

function sortCategoriesList(categoryEventsList, order = "asc") {
  if (order == "asc") {
    categoryEventsList.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  } else {
    categoryEventsList.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  }
  return categoryEventsList;
}

function insertCardsInDOM(eventsCardsContainer, eventsList) {
  for (let eventDetails of eventsList) {
    eventsCardsContainer.innerHTML += getCard(eventDetails);
  }
  eventsCardsContainer.innerHTML += defineNoEventCard();
}

function getCard(eventDetails) {
  // Set Premiere Events
  let currentDate = new Date();
  currentDate = currentDate.toJSON();

  if (eventDetails.date > currentDate) {
    eventDetails.premiere = "¡COMING SOON!";

    let days =
      new Date(eventDetails.date).getTime() - new Date(currentDate).getTime();
    days = days / (1000 * 60 * 60 * 24);

    eventDetails.premiereDate =
      "PREMIERE ON " +
      new Date(eventDetails.date).toLocaleDateString("en-US") +
      " • " +
      parseInt(days) +
      (parseInt(days) > 1 ? " DAYS" : " DAY") +
      " LEFT";
  } else {
    eventDetails.premiere = "&nbsp;";
    eventDetails.premiereDate =
      "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US");
  }

  return defineCardSummary(eventDetails);
}

function insertCategoriesFilterBar(filterBarContainer, categoryEventsList) {
  for (let category of categoryEventsList) {
    let filterBarTemplate = `
		<label class="filter-bar-item">
			<input name="categoryFilter" class="category-filter form-check-input flex-shrink-0 me-2" type="checkbox" value="${category}">
			<span>${category}</span>
		</label>
		`;

    filterBarContainer.innerHTML += filterBarTemplate;
  }
}

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  
  // Get the Events List asynchronously
  let urlApi = fetchApiEvents(filterEvents)

  fetchApi(urlApi)
    .then((data) => {
      const eventsList = getEventsList(data, filterEvents);

      // Insert Card objects in DOM
      const eventsCardsContainer = document.getElementById(
        "event-card-container"
      );
      insertCardsInDOM(eventsCardsContainer, eventsList);

      // Create the Categories Filter and Search Bar Engine ----------------------------------------------------------------

      // Configure the Categories Filter
      let activeFilters = [];
      let filterBarContainer = document.getElementById("filter-bar-container");

      filterBarContainer.addEventListener("click", (e) => {
        activeFilters = Array.prototype.slice
          .call(filterBarContainer.querySelectorAll(".category-filter:checked"))
          .map((filter) => filter.value);

        applyfilters();
      });

      // Insert the Categories Filter
      let categoryEventsList = getCategoriesList(eventsList);
      insertCategoriesFilterBar(filterBarContainer, categoryEventsList);

      // Configure Search Bar
      let searchBarInput = document.getElementById("search-bar-input");

      searchBarInput.addEventListener("input", (e) => {
        applyfilters();
      });

      // configure the Clear Filters button
      let clearFiltersButton = document.querySelector(".clear-filters-button");
      clearFiltersButton.addEventListener("click", (e) => clearFilters());

      // Functions

      function applyfilters() {
        let eventsFound = false;
        eventsCardsContainer
          .querySelectorAll(".event-card")
          .forEach((eventCard) => {
            if (
              (activeFilters.includes(
                eventCard.querySelector(".category-event").textContent
              ) ||
                activeFilters.length === 0) &&
              eventCard
                .querySelector(".event-title")
                .textContent.toString()
                .toLowerCase()
                .includes(searchBarInput.value.toString().toLowerCase())
            ) {
              eventCard.style.display = "flex";
              eventsFound = true;
            } else {
              eventCard.style.display = "none";
            }
          });
        if (!eventsFound) {
          document.querySelector(".no-event-card").style.display = "flex";
        } else {
          document.querySelector(".no-event-card").style.display = "none";
        }
      }

      function showNoEvents() {
        eventsCardsContainer.innerHTML += defineNoEventCard();
      }

      function clearFilters() {
        searchBarInput.value = "";
        activeFilters = [];

        Array.prototype.slice
          .call(filterBarContainer.querySelectorAll(".category-filter:checked"))
          .map((filter) => (filter.checked = false));
        applyfilters();
      }
    })
    .catch((error) => console.log(error));
});
