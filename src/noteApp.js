class Note {
  constructor(text) {
    this.text = text
  }

  displayNote() {
    if(this.text.length >= 20) {
     let i = 20;
     let display = this.text.substring(0, i);
     return `${display}...`;
    }
    else {
      return this.text;
    }
  }
}

