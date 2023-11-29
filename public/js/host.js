import MIDI from "./midi.js";
import { emitNoteToServer, joinAsHost } from "./socket.js";

const updatePianoKeys = (players) => {
  players.forEach((player) => {
    const key = document.querySelector(`.key[data-key="${player.note}"]`);
    key.innerHTML = player.name;
  });
};

joinAsHost({
  onNotePlayed: (note) => {},
  onClientsChanged: (clients) => {
    updatePianoKeys(clients);
  },
});

const keys = document.querySelectorAll(".key");

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

const playNote = (note) => {
  const key = document.querySelector(`.key[data-key="${note.note}"]`);
  if (note.velocity === 0) key.classList.remove("playing");
  if (note.velocity !== 0) key.classList.add("playing");
  emitNoteToServer(note);
};

MIDI({
  onNotePlayed: (note) => {
    playNote(note);
  },
});
