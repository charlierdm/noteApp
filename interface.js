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

  let notePage = "testing";

  let routes = {
    'notes'  : notePage, 
    // 'view' : viewPage, 
    // 'delete' : deletePage, 
    // 'edit' : editPage
  }



  window.addEventListener('hashchange', (e) => {
    let contentDiv = document.getElementById('right-side');
    contentDiv.innerHTML = routes[window.location.hash.split('#')[1]];
  })




});

function updateHTMLList() {
  // clear html list
  document.getElementById('view-notes').innerHTML = ''

  //add the notes to the html list
  testNotepad.viewNotes().forEach(function(note, index) {
    let listItem = note.displayNote()
    document.getElementById('view-notes').innerHTML += `<li><a href="#notes">${listItem}...</a></li>`
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
  if (notes == null) {
    notes = []
    // create empty array if no local storage
  }

  // add each note to the notepad
  notes.forEach(function(note) {
    testNotepad.addNote(new Note(note))
  })
}


