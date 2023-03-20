// Template for contact form sent alert
function defineContactFormSentAlertWindow (formData) {
	return `
		<div class="modal-header">
			<h5 class="modal-title" id="contactFormSentModalLabel">The information was sent to us!</h5>
		</div>
		<div class="modal-body d-flex flex-column flex-wrap">
			<div>	
				<p>Name: <span class="fw-bold">${formData.name}</span></p>
				<p>Email: <span class="fw-bold">${formData.email}</span></p>
				<p class="m-0">Message:</p>
				<p class="fw-bold">${formData.message}</p>
				<p class="fw-bold my-2">We'll contact you as soon as possible!</p>
			</div>
			<figure class="d-flex justify-content-center">
				<img src="./images/information-sent.jpg">
			</figure>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		</div>
		`
}