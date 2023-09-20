const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'is anchor tag self closing?',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
    ]
  },
  {
    question: 'Variables declared with the let keyword have what type of scope?',
    answers: [
      { text: 'block scope', correct: true },
      { text: 'inline scope', correct: false },
      { text: 'global scope', correct: false },
      { text: 'function scope', correct: false }
    ]
  },
  {
    question: 'What is the correct HTML for referring to an external style sheet?',
    answers: [
      { text: '<stylesheet>mystyle.css</stylesheet />', correct: false },
      { text: '<link rel=”stylesheet” type=”text/css” href=”mystyle.css”>', correct: true },
      { text: '<style src=”mystyle.css” />', correct: false },
      { text: 'NONE', correct: false }
    ]
  },
  {
    question: 'In which HTML element, we put the JavaScript code??',
    answers: [
      { text: '<javascript>...</javascript>', correct: false },
      { text: '<script>...</script>', correct: true }
    ]
  }
]