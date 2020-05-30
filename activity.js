class Activity {
  constructor(category, description, minutes, seconds,completed, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = id || Date.now();
  }
  countdown() {

  }
  markComplete() {

  }
  saveToStorage() {

  }
}
