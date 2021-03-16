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

