// handles vanilla JS + API 

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

const testNotepad = new Notebook()

ready(() => { 
  /* Do things after DOM has fully loaded */ 
  document.querySelector("#add-note").addEventListener("click", (e) => { /* ... */ 
    e.preventDefault()
    // new note from form
    let note = document.getElementById("note-submit").value;
    // make note have emoji
    getEmojiData(note).then(response => response.json()).then(
      res => emojiNote = res.emojified_text);

    // note from form into obj
    let testNote = new Note(emojiNote)
    // note added to notebook
    testNotepad.addNote(testNote)
    // notebook printed
    // console.log(testNotepad)

    updateHTMLList()

  });


});

function updateHTMLList() {
  // clear html list
  document.getElementById('view-notes').innerHTML = ''

  //add the notes to the html list
  testNotepad.viewNotes().forEach(function(note) {
    let listItem = note.displayNote()
    document.getElementById('view-notes').innerHTML += `<li><a href="/">${listItem}</a></li>`
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



// $(document).ready(function() {
//   let thermostat = new Thermostat();
//   updateTemperature();
