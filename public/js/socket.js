const socket = io();

export const joinAsHost = ({
  onNotePlayed = () => {},
  onClientsChanged = () => {},
}) => {
  socket.on("play-note", (note) => {
    onNotePlayed(note);
  });

  socket.on("clients", (clients) => {
    onClientsChanged(clients);
  });

  socket.emit("join-as-host", "host");
};

export const emitNoteToServer = (note) => {
  socket.emit("play-note", note);
};

export const joinAsClient = ({
  name,
  onJoined = () => {},
  onPlayNote = () => {},
}) => {
  socket.emit("join-as-client", name);

  socket.on("client-joined", (client) => {
    console.log("client-joined", client);
    onJoined(client);
  });

  socket.on("play-note", (note) => {
    console.log("note", note);
    onPlayNote(note);
  });

  socket.on("clients", (clients) => {
    console.log("clients", clients);
  });
};
