'use strict';

function expect(a) {
  return {
    toEqual: function(b){

      if(a === b)
        console.log('Pass')
      else
        console.log('Fail')
    }
  }
}

function it(label, callback ) {
  console.log(`Test: ${label}`)
  callback()
}

it('initializes with the users text', function() {
  var note = new Note('test-note');
  expect(note.text).toEqual('test-note');
})

it('creates a note and can view it', function() {
  var note = new Note('test-note');
  var notebook = new Notebook('notebook')
  notebook.addNote(note)
  expect(notebook.viewNotes().length).toEqual(1);
  expect(notebook.viewNotes()[0]).toEqual(note);
})

