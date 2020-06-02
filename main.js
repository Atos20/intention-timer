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
var logActivityButton = document.querySelector('.log-activity-button')
var noActivitiesMessage = document.querySelector('.no-activities-message')
var cardContainer = document.querySelector('.card-container')
var activityButtonContainer = document.querySelector('.activity-button-container')
var completedActivity = document.querySelector('.completed-activity')
var newActivityButton = document.querySelector('.new-activity-button')

activityButtonContainer.addEventListener('click', activityButton);
startActivityButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', timerStart);
logActivityButton.addEventListener('click', logActivity);
newActivityButton.addEventListener('click', returnHome)

var activityInformation = [];
var selectedCategory

function startActivity(event) {
  event.preventDefault();
  storeInformation();
  addIntentionAlert();
  addMinuteAlert();
  addSecondAlert();
  iconAlert();
  allowDisplayTimerCard();
}

function iconAlert() {
  if(studyButton.classList.contains('green') ||
    meditateButton.classList.contains('purple') ||
    exerciseButton.classList.contains('red')) {
    alertUnselectedActivity.classList.add('hide');
  } else {
    alertUnselectedActivity.classList.remove('hide');
  }
}

function addIntentionAlert() {
  if (intentionInformation.value.length === 0) {
    alertEmptyText.classList.remove('hide');
  } else {
    alertEmptyText.classList.add('hide')
  }
}

function addMinuteAlert() {
  if (minutesNumberOnly.value.length === 0) {
    alertEmptyMinutes.classList.remove('hide');
  } else {
    alertEmptyMinutes.classList.add('hide');
  }
}

function addSecondAlert() {
  if (secondsNumberOnly.value.length === 0) {
    alertEmptySeconds.classList.remove('hide');
  } else {
    alertEmptySeconds.classList.add('hide');
  }
}

function allowDisplayTimerCard() {
  if ((studyButton.classList.contains('green') || meditateButton.classList.contains('purple') || exerciseButton.classList.contains('red')) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    displayTimerCard()
  }
}

function storeInformation() {
  var activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, undefined, undefined,);
  activityInformation.unshift(activityInstance);
  activityInformation[0].saveToStorage();
}

function displayTimerCard() {
  timerCard.classList.remove('hide');
  activityCard.classList.add('hide');
  var activity = activityInformation[0];
  activity.display();
}

function timerStart() {
  var intentionTimer = setInterval(countdown, 1000);
  var activity = activityInformation[0];
  var allSeconds = activity.totalSeconds();
  function countdown() {
    allSeconds--
    minutesText.innerText = Math.floor( (allSeconds/60) % 60 )
    secondsText.innerText = Math.floor( (allSeconds) % 60 );
    // secondsText.innerText = Math.floor( (allSeconds) % 60 ); => secondsText.innerText = Math.floor(allSeconds % 60);
    // secondsText.innerText = ('0' + secondsText.innerText); => secondsText.innerText = '0' + secondsText.innerText;
    if (allSeconds < 0) {
      clearInterval(intentionTimer);
      timerComplete();
    }
    if (secondsText.innerText < 10) {
      secondsText.innerText = ('0' + secondsText.innerText);
    }
  }
}

function timerComplete() {
  secondsText.innerText = `0`;
  minutesText.innerText = `0`
  timerButton.innerText = `WELL-DONE`
  timerButton.disabled = true;
}

function logActivity() {
  noActivitiesMessage.classList.add('hide');
  cardContainer.classList.remove('hide');
  cardContainer.innerHTML = '';
  cardContainer.innerHTML = `<article class="past-activity-card">
    <p class="past-activity">${activityInformation[0].category}</p>
    <p class="past-time"><span>${activityInformation[0].minutes}</span>MIN<span>${activityInformation[0].seconds}</span>SECONDS</p>
    <p class="past-intention">${activityInformation[0].description}</p>
    <div class="activity-color-tag"></div>
  </article>`
  timerCard.classList.add('hide');
  completedActivity.classList.remove('hide');
  timerButton.disabled = false;
  assignTagColor();
}

function assignTagColor() {
  var activityColorTag = document.querySelector('.activity-color-tag')
  if(activityInformation[0].category === 'Study') {
  activityColorTag.classList.add('green')
  } else if (activityInformation[0].category === 'Exercise') {
  activityColorTag.classList.add('red')
  } else {
  activityColorTag.classList.add('purple')
  }
}

function clearForm() {
    intentionInformation.value = "";
    minutesNumberOnly.value = "";
    secondsNumberOnly.value = "";
    unselectStudy();
    unselectMeditate();
    unselectExercise();
};


function returnHome() {
  completedActivity.classList.add('hide');
  activityCard.classList.remove('hide');
  timerButton.innerText = `START`
  clearForm();

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

function activityButton(event) {
  if(event.target.classList.contains('study-button')) {
    selectStudyButton()
  } else if(event.target.classList.contains('meditate-button')) {
    selectMeditateButton()
  } else if(event.target.classList.contains('exercise-button')) {
    selectExerciseButton()
  }
}

function unselectStudy() {
  studyIconActive.classList.add('hide');
  studyIcon.classList.remove('hide');
  studyButton.classList.remove('green');
}

function unselectMeditate() {
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
}

function unselectExercise() {
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
}

function selectStudyButton() {
  selectedCategory = 'Study';
  studyButton.classList.toggle('green');
  studyButton.classList.toggle('white');
  studyIcon.classList.toggle('hide');
  studyIconActive.classList.toggle('hide');
  unselectMeditate();
  unselectExercise();
  timerButton.classList.add('green-circle');
}

function selectMeditateButton() {
  selectedCategory = 'Meditate';
  meditateButton.classList.toggle('purple');
  meditateButton.classList.toggle('white');
  meditateIcon.classList.toggle('hide');
  meditateIconActive.classList.toggle('hide');
  unselectStudy();
  unselectExercise();
  timerButton.classList.add('purple-circle');
}

function selectExerciseButton() {
  selectedCategory = 'Exercise';
  exerciseButton.classList.toggle('red');
  exerciseButton.classList.toggle('white');
  exerciseIcon.classList.toggle('hide');
  exerciseIconActive.classList.toggle('hide');
  unselectMeditate();
  unselectStudy();
  timerButton.classList.add('red-circle');
}
