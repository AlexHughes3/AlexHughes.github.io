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

// Add an event listener for the 'change' event on the input devices dropdown.
dropIns.addEventListener("change", function () {
  let selectedInputIndex = parseInt(dropIns.value);
  if (myInput) {
    myInput.removeListener("noteon");
    myInput.removeListener("noteoff");
  }
  myInput = WebMidi.inputs[selectedInputIndex];

  myInput.addListener("noteon", "all", function (e) {
    console.log("Note On:", e.note);
  });
  myInput.addListener("noteoff", "all", function (e) {
    console.log("Note Off:", e.note);
  });
});

// Add an event listener for the 'change' event on the output devices dropdown.
dropOuts.addEventListener("change", function () {
  myOutput = WebMidi.outputs[dropOuts.value];
});

//grabs sliders 
const stutterAmountSlider = document.getElementById("stutterAmountSlider")
const stutterDurSlider = document.getElementById("stutterDurSlider")
const velocityDecSlider = document.getElementById("velocityDecSlider")

// set initial values for sliders
stutterAmountSlider.numStutters.value = 3
stutterDurSlider.durStutter.value = 100
velocityDecSlider.velocityDec.value = 20

// Call the function for each slider
updateParameter("stutterAmountSlider", "amountDisplay", "numStutters");
updateParameter("stutterDurSlider", "durDisplay", "durStutter");
updateParameter("velocityDecSlider", "velDisplay", "velocityDec");

// Updates the parameters based on what is selected in the sliders.
function updateParameter(sliderId, displayId, parameterName) {
    let slider = document.getElementById(sliderId);
    let display = document.getElementById(displayId);
  
    slider.addEventListener("input", function () {
        display.innerText = slider.value;
        // Update the global parameter value
        window[parameterName] = parseInt(slider.value);
        console.log(window[parameterName]);
    });
};

//get value of the slider and convert it to a FP number
let stutterAmountSlider = parseFloat (numStutter.value)
let stutterDurSlider = parseFloat (durStutter.value)
let velocityDecSlider = parseFloat (velocityDec.value)


let midiInput = null; // Variable to store MIDI input device

// Initialize Web MIDI
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

// Function called when MIDI connection is successful
function onMIDISuccess(midiAccess) {
    // Get the first available MIDI input device
    midiInput = midiAccess.inputs.values().next().value;

    // Add event listener for MIDI messages
    if (midiInput) {
        midiInput.onmidimessage = onMIDIMessage;
        console.log('MIDI input connected:', midiInput.name);
    } else {
        console.error('No MIDI input devices found.');
    }
}

// Function called when MIDI connection fails
function onMIDIFailure() {
    console.error('Could not access MIDI devices.');
}

// Making the midi input actually stutter 
function onMIDIMessage(event) {
    // Check if the MIDI message is a note on message
    if (event.data[0] === 144) { // Note on message (144) on channel 1
        // Extract note number and velocity from the MIDI message
        const note = event.data[1];
        let velocity = event.data[2];

        // Stutter the note by triggering it multiple times with decreasing velocity
        for (let i = 0; i < numStutters; i++) {
            // Calculate the stuttered velocity
            const stutteredVelocity = Math.max(velocity - i * velocityDecrease, 0);

            // Send a new MIDI note on message with the stuttered velocity
            setTimeout(() => {
                sendMIDIMessage(144, note, stutteredVelocity);
            }, i * stutterDuration); // Delay each stutter
        }
    }
}