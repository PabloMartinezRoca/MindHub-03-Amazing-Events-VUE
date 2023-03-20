function defineNoEventCard() {
  // Template for no event card
  return `
		<!-- Card -->
		<div class="event-card no-event-card card shadow">
				
			<div class="card-header text-center">No Events Found!</div>

			<div class="card-image-container">
				<img class="object-fit-cover" src="./images/no-events-on-schedule.jpg" alt="No events found!">
			</div>

			<h5 class="event-title bg-white bg-opacity-90 mb-0 text-center">&nbsp;</h5>

			<h6 class="event-category small mb-2"><span class="strong category-event">Try to filter different!</span></h6>

			<div class="card-body d-flex flex-column justify-content-between">					
				<p class="event-description mb-4">The filter options you've chosen didn't match any event.</p>
				
				<div>
					<div class="d-flex justify-content-between align-items-center">

					</div>
				</div>
			</div>
			
			<div class="card-footer">
				
			</div>
		</div>
		<!-- end card -->
		`
}