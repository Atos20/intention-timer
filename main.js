var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button')

studyButton.addEventListener('click', changeColorOfStudyButton);
meditateButton.addEventListener('click', changeColorOfMeditateButton);
exerciseButton.addEventListener('click', changeColorOfExerciseButton);

function changeColorOfStudyButton() {
  studyButton.classList.add('hide');
}
