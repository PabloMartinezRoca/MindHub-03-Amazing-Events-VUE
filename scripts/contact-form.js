function handleForm (event) {
	event.preventDefault()

	let form = document.querySelector(".needs-validation")
  
	if (form.checkValidity() === false) {		
		event.stopPropagation();
		form.classList.add("was-validated");
	}
	else
	{
		form.classList.remove("was-validated");

		let data = captureData(form)
		
		document.querySelector("#contactFormSentModalContent").innerHTML = defineContactFormSentAlertWindow(data)

		let alertWindow = new bootstrap.Modal(document.getElementById("contactFormSentModal"))
		alertWindow.show()
	}	
}

function captureData(form) {
  let data = [];

  form.querySelectorAll(".form-control").forEach((field) => {
    data[field.name] = field.value;
    field.value = "";
  });

  return data;
}

// Executs when DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {

	// Configure form elements
  let formButton = document.getElementById("form-button");
  formButton.addEventListener("click", handleForm);
})