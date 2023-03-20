// Configure Main Nav

let navElement = document.getElementsByClassName("page-" + page);
navElement[0].firstChild.classList.add("active");

let index = navElements.indexOf(page);
let indexPre = index == 0 ? navElements.length - 1 : index - 1;
let indexPos = index == navElements.length - 1 ? 0 : index + 1;

document.getElementById("page-switcher-nav-pre").href =
  navElements[indexPre] + ".html";
document.getElementById("page-switcher-nav-pos").href =
  navElements[indexPos] + ".html";

document.getElementById("page-switcher-nav-title").innerHTML = pageNames[index];
