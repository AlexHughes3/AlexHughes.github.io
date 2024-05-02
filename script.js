await WebMidi.enable();
 
// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0];

// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("dropdown-ins");
let dropOuts = document.getElementById("dropdown-outs");

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


// Add an event listener for the 'change' event on the input devices dropdown.
// This allows the script to react when the user selects a different MIDI input device.
dropIns.addEventListener("change", function () {
  // Before changing the input device, remove any existing event listeners
  // to prevent them from being called after the device has been changed.
  if (myInput.hasListener("noteon")) {
    myInput.removeListener("noteon");
  };
  if (myInput.hasListener("noteoff")) {
    myInput.removeListener("noteoff");
};

//Change the input device based on the user's selection in the dropdown.
myInput = WebMidi.inputs[dropIns.value];

// After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
// These listeners will handle MIDI note on (key press) and note off (key release) messages.
myInput.addListener("noteon", function (someMidi) {
  // When a note on event is received, send a note on message to the output device.
  let processedMidi = fxOne(someMidi.note);
  processedMidi = fxTwo(processedMidi);
  processedMidi = fxThree(processedMidi);
  processedMidi = fxFour(processedMidi);
  myOutput.playNote(processedMidi);
});

// Similarly, when a note off event is received, send a note off message to the output device.
// This signals the end of a note being played.
myInput.addListener("noteoff", function (someMIDI) {
   myOutput.stopNote(someMIDI.note);
})});

//define MIDI processing function
const midiProcess = function (midiNoteInput) {
  let pitch = midiNoteInput.note.number;
  let velocity = midiNoteInput.note.rawAttack;
  let myNotes = [];
  currentNote.forEach(function (interval) {
    console.log(pitch);
    console.log(transAmount);
    console.log(interval);
    console.log(duration);
    let midiNote = new Note(pitch + parseInt(transposition) + interval, {
      rawAttack: velocity,
    });
    myNotes.push(midiNote);
  });
  return myNotes;
};
  
// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function () {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutput = WebMidi.outputs[dropOuts.value].channels[0];
});




/* MIDI IO */

// Enable WebMidi API and handle any errors if it fails to enable.
// This is necessary to work with MIDI devices in the web browser.
await WebMidi.enable();

// Initialize variables to store the first MIDI input and output devices detected.
// These devices can be used to send or receive MIDI messages.
let myInput = WebMidi.inputs[0];
let myOutput = WebMidi.outputs[0];

// Get the dropdown elements from the HTML document by their IDs.
// These dropdowns will be used to display the MIDI input and output devices available.
let dropIns = document.getElementById("Dropdown Inputs");
let dropOuts = document.getElementById("Dropdown Outputs");

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

//MIDI FX

//Sustain Effect 
myInput.addListener("noteon", function (e) {
  let myNote = new Note(e.note.duration + (susDur));
  myOutput.channels[1].playNote(myNote, {
});
});

//Transposition Effect 
myInput.addListener("noteon", function (e) {
  let myNote = new Note(e.note.number + (transAmount));
  myOutput.channels[1].playNote(myNote, {
});
});

//Random Velocity: 
function generateRandomNumber(velMin, velMax) {
  return Math.floor(Math.random() * ((velMax.value) - (velMin.value) + 1)) + velMin;
};
  // Change the parameters as needed
  randomVelNumber = generateRandomNumber((velMin.value), (velMax.value)); // Randomly generate Velocity Number
  console.log(randomVelNumber);
  let randomVelNumber = e.note.rawAttack
  myInput.addListener("noteon", function (e) {
    let myNote = new Note
    myOutput.channels[1].playNote(myNote, {
    });
});

//Echo Effect 
myInput.addListener("noteon", function (e) {
  let myNote = new Note(e.note.number, { duration: (echoDur.value)});
  //Amount of Echos, Duration of Echoed Notes
  for (let repeatNum = 0; repeatNum < echoAmount; repeatNum++) {
   myOutput.channels[1].playNote(myNote, {
     time: WebMidi.time + echoDur * repeatNum,
  });
}});

//Updates Sliders 

// Call All Sliders
let susDurSlider = document.getElementById("susDurSlider");
let velMinSlider = document.getElementById("velMinSlider");
let velMaxSlider = document.getElementById("velMaxSlider");
let transSlider = document.getElementById("transSlider");
let echoAmtSlider = document.getElementById("echoAmtSlider");
let echoDurSlider = document.getElementById("echoDurSlider");

//Initialize Slider Values 
susDurSlider.value = 500;
velMinSlider.value = 50;
velMaxSlider.value = 90;
transSlider.value = 0;
echoAmtSlider.value = 0;
echoDurSlider.value = 500;

//Initializes Variables
let susDur = 500
let velMin = 50
let velMax = 90
let transAmount = 0
let echoAmount = 0 
let echoDur = 500

//Sustain Slider Change Event 
susDurSlider.addEventListener("change", function () {
  let susDurDisplay = document.getElementById("susDurDisplay")
  susDurDisplay.innerText = susDurSlider.value; 
  console.log(susDurSlider.value);
  susDur = susDurSlider.value;
});

//Min Velocity Slider Change Event
  velMinSlider.addEventListener("change",function () {
  let velMinDisplay = document.getElementById("velMinDisplay")
  velMinDisplay.innerText = velMinSlider.value;
  console.log(velMinSlider.value);
  velMin = velMinSlider.value;
});

//Max Velocity Slider Change Event 
velMaxSlider.addEventListener("change",function () {
  let velMaxSlider = document.getElementById("velMaxDisplay")
  velMaxSlider.innerText = velMaxSlider.value;
  console.log(velMaxSlider.value);
  velMax = velMaxSlider.value;
});

//Trans Slider Change Event 
transSlider.addEventListener("change", function () {
  let transDisplay = document.getElementById("transDisplay"); 
  transDisplay.innerText = transSlider.value
  console.log(transSlider.vale)
  transAmount = transSlider.value
});

// Echo Repeats Slider Change Event 
echoAmtSlider.addEventListener("change", function (){
  let echoAmtSlider = document.getElementById("echoAmtDisplay");
  echoAmtDisplay.innerText = echoAmtSlider.value
  console.log(echoAmtSlider.value);
  echoAmount = echoAmtSlider.value;
});

// Echo Dur Slider Change Event 
echoDurSlider.addEventListener("change", function (){
  let echoDurDisplay = document.getElementById("echoDurDisplay");
  console.log(echoDurDisplay.value)
  echoDur = echoDurSlider.value 
});

/*MIDI Updating Process*/ //the midi is already there when the button is pressed. this code does not create it. it just cahnges it

//define MIDI processing function
const midiProcess = function (midiNoteInput) {
  let pitch = midiNoteInput.note.number;
  let velocity = midiNoteInput.note.rawAttack;
  let transposition = midiNoteInput.note.interval
  let duration = midiNoteInput.note.duration; 
  let myNotes = [];
  currentNote.forEach(function (interval) {
    console.log(pitch);
    console.log(transposition);
    console.log(duration);
    console.log(velocity)
    let midiNote = new Note(pitch + parseInt(transAmount) + interval, {
    });
    myNotes.push(midiNote);
  });
  return myNotes;
};

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
console.log(myInput);

/*Sending MIDI*/

// After changing the input device, add new listeners for 'noteon' and 'noteoff' events.
// These listeners will handle MIDI note on (key press) and note off (key release) messages.
myInput.addListener("noteon", function (someMIDI) {
  console.log(someMIDI);
  // When a note on event is received, send a note on message to the output device.
  // This can trigger a sound or action on the MIDI output device.
   myOutput.sendNoteOn(midiProcess(someMIDI));
  });

  myInput.addListener("noteoff", function (someMIDI) {
    console.log(someMIDI);
    // Similarly, when a note off event is received, send a note off message to the output device.
    // This signals the end of a note being played.
    myOutput.sendNoteOff(midiProcess(someMIDI));
  });
});
//end

// Add an event listener for the 'change' event on the output devices dropdown.
// This allows the script to react when the user selects a different MIDI output device.
dropOuts.addEventListener("change", function () {
  // Change the output device based on the user's selection in the dropdown.
  // The '.channels[1]' specifies that the script should use the first channel of the selected output device.
  // MIDI channels are often used to separate messages for different instruments or sounds.
  myOutput = WebMidi.outputs[dropOuts.value].channels[1];
});

// myInput.addListener("noteon", function (someMidi) {
//   // When a note on event is received, send a note on message to the output device.
//   let processedMidi = fxOne(someMidi.note);
//   processedMidi = fxTwo(processedMidi);
//   processedMidi = fxThree(processedMidi);
//   processedMidi = fxFour(processedMidi);
//   myOutput.playNote(processedMidi);
// });