// handles vanilla JS + API 

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

const testNotepad = new Notebook()

ready(() => { 
  /* Do things after DOM has fully loaded */ 
  document.querySelector("#add-note").addEventListener("click", (e) => { /* ... */ 
    // let note = document.querySelector(".add-note").text();
    e.preventDefault()
    let note = document.getElementById("note-submit").value;
    let testNote = new Note(note)
    testNotepad.addNote(testNote)
    console.log(testNotepad)

    updateHTMLList()

  });

});

function updateHTMLList() {
  // clear html list
  document.getElementById('view-notes').innerHTML = ''

  //add the notes to the html list
  testNotepad.viewNotes().forEach(function(note) {
    let listItem = note.displayNote()
    document.getElementById('view-notes').innerHTML += `<li><a href="/">${listItem}...</a></li>`
})
}