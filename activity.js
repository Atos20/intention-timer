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
//uses minutes and seconds
  }
  totalSeconds() {
    return parseInt(this.minutes) * 60 + parseInt(this.seconds)
  }
  display() {
    userIntention.innerText = this.description;
    minutesText.innerText = this.minutes;
    secondsText.innerText = this.seconds;
    if (secondsText.innerText < 10) {
      secondsText.innerText = ('0' + secondsText.innerText);
    }
  }
  markComplete() {
//sets the completed property
  }
  saveToStorage() {
//using every property in the class
  }
}


//if something uses or modifies a class property put it in a class
//if something processes multiple class objects leave it outside of the class
//if it modifies something in the class it should be a class method
//if it does some calculation that requires properties in the class it should be a class method
//if it is something where you compare one object instance to another object instance (assuming they from the same class)
