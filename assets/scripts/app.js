const addGoalModal = document.getElementById('add-modal');
const startAddGoalButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddGoalButton = addGoalModal.querySelector('.btn--passive');
const confirmAddGoalButton = cancelAddGoalButton.nextElementSibling;
const userInputs = addGoalModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteGoalModal = document.getElementById('delete-modal');


const goals = [];

const updateUI = () => {
    if(goals.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
  };

  const deleteGoal = goalId => {
    let goalIndex = 0;
    for(const goal of goals) {
        if(goal.id === goalId) {
            break;
        }
        goalIndex++;
    }

    goals.splice(goalIndex, 1);
    const listRoot = document.getElementById('goal-list');
    listRoot.children[goalIndex].remove();
  };

  const cancelGoalDeletion = () => {
      toggleBackdrop();
      deleteGoalModal.classList.remove('visible');
  }

  const closeGoalDeletionModal = () => {
      toggleBackdrop();
      deleteGoalModal.classList.remove('visible');
  }
  
  const startDeleteGoalHandler = goalId => {
    deleteGoalModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteGoalModal.querySelector('btn--passive');
    const confirmDeletionButton = deleteGoalModal.querySelector('btn--danger');

    cancelDeletionButton.addEventListener('click', closeGoalDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteGoal.bind(null, goalId));
 }

const renderNewGoalElement = (id, goal, description, rating) => {
    const newGoalElement = document.createElement('li');
    newGoalElement.className = 'goal-element';
    newGoalElement.innerHTML = `
        <div class="goal-element__info">
            <h2> ${goal} </h2>
            <h4> ${description} </h4>
            <p> ${rating} / 5 </p>
        </div>
    `;

    newGoalElement.addEventListener('click', startDeleteGoalHandler.bind(null, id)); 

    const listRoot = document.getElementById('goal-list');
    listRoot.append(newGoalElement);
}

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeGoalModal = () => {
    addGoalModal.classList.remove('visible');
}

const showGoalModal = () => {
  addGoalModal.classList.add('visible');
  toggleBackdrop();
};

const clearInputsHandler = () => {
    for(const userInput of userInputs) {
        userInput.value = '';
    }
  };
  

const cancelAddGoalHandler = () => {
  closeGoalModal();
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
      id: Math.random().toString(),
      goal: goalValue,
      description: descriptionValue,
      rating: ratingValue
  }

    goals.push(newGoal);
    closeGoalModal();
    toggleBackdrop();
    clearInputsHandler();
    renderNewGoalElement(newGoal.id,newGoal.goal, newGoal.description, newGoal.rating);
    updateUI();
};

const backdropClickHandler = () => {
  closeGoalModal();
  closeGoalDeletionModal();
  
};

startAddGoalButton.addEventListener('click', showGoalModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddGoalButton.addEventListener('click', cancelAddGoalHandler);
confirmAddGoalButton.addEventListener('click', addGoalHandler);
