var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "twenty six","sixty", "eighty", "one hundred", "one hundred and forthy", "one hundred and eighty"];
var grammar = '#JSGF V1.0; grammar numbers; public <number> = ' + numbers.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let resultSpeech = document.getElementById("resultSpeech");
let arroffids = [];
let currentScoreLeft = 501;
let currentScoreRight = 501;
let leftScore = document.getElementById("left");
let rightScore = document.getElementById("right");

for (let i = 1; i < 29; i++) {
  arroffids.push(document.getElementById(`score_${i}`));
}

arroffids.forEach((i, index) => {
  i.addEventListener("focusout", () => {
    // recognition.start();
    // console.log('Ready to receive a number command.');
    // recognition.onresult = function(event) {
    //   var last = event.results.length - 1;
    //   var number = event.results[last][0].transcript;
    //   resultSpeech.innerText = 'Result received: ' + number + '.';
    //   arroffids[index].value = number;
    //   console.log('Confidence: ' + event.results[0][0].confidence);
    // }
    if (index % 2 === 0) {
      currentScoreLeft = currentScoreLeft - Math.abs(i.value);
      if (currentScoreLeft === 0) {
        alert("Game Over!!!!");
      } else if (Math.abs(i.value > 180)) {
        leftScore.value = leftScore.value;
        currentScoreLeft = Number(currentScoreLeft) + Math.abs(Number(i.value));
        arroffids[index].focus();
      } else if (currentScoreLeft < 2) {
        leftScore.value = leftScore.value;
        currentScoreLeft = Number(currentScoreLeft) + Math.abs(Number(i.value));
        arroffids[index].value = 0;
      } else {
        leftScore.value = currentScoreLeft;
        arroffids[index].value = Math.abs(arroffids[index].value);
      }
    } else {
      currentScoreRight = currentScoreRight - Math.abs(i.value);
      if (currentScoreRight === 0) {
        alert("Game Over!!!!");
      } else if (Math.abs(i.value > 180)) {
        rightScore.value = rightScore.value;
        currentScoreRight = Number(currentScoreRight) + Math.abs(Number(i.value));
        arroffids[index].focus();
      } else if (currentScoreRight < 2) {
        rightScore.value = rightScore.value;
        currentScoreRight = Number(currentScoreRight) + Math.abs(Number(i.value));
        arroffids[index].value = 0;
      } else {
        rightScore.value = currentScoreRight;
        arroffids[index].value = Math.abs(arroffids[index].value);
      }
    }
  });

    
    i.addEventListener("click", () => {
      recognition.start();
      console.log('Ready to receive a number command.');
      recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var number = event.results[last][0].transcript;
        resultSpeech.innerText = 'Result received: ' + number + '.';
        arroffids[index].value = number;
        console.log(arroffids[index]);
        console.log('Confidence: ' + event.results[0][0].confidence);
      }
    });
});
