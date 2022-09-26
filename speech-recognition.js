const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

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
export { recognition, speechRecognitionList, grammar };
