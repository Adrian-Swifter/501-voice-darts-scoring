var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "twenty six",
  "sixty",
  "eighty",
  "one hundred",
  "one hundred and forthy",
  "one hundred and eighty",
];
let grammar =
  "#JSGF V1.0; grammar numbers; public <number> = " +
  numbers.join(" | ") +
  " ;";

let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();

let arroffids = [];
let currentScoreLeft = 501;
let currentScoreRight = 501;
let leftScore = document.getElementById("left");
let rightScore = document.getElementById("right");
let scoreInputArr = Array.from(document.querySelectorAll(".score-input"));
let numOfClicks = 0;
const scoreInputs = document.getElementsByClassName("score-inputs")[0];

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//GET ALL THE ID's OF SCORE INPUTS
for (let i = 1; i <= scoreInputArr.length; i++) {
  if (!arroffids.includes(document.querySelector(`#score_${i}`)))
    arroffids.push(document.querySelector(`#score_${i}`));
}

//SCORE SUBSTRACTING AND LOGIC
recursivelySubstractScoreAndAddNewScoreInputs(arroffids);

//PLAYER NAMES
(function () {
  let player = document.querySelectorAll(".player");
  let playerArr = Array.from(player);
  playerArr.forEach((i, ind) => {
    i.innerHTML =
      JSON.parse(localStorage.getItem(`player${ind + 1}`)) ||
      `Player ${ind + 1}`;
    i.addEventListener("click", function (e) {
      if (i.firstElementChild === null) {
        i.innerHTML = `<input type="text" placeholder="Player ${ind + 1}...">`;
        i.firstElementChild.focus();
      }

      i.firstElementChild.addEventListener("keyup", function (e) {
        localStorage.setItem(
          `player${ind + 1}`,
          JSON.stringify(i.firstElementChild.value)
        );
        if (e.keyCode === 13) {
          i.innerHTML = JSON.parse(localStorage.getItem(`player${ind + 1}`));
        }
      });
    });
  });
})();

//FUNCTION TO CHECK THE SCORE AND SUBTRACT
function checkScore(currentScore, score, currentElement, index) {
  if (currentScore === 0) {
    alert("Game Over!!!");
    window.location.href = window.location.href;
  } else if (Math.abs(currentElement.value > 180)) {
    score.value = score.value;
    currentScore =
      Number(currentScore) + Math.abs(Number(currentElement.value));
    arroffids[index].focus();
  } else if (currentScore < 2) {
    score.value = score.value;
    currentScore =
      Number(currentScore) + Math.abs(Number(currentElement.value));
    arroffids[index].value = 0;
  } else {
    score.value = currentScore;
    arroffids[index].value = Math.abs(arroffids[index].value);
  }
}

function createNewInputs(currentIndex) {
  const newInput1 = document.createElement("input");
  newInput1.className = "score-input";
  newInput1.setAttribute("id", `score_${currentIndex + 1}`);
  newInput1.type = "number";

  const newInput2 = document.createElement("input");
  newInput2.className = "score-input";
  newInput2.setAttribute("id", `score_${currentIndex + 2}`);
  newInput2.type = "number";

  scoreInputs.appendChild(newInput1);
  scoreInputs.appendChild(newInput2);

  newInput1.focus();
}

function recursivelySubstractScoreAndAddNewScoreInputs(arrayOfElements) {
  arrayOfElements.forEach((i, index) => {
    i.addEventListener("focusout", () => {
      if (
        i.getAttribute("id").split("_")[1] >= 6 &&
        Number(i.getAttribute("id").split("_")[1]) % 2 === 0
      ) {
        createNewInputs(Number(i.getAttribute("id").split("_")[1]));
        scoreInputArr = Array.from(document.querySelectorAll(".score-input"));
        for (let i = 1; i <= scoreInputArr.length; i++) {
          if (!arroffids.includes(document.querySelector(`#score_${i}`)))
            arroffids.push(document.querySelector(`#score_${i}`));
        }
        recursivelySubstractScoreAndAddNewScoreInputs(arroffids);
      }

      if (index % 2 === 0) {
        currentScoreLeft = currentScoreLeft - Math.abs(i.value);
        checkScore(currentScoreLeft, leftScore, i, index);
      } else {
        currentScoreRight = currentScoreRight - Math.abs(i.value);
        checkScore(currentScoreRight, rightScore, i, index);
      }
    });

    //START VOICE RECOGNITION ON INPUT CLICK
    i.addEventListener("click", () => {
      numOfClicks++;

      if (numOfClicks > 1) {
        recognition.start();
        console.log("Ready to receive a number command.");
        recognition.onresult = function (event) {
          let last = event.results.length - 1;
          let number = event.results[last][0].transcript;
          arroffids[index].value = number;
          numOfClicks = 0;
        };

        //POLLING THE INPUT FOR CHANGE VALUE AND THEN FOCUSING NEXT INPUT ELEMENT
        let lastInputValue = i.value;
        setInterval(function () {
          let newValue = i.value;
          if (lastInputValue != newValue && newValue <= 180) {
            lastInputValue = newValue;
            arroffids[index + 1].focus();
          }
        }, 100);
      }
    });
  });
}
