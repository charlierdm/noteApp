// handles vanilla JS + API 

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */ 
  let testNotepad = new Notebook()
  document.querySelector("#add-note").addEventListener("click", (e) => { /* ... */ 
    // let note = document.querySelector(".add-note").text();
    e.preventDefault()
    let note = document.getElementById("note-submit").value;
    let testNote = new Note(note)
    testNotepad.addNote(testNote)
    console.log(testNotepad)
  });



});

// $(document).ready(function() {
//   let thermostat = new Thermostat();
//   updateTemperature();


