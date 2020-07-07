const addGoalModal = document.getElementById('add-modal');
const startAddGoalButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddGoalButton = addGoalModal.querySelector('.btn--passive');
const confirmAddGoalButton = cancelAddGoalButton.nextElementSibling;
const userInputs = addGoalModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const goals = [];

const updateUI = () => {
    if(goals.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
  };

const renderNewGoalElement = (goal, description, rating) => {
    const newGoalElement = document.createElement('li');
    newGoalElement.className = 'goal-element';
    newGoalElement.innerHTML = `
        <div class="goal-element__info">
            <h2> ${goal} </h2>
            <h4> ${description} </h4>
            <p> ${rating} / 5 </p>
        </div>
    `;

    const listRoot = document.getElementById('goal-list');
    listRoot.append(newGoalElement);
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleGoalModal = () => {
  addGoalModal.classList.toggle('visible');
  toggleBackdrop();
};

const clearInputsHandler = () => {
    for(const userInput of userInputs) {
        userInput.value = '';
    }
  };
  

const cancelAddGoalHandler = () => {
  toggleGoalModal();
  clearInputsHandler();
};


const addGoalHandler = () => {
  const goalValue = userInputs[0].value;
  const descriptionValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    goalValue.trim() === '' ||
    descriptionValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newGoal = {
      goal: goalValue,
      description: descriptionValue,
      rating: ratingValue
  }

    goals.push(newGoal);
    toggleGoalModal();
    clearInputsHandler();
    renderNewGoalElement(newGoal.goal, newGoal.description, newGoal.rating);
    updateUI();
};

const backdropClickHandler = () => {
  toggleGoalModal();
  clearInputsHandler();
};

startAddGoalButton.addEventListener('click', toggleGoalModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddGoalButton.addEventListener('click', cancelAddGoalHandler);
confirmAddGoalButton.addEventListener('click', addGoalHandler);
