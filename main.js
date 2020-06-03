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
var userIntention = document.querySelector('.user-intention');
var timerButton = document.querySelector('.timer-button');
var minutesText = document.querySelector('.minutes-text');
var secondsText = document.querySelector('.seconds-text');
var logActivityButton = document.querySelector('.log-activity-button');
var activityButtonContainer = document.querySelector('.activity-button-container');
var completedActivity = document.querySelector('.completed-activity');
var newActivityButton = document.querySelector('.new-activity-button');

activityButtonContainer.addEventListener('click', activityButton);
startActivityButton.addEventListener('click', startActivity);
timerButton.addEventListener('click', timerStart);
logActivityButton.addEventListener('click', logActivity);
newActivityButton.addEventListener('click', returnHome);

var activityInformation = [];
var selectedCategory;
var tagColor;



function startActivity(event) {
  event.preventDefault();
  storeInformation();
  addIntentionAlert();
  addMinuteAlert();
  addSecondAlert();
  iconAlert();
  allowDisplayTimerCard();
  logActivityButton.disabled = true;
}

window.onload = retrieveFromStorage();
window.onload = displayPastActivities();

function iconAlert() {
  var alertUnselectedActivity = document.querySelector('.alert-unselected-activity');
  if(selectedCategory === undefined) {
    alertUnselectedActivity.classList.remove('hide');
  } else {
    alertUnselectedActivity.classList.add('hide');
  }
}

function addIntentionAlert() {
  var alertEmptyText = document.querySelector('.alert-empty-text');
  if (intentionInformation.value.length === 0) {
    alertEmptyText.classList.remove('hide');
  } else {
    alertEmptyText.classList.add('hide')
  }
}

function addMinuteAlert() {
  var alertEmptyMinutes = document.querySelector('.alert-empty-minutes');
  if (minutesNumberOnly.value.length === 0) {
    alertEmptyMinutes.classList.remove('hide');
  } else {
    alertEmptyMinutes.classList.add('hide');
  }
}

function addSecondAlert() {
  var alertEmptySeconds = document.querySelector('.alert-empty-seconds');
  if (secondsNumberOnly.value.length === 0) {
    alertEmptySeconds.classList.remove('hide');
  } else {
    alertEmptySeconds.classList.add('hide');
  }
}

function allowDisplayTimerCard() {
  if ((selectedCategory !== undefined) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    displayTimerCard()
  }
}

function storeInformation() {

  if ((selectedCategory !== undefined) && (intentionInformation.value.length > 0) && (minutesNumberOnly.value.length > 0) && (secondsNumberOnly.value.length > 0)) {
    var activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, tagColor, undefined, undefined,);
    activityInformation.unshift(activityInstance);
    activityInformation[0].saveToStorage();
  }
  // var activityInstance = new Activity (selectedCategory, intentionInformation.value, minutesNumberOnly.value, secondsNumberOnly.value, tagColor, undefined, undefined,);
  // activityInformation.unshift(activityInstance);
  // activityInformation[0].saveToStorage();
}

function displayTimerCard() {
  timerCard.classList.remove('hide');
  activityCard.classList.add('hide');
  var activity = activityInformation[0];
  activity.display();
}

function timerStart() {
  var intentionTimer = setInterval(timerCountdown, 1000);
  var activity = activityInformation[0];
  var allSeconds = activity.countdown();
  function timerCountdown() {
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
  timerButton.disabled = true;
}

function timerComplete() {
  var activity = activityInformation[0];
  activity.markComplete();
  logActivityButton.disabled = false;
}

function displayPastActivities() {
  var noActivitiesMessage = document.querySelector('.no-activities-message')
  var cardContainer = document.querySelector('.card-container')
  noActivitiesMessage.classList.add('hide');
  cardContainer.classList.remove('hide');
  cardContainer.innerHTML = '';
  for (var i = 0; i < activityInformation.length; i++) {
    cardContainer.innerHTML += `<article class="past-activity-card">
    <p class="past-activity">${activityInformation[i].category}</p>
    <p class="past-time"><span>${activityInformation[i].minutes} </span>MIN<span> ${activityInformation[i].seconds} </span>SECONDS</p>
    <p class="past-intention ">${activityInformation[i].description}</p>
    <div class="activity-color-tag ${activityInformation[i].tagColor}"></div>
    </article>`
  }
}

function logActivity() {

  displayPastActivities();
  timerCard.classList.add('hide');
  completedActivity.classList.remove('hide');
  timerButton.disabled = false;
}

function retrieveFromStorage() {
  activityInformation = JSON.parse(localStorage.getItem('activityInformation')) || [];
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
  timerButton.classList.remove('green-circle');
}

function unselectMeditate() {
  meditateButton.classList.remove('purple');
  meditateIcon.classList.remove('hide');
  meditateIconActive.classList.add('hide');
  timerButton.classList.remove('purple-circle');
}

function unselectExercise() {
  exerciseIconActive.classList.add('hide');
  exerciseIcon.classList.remove('hide');
  exerciseButton.classList.remove('red');
  timerButton.classList.remove('red-circle');
}

function selectStudyButton() {
  selectedCategory = 'Study';
  tagColor = 'green';
  studyButton.classList.toggle('green');
  studyButton.classList.toggle('white');
  studyIcon.classList.toggle('hide');
  studyIconActive.classList.toggle('hide');
  timerButton.classList.add('green-circle');
  unselectMeditate();
  unselectExercise();

}

function selectMeditateButton() {
  selectedCategory = 'Meditate';
  tagColor = 'purple';
  meditateButton.classList.toggle('purple');
  meditateButton.classList.toggle('white');
  meditateIcon.classList.toggle('hide');
  meditateIconActive.classList.toggle('hide');
  timerButton.classList.add('purple-circle');
  unselectStudy();
  unselectExercise();

}

function selectExerciseButton() {
  selectedCategory = 'Exercise';
  tagColor = 'red';
  exerciseButton.classList.toggle('red');
  exerciseButton.classList.toggle('white');
  exerciseIcon.classList.toggle('hide');
  exerciseIconActive.classList.toggle('hide');
  timerButton.classList.add('red-circle');
  unselectMeditate();
  unselectStudy();

}
