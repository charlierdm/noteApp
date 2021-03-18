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
    e.preventDefault()
    // new note from form
    let note = document.getElementById("note-submit").value;
    // make note have emoji
    getEmojiData(note).then(response => response.json()).then(
      (res) => {
      let emojiNote = res.emojified_text
      // note from form into obj
      let testNote = new Note(emojiNote) // issue found - emojiData doesn't run until
      // first click (due to callback nature). Next step - move the function further
      // down the process e.g. into view notes?

      // note added to notebook
      testNotepad.addNote(testNote)
      // notebook printed to console
      console.log(testNotepad)

      updateHTMLList()
      storeNotes()
      clearTextBox()
      })
  });


});

// functions that diplay individual notes

changeTheURL();

function changeTheURL() {
  window.addEventListener("hashchange", displayCurrentNote);
}

function displayCurrentNote() {
  showNote(getNoteFromURL(window.location));
}

function getNoteFromURL(location) {
  return location.hash.split("#")[1]
}

function showNote(note) {
  let str = getNoteFromURL(location)
  let num = parseInt(str.slice(-1))
  document.getElementById("note").innerHTML = testNotepad.noteList[num].text;
}

//functions for updating HTML and localstorage

function updateHTMLList() {
  // clear html list
  document.getElementById('view-notes').innerHTML = ''

  //add the notes to the html list
  testNotepad.viewNotes().forEach(function(note, index) {
    let listItem = note.displayNote()
    document.getElementById('view-notes').innerHTML += `<li><a href="#note${[index]}">${listItem}</a></li><br>`
})
}

function getEmojiData(data) {
  return fetch('https://makers-emojify.herokuapp.com/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: data })
  })
}

function storeNotes() {
  let noteList = []
  // loop through the notes in the notepad and add them to the blank array
  testNotepad.viewNotes().forEach(function(note) {
    noteList.push(note.text)
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

// clear the textpad after submitting. 
function clearTextBox() {
  let input = document.getElementById("note-submit").value = ""
  return input.value = "";
}



