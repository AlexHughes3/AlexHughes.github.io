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
//end

// Slider Initialization
stutterAmountSlider.value = 3;
stutterDurSlider.value = 100;
velocityDecSlider.value = 20;

// Updates values from sliders:
let stutterAmount = parseFloat(stutterAmountSlider.value);
let stutterDuration = parseFloat(stutterDurSlider.value);
let velocityDec = parseFloat(velocityDecSlider.value);

// Add an event listener for the 'change' event on the input devices dropdown.
dropIns.addEventListener("change", function () {
  let selectedInputIndex = parseInt(dropIns.value);
  if (myInput) {
    myInput.removeListener("noteon");
    myInput.removeListener("noteoff");
  }
  myInput = WebMidi.inputs[selectedInputIndex];

  myInput.addListener("noteon", function (e) {
    let myNote = new Note(e.note.number, { duration: 100 });

    for (let repeatNum = 0; repeatNum < stutterAmount; repeatNum++) {
      myOutput.channels[1].playNote(myNote, {
        time: WebMidi.time + stutterDuration * repeatNum,
      });
    }
  });
});

// Add an event listener for the 'change' event on the output devices dropdown.
dropOuts.addEventListener("change", function () {
  myOutput = WebMidi.outputs[dropOuts.value];
});