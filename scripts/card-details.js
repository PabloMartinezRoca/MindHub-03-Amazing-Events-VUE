let data = []

function getEventIdFromURL() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("id") === null) {
    window.location.href = "index.html";
  } else {
    return params.get("id");
  }
}

/* DEPRECATED 
function getEventDetails(data) {
  if (data.events.find((event) => event.id == eventID)) {
    return data.events.find((event) => event.id == eventID);
  }
  window.location.href = "index.html";
} 
*/

function getCard(eventDetails) {
  // Set Premiere Events

	/* 
	let fecha = ${(new Date(eventDetails.date)).getDate()+1}/${(new Date(eventDetails.date)).getMonth()+1}/${(new Date(eventDetails.date)).getFullYear()}
	console.log(fecha)

   */
	let currentDate = new Date()
	currentDate = currentDate.toJSON();

	if (eventDetails.date > currentDate) {
    eventDetails.premiere = "¡COMING SOON!";

    let days =
      new Date(eventDetails.date).getTime() -
      new Date(currentDate).getTime();
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

  return defineCardDetails(eventDetails);
}

function insertCardDetailsInDOM(containerID, eventDetails) {
  let container = document.getElementById(containerID);
  container.innerHTML = getCard(eventDetails);

  // Configure Back button
  document.getElementById("go-back").addEventListener("click", () => {
    history.back();
  });
}

function insertBackgroundContainer(containerID, eventDetails) {
  let container = document.getElementById(containerID);
  container.src = `${eventDetails.image}`;
}

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
  
	// Get the event ID or redirect to index page if null
  let eventID = getEventIdFromURL();

  // Get the Events List asynchronously
  let urlApi = fetchApiEventDetails(eventID)
	
	fetchApi(urlApi)
    .then((eventDetails) => {
      
			// Get the event details => DEPRECATED // NOW WITH API
      // let eventDetails = getEventDetails(data);

      // Insert Card Details object in DOM
      insertCardDetailsInDOM("event-details-card-container", eventDetails.response);

      // Insert background image for card details
      insertBackgroundContainer("bg-event-details-card", eventDetails.response);
    })
    .catch((error) => console.log(error));
});
