var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var studyIcon = document.querySelector('.study-icon');
var studyIconActive = document.querySelector('.study-icon-active');
var meditateIcon = document.querySelector('.meditate-icon');
var meditateIconActive = document.querySelector('.meditate-icon-active');
var exerciseIcon = document.querySelector('.exercise-icon');
var exerciseIconActive = document.querySelector('.exercise-icon-active');
var intentionInformation = document.querySelector('.intention-answer')
var minutesNumberOnly = document.querySelector('.minutes-input');
var secondsNumberOnly = document.querySelector('.seconds-input');
var startActivityButton = document.querySelector('.start-activity-button')
var timerCard = document.querySelector('.timer-card-article');
var activityCard = document.querySelector('.activity-card-article');
var userTimerCard = document.querySelector('.timer-card');
var userIntention = document.querySelector('.user-intention');
var timerButton = document.querySelector('.timer-button');
var userInput = document.querySelector('.user-input')
var alertEmptyText = document.querySelector('.alert-empty-text');
var alertEmptyMinutes = document.querySelector('.alert-empty-minutes')
var alertEmptySeconds = document.querySelector('.alert-empty-seconds')


studyButton.addEventListener('click', changeColorOfStudyButton);
meditateButton.addEventListener('click', changeColorOfMeditateButton);
exerciseButton.addEventListener('click', changeColorOfExerciseButton);
startActivityButton.addEventListener('click', storeInformation);

var activityInformation = [];
var selectedCategory

function alertEmptyInputField() {
  if (intentionInformation.value === '' || minuteNumberOnly.value === '' || secondsNumberOnly.value === '') {
    alertEmptySeconds.classList.remove('hide');
    alertEmptyMinutes.classList.remove('hide');
    alertEmptyText.classList.remove('hide');
  } else if (intentionInformation.value === '') {
    alertEmptyText.classList.remove('hide');
    alertEmptySeconds.classList.add('hide');
    alertEmptyMinutes.classList.add('hide');
  } else if (minutesNumberOnly.value === '') {
    alertEmptyMinutes.classList.remove('hide');
    alertEmptyText.classList.add('hide');
    alertEmptySeconds.classList.add('hide');
  } else if (secondsNumberOnly.value === '') {
    alertEmptySeconds.classList.remove('hide');
    alertEmptyMinutes.classList.add('hide');
    alertEmptyText.classList.add('hide');
  } else {
    displayTimerCard();
  }
}


//   }
// }

function storeInformation(event) {
  event.preventDefault();
  var activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, undefined, undefined,);
  activityInformation.unshift(activityInstance)
  alertEmptyInputField();
  // displayTimerCard();
}



// function assignCorrectCircleColor() {
// }

// function displayUserInput() {
//   userTimerCard.innerHTML = '';
//   userTimerCard.innerHTML += `<h3 class="user-intention">${activityInformation[0].description}</h3>
//     <p class="timer-text"><span class="minute-text">${activityInformation[0].minutes}</span>:<span class="seconds-text">${activityInformation[0].seconds}</span></p>
//     <button class="timer-button">START</button>
//     <button class="log-activity-button">LOG ACTIVITY</button>
//     `
//     if(activityInformation[0].category === 'study') {
//       timerButton.classList.add('.green-circle');
//     }
// }

function displayUserInput() {
  userInput.innerHTML = '';
  userInput.innerHTML += `<h3 class="user-intention">${activityInformation[0].description}</h3>
  <p class="timer-text"><span class="minute-text">${activityInformation[0].minutes}</span>:<span class="seconds-text">${activityInformation[0].seconds}</span></p>`
}

function displayTimerCard() {
  timerCard.classList.remove('hide');
  activityCard.classList.add('hide');
  displayUserInput();
  // assignCorrectCircleColor();
}

minutesNumberOnly.addEventListener('keypress', function(event) {
  // minuteNumberOnly.value
  console.log(event);
  var key1 = event.keyCode;
  if((key1 < 48 || key1 > 57)) {
    event.preventDefault();
  }
})

secondsNumberOnly.addEventListener('keypress', function(event) {
  var key2 = event.keyCode;
  if((key2 < 48 || key2 > 57)) {
    event.preventDefault();
  }
})


// var intentionInformation = document.querySelector('.intention-answer')
// var minutesNumberOnly = document.querySelector('.minutes-input');
// var secondsNumberOnly = document.querySelector('.seconds-input');

//check the input field to see if it is empty or null
//undefined for number
//empty string for text
//if true for undefined or empty string alert

function changeColorOfStudyButton() {
  studyButton.classList.toggle('green');
  studyButton.classList.toggle('white');
  studyIcon.classList.toggle('hide')
  studyIconActive.classList.toggle('hide')
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
  timerButton.classList.add('green-circle');
}

function changeColorOfMeditateButton() {
  meditateButton.classList.toggle('purple');
  meditateButton.classList.toggle('white');
  meditateIcon.classList.toggle('hide');
  meditateIconActive.classList.toggle('hide');
  studyIconActive.classList.add('hide');
  studyIcon.classList.remove('hide');
  studyButton.classList.remove('green');
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
  timerButton.classList.add('purple-circle');
}

function changeColorOfExerciseButton() {
  exerciseButton.classList.toggle('red');
  exerciseButton.classList.toggle('white');
  exerciseIcon.classList.toggle('hide');
  exerciseIconActive.classList.toggle('hide');
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
  studyIconActive.classList.add('hide');
  studyIcon.classList.remove('hide');
  studyButton.classList.remove('green');
  timerButton.classList.add('red-circle');
}
