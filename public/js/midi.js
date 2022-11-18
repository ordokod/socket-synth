const MIDI = ({ onNotePlayed }) => {
  const initMIDIAccess = async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      midiAccess.inputs.forEach(
        (input) => (input.onmidimessage = getMIDIMessage)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMIDIMessage = (message) => {
    const note = message.data[1];
    const velocity = message.data[2];
    onNotePlayed({ note, velocity });
  };

  initMIDIAccess();
};

export default MIDI;
