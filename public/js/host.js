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
    console.log("clients", clients);
    updatePianoKeys(clients);
  },
});

MIDI({
  onNotePlayed: (note) => {
    console.log("note", note);
    const key = document.querySelector(`.key[data-key="${note.note}"]`);
    if (note.velocity === 0) key.classList.remove("playing");
    if (note.velocity !== 0) key.classList.add("playing");
    emitNoteToServer(note);
  },
});
