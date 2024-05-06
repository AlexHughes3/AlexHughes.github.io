
//problems: Check FX, why arent FX dropdowns working. why arent FX sliders changing 

// Enable WebMidi API and handle any errors if it fails to enable.
// This is necessary to work with MIDI devices in the web browser.
await WebMidi.enable();

// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0];

// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");

const generateRandomNumber = function (min, max) {
  let randomValue = Math.random () * (max - min) + min
  randomValue = Math.floor (randomValue)
  return randomValue
};


// Create Sustain FX 
const sustain = function (midiIn) {
  let midiNote = new Note(midiIn.number, {duration: susDur})
  console.log(midiNote)
  return midiNote
};

//Create Velocity FX
const velocity = function (midiIn) {
  let midiNote = new Note(midiIn.velocity, {velocity: randomVelNumber})
  console.log(midiNote)
  return midiIn
};

//Create Transposition FX
const transposition = function (midiIn) {
  let midiNote = new Note(midiIn.transposition, {transposition: transAmount})
  console.log(midiNote)
  return midiIn
};

//Create Echo FX
const echo = function (midiIn) {
  let midiNote = new Note(midiIn.echoAmount, {echoDuration: echoDur})
  for (let repeatNum = (echoAmount); repeatNum < echoAmount; repeatNum++) {
  console.log(midiNote)
  return midiIn
}};

// Allows the selection of FX 1 
const fxOne = function (midiIn) {
  let fxChoice = document.getElementById("fxDrop1").value
  if (fxChoice == "Sustain") {
    return sustain(midiIn)
  } else if (fxChoice == "Velocity"){
    return velocity(midiIn)
  } else if (fxChoice == "Transposition"){
    return transposition(midiIn)
  } else if (fxChoice == "Echo"){
    return echo(midiIn)
  }
}

// Allows the selection of FX 2
const fxTwo = function (midiIn) {
  let fxChoice = document.getElementById("fxDrop2").value
  if (fxChoice == "Sustain") {
    return sustain(midiIn)
  } else if (fxChoice == "Velocity"){
    return velocity(midiIn)
  } else if (fxChoice == "Transposition"){
    return transposition(midiIn)
  } else if (fxChoice == "Echo"){
    return echo(midiIn)
  }
}

// Allows the selection of FX 3
const fxThree = function (midiIn) {
  let fxChoice = document.getElementById("fxDrop3").value
  if (fxChoice == "Sustain") {
    return sustain(midiIn)
  } else if (fxChoice == "Velocity"){
    return velocity(midiIn)
  } else if (fxChoice == "Ttransposition"){
    return transposition(midiIn)
  } else if (fxChoice == "Echo"){
    return echo(midiIn)
  }
}

// Allows the selection of FX 4
const fxFour = function (midiIn) {
  let fxChoice = document.getElementById("fxDrop4").value
  if (fxChoice == "Sustain") {
    return sustain(midiIn)
  } else if (fxChoice == "Velocity"){
    return velocity(midiIn)
  } else if (fxChoice == "Transposition"){
    return transposition(midiIn)
  } else if (fxChoice == "Echo"){
    return echo(midiIn)
  }
}

// For each MIDI input device detected, add an option to the input devices dropdown.
// This loop iterates over all detected input devices, adding them to the dropdown.
WebMidi.inputs.forEach(function (input, num) {
  dropIns.innerHTML += `<option value=${num}>${input.name}</option>`;
});

// Similarly, for each MIDI output device detected, add an option to the output devices dropdown.
// This loop iterates over all detected output devices, adding them to the dropdown.
WebMidi.outputs.forEach(function (output, num) {
  dropOuts.innerHTML += `<option value=${num}>${output.name}</option>`;
});


let randomVelNumber = 75

// Call All Sliders
let susDurSlider = document.getElementById("susDur");
let velMinSlider = document.getElementById("velMin");
let velMaxSlider = document.getElementById("velMax");
let transSlider = document.getElementById("transAmount");
let echoAmtSlider = document.getElementById("echoAmount");
let echoDurSlider = document.getElementById("echoDur");

// Initialize Slider Values
susDurSlider.value = 500;
velMinSlider.value = 50;
velMaxSlider.value = 90;
transSlider.value = 0;
echoAmtSlider.value = 0;
echoDurSlider.value = 500;

// Initializes Variables
let susDur = 500;
let velMin = 50;
let velMax = 90;
let transAmount = 0;
let echoAmount = 0;
let echoDur = 500;

//Library of FX (Populates Dropdowns)
const allFx = {
  Sustain: susDur,
  Velocity: randomVelNumber,
  Transposition: transAmount,
  Echo: echoAmount,
};

//Get FX DropDowns
let fxDrop1 = document.getElementById("fxDrop1");
let fxDrop2 = document.getElementById("fxDrop2");
let fxDrop3 = document.getElementById("fxDrop3");
let fxDrop4 = document.getElementById("fxDrop4");

console.log(Object.keys(allFx))

//populates FX Options? 
let fxOptions = Object.keys(allFx); //function of an object that allows you to reference all of its properties. will automatically update as you add more properties
fxOptions.forEach(function (item) {
  fxDrop1.innerHTML += `<option value = ${item}>${item}</option>`;
  fxDrop2.innerHTML += `<option value = ${item}>${item}</option>`;
  fxDrop3.innerHTML += `<option value = ${item}>${item}</option>`;
  fxDrop4.innerHTML += `<option value = ${item}>${item}</option>`;
});

// Sustain Slider Change Event
susDurSlider.addEventListener("change", function () {
  let susDurDisplay = document.getElementById("susDurDisplay");
  susDurDisplay.innerText = susDurSlider.value;
  susDur = parseInt(susDurSlider.value);
  console.log(susDur)
});

// Min Velocity Slider Change Event
velMinSlider.addEventListener("change", function () {
  let velMinDisplay = document.getElementById("velMinDisplay");
  velMinDisplay.innerText = velMinSlider.value;
  velMin = parseInt(velMinSlider.value);
  console.log(velMin)
});

// Max Velocity Slider Change Event
velMaxSlider.addEventListener("change", function () {
  let velMaxDisplay = document.getElementById("velMaxDisplay");
  velMaxDisplay.innerText = velMaxSlider.value;
  velMax = parseInt(velMaxSlider.value);
  console.log(velMax)
});

// Trans Slider Change Event
transSlider.addEventListener("change", function () {
  let transDisplay = document.getElementById("transDisplay");
  transDisplay.innerText = transSlider.value;
  transAmount = parseInt(transSlider.value);
  console.log(transAmount)
});

// Echo Repeats Slider Change Event
echoAmtSlider.addEventListener("change", function () {
  let echoAmtDisplay = document.getElementById("echoAmtDisplay");
  echoAmtDisplay.innerText = echoAmtSlider.value;
  echoAmount = parseInt(echoAmtSlider.value);
  console.log(echoAmount)
});

// Echo Dur Slider Change Event
echoDurSlider.addEventListener("change", function () {
  let echoDurDisplay = document.getElementById("echoDurDisplay");
  echoDurDisplay.innerText = echoDurSlider.value;
  echoDur = parseInt(echoDurSlider.value);
  console.log(echoDur)
});

// Add an event listener for the 'change' event on the input devices dropdown.
// This allows the script to react when the user selects a different MIDI input device.
dropIns.addEventListener("change", function () {
  // Before changing the input device, remove any existing event listeners
  // to prevent them from being called after the device has been changed.
  if (myInput.hasListener("noteon")) {
    myInput.removeListener("noteon");
  }
  if (myInput.hasListener("noteoff")) {
    myInput.removeListener("noteoff");
  }

  // Change the input device based on the user's selection in the dropdown.
  myInput = WebMidi.inputs[dropIns.value];

  // After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
  // These listeners will handle MIDI note on (key press) and note off (key release) messages.
  myInput.addListener("noteon", function (someMidi) {
    // When a note on event is received, send a note on message to the output device.
    // This can trigger a sound or action on the MIDI output device.
    let processedMidi = fxOne(someMidi.note);
      processedMidi = fxTwo(processedMidi);
      processedMidi = fxThree(processedMidi);
      processedMidi = fxFour(processedMidi);
      myOutput.playNote(processedMidi);
  });

  myInput.addListener("noteoff", function (someMIDI) {
    // Similarly, when a note off event is received, send a note off message to the output device.
    // This signals the end of a note being played.
    //myOutput.sendNoteOff(someMIDI.note);
  });
});

// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function () {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutput = WebMidi.outputs[dropOuts.value].channels[1];
});
