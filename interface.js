// handles vanilla JS + API 

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

const testNotepad = new Notebook()

ready(() => { 
  /* Do things after DOM has fully loaded */

  readStoredNotes()
  updateHTMLList()

  document.querySelector("#add-note").addEventListener("click", (e) => { /* ... */ 
    // let note = document.querySelector(".add-note").text();
    e.preventDefault()
    let note = document.getElementById("note-submit").value;
    let testNote = new Note(note)
    testNotepad.addNote(testNote)
    console.log(testNotepad)

    updateHTMLList()
    storeNotes()

  });

});

function updateHTMLList() {
  // clear html list
  document.getElementById('view-notes').innerHTML = ''

  //add the notes to the html list
  testNotepad.viewNotes().forEach(function(note, index) {
    let listItem = note.displayNote()
    document.getElementById('view-notes').innerHTML += `<li><a href="/notes/${index}">${listItem}</a></li>`
})
}

function storeNotes() {
  let noteList = []
  // loop through the notes in the notepad and add them to the blank array
  testNotepad.viewNotes().forEach(function(note) {
    noteList.push(note.displayNote())
  })
  // store the array in local storage as a string
  localStorage.setItem("noteList", JSON.stringify(noteList));
}

function readStoredNotes() {
  // retrieve the string array of notes from local storage and turn into an array
  let notes = JSON.parse(localStorage.getItem("noteList"))

  // add each note to the notepad
  notes.forEach(function(note) {
    testNotepad.addNote(new Note(note))
  })
}

// $(document).ready(function() {
//   let thermostat = new Thermostat();
//   updateTemperature();


