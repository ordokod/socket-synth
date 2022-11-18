# Socket Synth

## Socket Synt is a JavaScript experiment, using the Web MIDI, AudioContext and WebSocket API to play music on multiple clients.

## How i works

- A client starts by entering their name, clicking on OK, and then gets a specific note to play
- A host connects to a MIDI device by using the Web MIDI API
- The host plays on the connected device and sends the notes to the clients
- Each of the connected clients will now play only the note given to them
