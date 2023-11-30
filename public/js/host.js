import MIDI from "./midi.js";
import { emitNoteToServer, joinAsHost } from "./socket.js";

const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const updatePianoKeys = (players) => {
  players.forEach((player) => {
    const key = document.querySelector(`.key[data-key="${player.note}"]`);
    key.innerHTML = player.name;
  });
};

const addListeners = () => {
  const keys = document.querySelectorAll(".key");

  if (isTouchDevice()) {
    keys.forEach((key) => {
      key.addEventListener("touchstart", (e) => {
        const note = parseInt(e.target.dataset.key);
        playNote({ note, velocity: 100 });
      });

      key.addEventListener("touchend", (e) => {
        const note = parseInt(e.target.dataset.key);
        playNote({ note, velocity: 0 });
      });
    });
    return;
  }

  keys.forEach((key) => {
    key.addEventListener("mousedown", (e) => {
      const note = parseInt(e.target.dataset.key);
      playNote({ note, velocity: 100 });
    });
    key.addEventListener("mouseup", (e) => {
      const note = parseInt(e.target.dataset.key);
      playNote({ note, velocity: 0 });
    });
  });
};

const playNote = (note) => {
  const key = document.querySelector(`.key[data-key="${note.note}"]`);
  if (note.velocity === 0) key.classList.remove("playing");
  if (note.velocity !== 0) key.classList.add("playing");
  emitNoteToServer(note);
};

document.getElementById("piano").style.transform = "scale(2)";

addListeners();

MIDI({
  onNotePlayed: (note) => {
    playNote(note);
  },
});

joinAsHost({
  onNotePlayed: (note) => {},
  onClientsChanged: (clients) => {
    updatePianoKeys(clients);
  },
});
