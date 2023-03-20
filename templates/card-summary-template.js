function defineCardSummary(eventDetails) {
  // Template for card summary
  return `
		<!-- Card -->
		<div class="event-card card shadow">
				
			<div class="card-header text-center">${eventDetails.premiere}</div>

			<div class="card-image-container">
				<img class="object-fit-cover" src="${eventDetails.image}" alt="">
			</div>

			<h5 class="event-title bg-white bg-opacity-90 mb-0 text-center">${eventDetails.name}</h5>

			<h6 class="event-category small mb-2"><span class="text-muted">Category : </span><span class="strong category-event">${eventDetails.category}</span></h6>

			<div class="card-body d-flex flex-column justify-content-between">					
				<p class="event-description mb-4">${eventDetails.description}</p>
				
				<div>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<a href="#" onclick="location.href='./details.html?id=${eventDetails.id}'" class="btn btn-sm btn-outline-amazing"><span class="pe-2">View event</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#cc0066"  viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg></a>							
						</div>
					
						<small class="event-price">Price $ ${eventDetails.price}</small>
					</div>
				</div>
			</div>
			
			<div class="card-footer">
				<p class="event-premiere">${eventDetails.premiereDate}</p>
			</div>
		</div>
		<!-- end card -->
		`
}