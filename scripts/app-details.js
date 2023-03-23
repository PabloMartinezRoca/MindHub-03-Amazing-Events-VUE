const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      name: "Event Details",
      eventID: "",
      eventDetails: [],
      backgroundContainerImage: "",
    };
  },
  created() {
    // Get the event ID or redirect to index page if null
    this.eventID = this.getEventIdFromURL();

    // Get the Events List asynchronously
    let urlApi = this.fetchApiEventDetails(this.eventID);

    this.fetchApi(urlApi)
      .then((data) => {
        console.log(data);

        this.eventDetails = this.getPremiereInfo(data.response);
								

        /* for (let eventDetails of data.events.filter((event) =>
          timeEvents == "upcoming"
            ? event.date > data.currentDate
            : timeEvents == "past"
            ? event.date < data.currentDate
            : event.date == event.date
        )) {
          eventDetails = this.getPremiereInfo(eventDetails);
          eventsList.push(eventDetails);
        } */

        
        // Insert background image for card details
        this.insertBackgroundContainer(this.eventDetails.image);

        // Configure Back button
        document.getElementById("go-back").addEventListener("click", () => {
          history.back();
        });
      })
      .catch((error) => console.log(error));
  },

  methods: {
    /* Async Methods */
    fetchApiEventDetails(eventID) {
      let urlApi = "https://mh-h0bh.onrender.com/api/amazing-events/" + eventID;

      return urlApi;
    },

    async fetchApi(urlApi) {
      try {
        let fetchResponse = await fetch(urlApi); // await only waits por data. The rest of code continues even without data received
        let data = await fetchResponse.json(); // Decode raw data to JSON // DO NOT TRANSFORM

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    /* end Async Methods */

    getEventIdFromURL() {
      const params = new URLSearchParams(window.location.search);

      if (params.get("id") === null) {
        window.location.href = "index.html";
      } else {
        return params.get("id");
      }
    },

    insertBackgroundContainer(image) {
      this.backgroundContainerImage = image;
    },

    /* Format card info */
    getPremiereInfo(eventDetails) {
      // Set Premiere Events

      let currentDate = new Date();
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
        eventDetails.premiere = "";
        eventDetails.premiereDate =
          "SINCE " + new Date(eventDetails.date).toLocaleDateString("en-US");
      }

      return eventDetails;
    },
  },
});

app.mount("#app");
