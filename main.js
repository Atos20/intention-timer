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
var userInput = document.querySelector('.user-input');
var alertEmptyText = document.querySelector('.alert-empty-text');
var alertEmptyMinutes = document.querySelector('.alert-empty-minutes');
var alertEmptySeconds = document.querySelector('.alert-empty-seconds');
var alertUnselectedActivity = document.querySelector('.alert-unselected-activity');
var minutesText = document.querySelector('.minutes-text');
var secondsText = document.querySelector('.seconds-text');


studyButton.addEventListener('click', changeColorOfStudyButton);
meditateButton.addEventListener('click', changeColorOfMeditateButton);
exerciseButton.addEventListener('click', changeColorOfExerciseButton);
startActivityButton.addEventListener('click', storeInformation);
startActivityButton.addEventListener('click', addIntentionAlert);
startActivityButton.addEventListener('click', addMinuteAlert);
startActivityButton.addEventListener('click', addSecondAlert);
startActivityButton.addEventListener('click', iconAlert);
startActivityButton.addEventListener('click', allowDisplayTimerCard);
timerButton.addEventListener('click', timerStart);
startActivityButton.addEventListener('click', totalSeconds);

var activityInformation = [];
var selectedCategory

function iconAlert() {
  if(studyButton.classList.contains('green') === false && meditateButton.classList.contains('purple') === false && exerciseButton.classList.contains('red') === false) {
    alertUnselectedActivity.classList.remove('hide');
   }
   if(studyButton.classList.contains('green') || meditateButton.classList.contains('purple') || exerciseButton.classList.contains('red')) {
     alertUnselectedActivity.classList.add('hide');
   }
}

function addIntentionAlert() {
  if (intentionInformation.value.length === 0) {
    alertEmptyText.classList.remove('hide');
  }
  if (intentionInformation.value.length > 0) {
    alertEmptyText.classList.add('hide')
  }
}

function addMinuteAlert() {
  if (minutesNumberOnly.value.length === 0) {
    alertEmptyMinutes.classList.remove('hide');
  }
  if (minutesNumberOnly.value.length > 0) {
    alertEmptyMinutes.classList.add('hide');
  }
}

function addSecondAlert() {
  if (secondsNumberOnly.value.length === 0) {
    alertEmptySeconds.classList.remove('hide');
  }
  if (secondsNumberOnly.value.length > 0) {
    alertEmptySeconds.classList.add('hide');
  }
}

function allowDisplayTimerCard() {
  if ((studyButton.classList.contains('green') || meditateButton.classList.contains('purple') || exerciseButton.classList.contains('red')) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    displayTimerCard()
  }
}

function storeInformation(event) {
  event.preventDefault();
  var activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, undefined, undefined,);
  activityInformation.unshift(activityInstance);
}

function displayUserInput() {
  userIntention.innerText = activityInformation[0].description;
  minutesText.innerText = activityInformation[0].minutes;
  secondsText.innerText = activityInformation[0].seconds;
}

function displayTimerCard() {
  timerCard.classList.remove('hide');
  activityCard.classList.add('hide');
  displayUserInput();
  // assignCorrectCircleColor();
}


function totalSeconds() {
  return ((parseInt(activityInformation[0].minutes) * 60) + (parseInt(activityInformation[0].seconds)))
}

function timerStart() {
  var intentionTimer = setInterval(countdown, 1000);
  var allSeconds = totalSeconds();
  function countdown() {
    console.log(allSeconds)
    if(allSeconds > 0){
      allSeconds--
    } else{
      window.alert("YAY!")
      return
    }
    minutesText.innerText = Math.floor( (allSeconds/60) % 60 )
    secondsText.innerText = Math.floor( (allSeconds) % 60 );
    if(secondsText.innerText < 0){
      secondsText.innerText = `00`;
      minutesText.innerText = `0`;
    }else if (secondsText.innerText < 10){
      secondsText.innerText = ('0' + secondsText.innerText);
    }
  }
}

minutesNumberOnly.addEventListener('keypress', function(event) {
  // minuteNumberOnly.value
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
