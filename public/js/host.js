import MIDI from "./midi.js";
import { emitNoteToServer, joinAsHost } from "./socket.js";
("./midi.js");

const updatePianoKeys = (players) => {
  const pianoKeys = document.querySelectorAll(".key");
  pianoKeys.forEach((key) => {
    key.classList.remove("active");
  });

  players.forEach((player) => {
    const key = document.querySelector(`.key[data-key="${player.note}"]`);
    key.classList.add("active");
    key.innerHTML = player.name;
  });
};

joinAsHost({
  onNotePlayed: (note) => {
    console.log("note", note);
  },
  onPlayersChanged: (players) => {
    console.log("players", players);
    updatePianoKeys(players);
  },
});

MIDI({
  onNotePlayed: (note) => {
    emitNoteToServer(note);
  },
});
