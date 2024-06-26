import { joinAsClient } from "./socket.js";
import { playNote, startSynth } from "./synth.js";
("./midi.js");

const noteMap = {
  60: "C",
  61: "C#",
  62: "D",
  63: "D#",
  64: "E",
  65: "F",
  66: "F#",
  67: "G",
  68: "G#",
  69: "A",
  70: "A#",
  71: "B",
  72: "C",
  73: "C#",
  74: "D",
  75: "D#",
  76: "E",
  77: "F",
  78: "F#",
  79: "G",
  80: "G#",
  81: "A",
  82: "A#",
  83: "B",
  84: "C",
  85: "C#",
  86: "D",
  87: "D#",
  88: "E",
  89: "F",
  90: "F#",
  91: "G",
  92: "G#",
  93: "A",
  94: "A#",
  95: "B",
  96: "C",
  97: "C#",
  98: "D",
  99: "D#",
  100: "E",
  101: "F",
  102: "F#",
  103: "G",
  104: "G#",
  105: "A",
  106: "A#",
  107: "B",
  108: "C",
  109: "C#",
  110: "D",
  111: "D#",
  112: "E",
  113: "F",
  114: "F#",
  115: "G",
  116: "G#",
  117: "A",
  118: "A#",
  119: "B",
  120: "C",
  121: "C#",
  122: "D",
  123: "D#",
  124: "E",
  125: "F",
  126: "F#",
};
const noteView = document.getElementById("note-view");
const startView = document.getElementById("start-view");
const noteElement = document.getElementById("note");

let clientNote = 60;

const start = (name) => {
  joinAsClient({
    name,
    onJoined: (client) => {
      hideStartView();
      showNoteView(client.note);
      setClientNote(client.note);
    },
    onPlayNote: (note) => {
      console.log("note", note);
      if (note.note !== clientNote) return;
      animateNoteView(note.velocity);
      playNote(note);
    },
  });

  startSynth();
};

const animateNoteView = (velocity) => {
  noteElement.style.transform = `scale(${1 + (3 * velocity) / 127})`;
};

const setClientNote = (note) => {
  clientNote = note;
};

const getNoteByNumber = (noteNumber) => {
  return noteMap[noteNumber];
};

const hideStartView = () => {
  document.getElementById("start-view").style.display = "none";
};

const showNoteView = (note) => {
  startView.style.display = "none";
  noteView.style.display = "block";
  noteElement.innerHTML = getNoteByNumber(note);
};

const onStartClick = () => {
  const name = "🤘";
  start(name);
};

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => onStartClick());
