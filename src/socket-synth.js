import { Server } from "socket.io";
import { server } from "./server.js";

export const InitSocketSynth = () => {
  const ioServer = new Server(server);
  const notes = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84];
  let clients = [];

  const tick700 = () => {
    ioServer.emit("tick700", new Date().getTime());
    setTimeout(tick700, 7000);
  };

  tick700();

  ioServer.on("connection", (socket) => addSocketListeners(socket));

  const addSocketListeners = (socket) => {
    socket.on("join-as-host", () => onJoinAsHost(socket));
    socket.on("join-as-client", (name) => onJoinAsClient(socket, name));
    socket.on("play-note", (note) => socket.broadcast.emit("play-note", note));
    socket.on("disconnect", () => onDisconnect(socket));
  };

  const onDisconnect = (socket) => {
    console.log("user disconnected");
    clients = clients.filter((client) => client.id !== socket.id);
    console.log("clients", clients);
    emitClients(socket, clients);
  };

  const emitClients = (socket, clients) =>
    socket.broadcast.emit("clients", clients);
  const emitClientJoined = (socket, client) => {
    socket.emit("client-joined", client);
  };

  const onJoinAsHost = (socket) => {
    console.log("host joined");
    emitClients(socket, clients);
  };

  const onJoinAsClient = (socket, name) => {
    if (clients.length === notes.length) return;
    if (clients.find((client) => client.id === socket.id)) return;
    console.log("client joined", name);
    const newClient = createNewClient(socket, name);
    addClientToClients(newClient);
    emitClientJoined(socket, newClient);
    emitClients(socket, clients);
  };

  const createNewClient = (socket, name) => {
    const client = {
      id: socket.id,
      note: getAvailableNote(),
      name,
    };

    return client;
  };

  const addClientToClients = (client) => {
    clients = [...clients, client];
  };

  const getAvailableNotes = () =>
    notes.filter((note) => !clients.find((client) => client.note === note));

  const getAvailableNote = () => {
    const availableNotes = getAvailableNotes();
    return availableNotes[Math.floor(Math.random() * availableNotes.length)];
  };
};
