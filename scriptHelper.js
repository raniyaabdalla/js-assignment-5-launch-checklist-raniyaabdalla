// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  const addDest = document.getElementById("missionTarget");
  addDest.innerHTML = `
     <h2>Mission Destination</h2>
     <ol>
       <li>Name: ${name} </li>
       <li>Diameter:${diameter} </li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance} </li>
       <li>Number of Moons:${moons} </li>
     </ol>
     <img src="${imageUrl}">
     `;
}

function validateInput(testInput) {
  if (testInput === "") {
    
    return "Empty";
  } else if (isNaN(Number(testInput))) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

//function validateForm() {}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  const form = document.getElementById("launchForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const faultyItems = document.getElementById("faultyItems");
    const launchStatus = document.getElementById("launchStatus");


    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    console.log(pilot.value);

    if (
      validateInput(pilot.value) === "Empty" ||
      validateInput(copilot.value) === "Empty" ||
      validateInput(fuelLevel.value) === "Empty" ||
      validateInput(cargoLevel.value) === "Empty"
    ) {
      alert("All fields are required");
      // stop the form submission
      event.preventDefault();
    } else if (
      validateInput(pilot.value) === "Is a Number" ||
      validateInput(copilot.value) === "Is a Number" ||
      validateInput(fuelLevel.value) === "Not a Number" ||
      validateInput(cargoLevel.value) === "Not a Number"
    ) {
      alert("Invalid input!");
    } else {
      if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) {
        //fuelStatus.innerHTML = `fuel level too low for launch`;
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = "green";
        pilotStatus.innerHTML = `${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `${copilot.value} is ready for launch`;
      }
      if (fuelLevel.value >= 10000 && cargoLevel.value > 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        pilotStatus.innerHTML = `${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `${copilot.value} is ready for launch`;
        cargoStatus.innerHTML = `there is too much mass for the shuttle to take off.`;
      }
      if (fuelLevel.value < 10000 && cargoLevel.value <= 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        pilotStatus.innerHTML = `${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `${copilot.value} is ready for launch`;
        fuelStatus.innerHTML = `fuel level too low for launch`;
      }
      if (fuelLevel.value < 10000 && cargoLevel.value > 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        pilotStatus.innerHTML = `${pilot.value} is ready for launch`;
        copilotStatus.innerHTML = `${copilot.value} is ready for launch`;
        fuelStatus.innerHTML = `fuel level too low for launch`;
        cargoStatus.innerHTML = `there is too much mass for the shuttle to take off.`;
      }
    }
  });
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  let num = Math.floor(Math.random() * planets.length);
  return planets[num];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;