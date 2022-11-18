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

let clientNote = 0;

const start = (name) => {
  joinAsClient({
    name,
    onJoined: (client) => {
      hideStartView();
      showNoteView(client.note);
      setClientNote(client.note);
    },
    onPlayNote: (note) => {
      if (note.note !== clientNote) return;
      setBackgroundColorByVelocity(note.velocity);
      playNote(note);
    },
  });

  startSynth();
};

const setBackgroundColorByVelocity = (velocity) => {
  const color =
    velocity === 0 ? "black" : `rgba(0, 0, 0, ${1 - velocity / 127})`;
  document.body.style.backgroundColor = color;
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
  const noteView = document.getElementById("note-view");
  const noteElement = document.getElementById("note");
  noteElement.innerHTML = getNoteByNumber(note);
  noteView.style.display = "block";
};

const onStartClick = () => {
  const name = document.getElementById("name-input").value;
  if (!name) return;
  start(name);
};

document.getElementById("name-input").addEventListener("keyup", (e) => {
  e.preventDefault();

  if (e.key !== "Enter") return;

  onStartClick();
});
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => onStartClick());
