'use strict';

class Notebook {
  constructor(){
    this.noteList = []
  }

  addNote(note){
    this.noteList.push(note)
  }  

  viewNotes() {
    return this.noteList
  }

}