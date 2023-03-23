const { createApp } = Vue

const app = createApp({
	data() {
		return {
			name: "All the Events",
			eventsCardsContainer: undefined,
			eventsList: [],
			currentEventsList: [],
			categoriesForEventsList: [],
			filterChecks: [],
			searchText: ""
		}
	},
	created() {
		/* NOT IMPLEMENTED YET
		// Insert Card objects in DOM
		this.eventsCardsContainer = document.getElementById("event-card-container") 
		
		this.insertCardsInDOM(this.eventsCardsContainer);
		*/

		// Get the Events List asynchronously
		let urlApi = this.fetchApiEvents(filterEvents)

		this.fetchApi(urlApi)
			.then((data) => {
				this.eventsList = this.getEventsList(data, filterEvents)
				this.currentEventsList = this.eventsList

				// Get the list of categories
				this.categoriesForEventsList = this.getCategoriesList(this.eventsList)

				// Activate events parent display area and hide the preloader
				document.getElementById("interfase-container").classList.remove("d-none")
				document.getElementById("loading-container").classList.add("d-none")

				// Functions
				function showNoEvents() {
					eventsCardsContainer.innerHTML += defineNoEventCard();
				}
			})
			.catch((error) => console.log(error));



	},

	methods: {
		/* NOT IMPLEMENTED YET
		insertCardsInDOM(eventsCardsContainer) {
			eventsCardsContainer.innerHTML += this.getCard();
			eventsCardsContainer.innerHTML += defineNoEventCard();
		},

		getCard() {
			return defineCardSummary();
		},
		*/

		/* Async Methods */
		fetchApiEvents(time = null) {

			let urlApi = "https://mh.up.railway.app/api/amazing-events";

			if (time == "upcoming") {
				urlApi += "?time=upcoming"
			} else if (time == "past") {
				urlApi += "?time=past"
			}
			return urlApi
		},

		fetchApiEventDetails(eventId) {
			let urlApi = "https://mh-h0bh.onrender.com/api/amazing-events/" + eventId

			return urlApi
		},

		async fetchApi(urlApi) {

			try {
				let fetchResponse = await fetch(urlApi); // await only waits por data. The rest of code continues even without data received
				let data = await fetchResponse.json(); // Decode raw data to JSON // DO NOT TRANSFORM

				/*
				Example of key rename 
				data["events"] = data["response"];
				delete data["response"];
				 */

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		/* end Async Methods */

		/* Card Management Methods */
		getEventsList(data, timeEvents = null) {
			// 'upcoming' , 'past'
			let eventsList = []

			for (let eventDetails of data.events.filter((event) =>
				timeEvents == "upcoming"
					? event.date > data.currentDate
					: timeEvents == "past"
						? event.date < data.currentDate
						: event.date == event.date
			)) {
				eventDetails = this.getPremiereInfo(eventDetails)
				eventsList.push(eventDetails);
			}

			this.sortEventsList(eventsList, "desc");

			return eventsList;
		},

		sortEventsList(eventsList, order = "asc") {
			if (order == "asc") {
				eventsList.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
			} else {
				eventsList.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
			}
		},

		getCategoriesList(eventsList) {
			let categoriesList = [...new Set(eventsList.map((event) => event.category))] // Spread Operator -> Transform Set to Array

			/* REPLACES
			eventsList.forEach((event) => {
				if (!categoryEventsList.includes(event.category)) {
					categoryEventsList.push(event.category)
				}
			})
			*/

			this.sortCategoriesList(categoriesList, "asc");

			return categoriesList
		},

		sortCategoriesList(categoriesList, order = "asc") {
			if (order == "asc") {
				categoriesList.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
			} else {
				categoriesList.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
			}
			return categoriesList;
		},
		filterData() {
			this.currentEventsList = this.eventsList.filter(event => {
				return ((this.filterChecks.length === 0 || this.filterChecks.includes(event.category)) && event.name.toLowerCase().includes(this.searchText.toLowerCase()))
			})
		},
		clearFilters() {
			this.filterChecks = []
			this.searchText = ""

			this.filterData()
		},

		/* Format card info */
		getPremiereInfo(eventDetails) {
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
				eventDetails.premiere = "";
				eventDetails.premiereDate =
					"SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US");
			}

			return eventDetails
		}
	},

	computed: {
		executeFilterData() {
			this.filterData()
		}
	}
})

app.mount("#app")