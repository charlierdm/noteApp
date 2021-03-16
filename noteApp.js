//contains class/classes

class Note {
  constructor(text) {
    this.text = text
  }

  displayNote() {
    let i = 20;
    let display = this.text.substring(0, i)
    return display
  }
}

