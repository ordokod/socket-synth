let audioContext = null;
let mainGain = null;
let oscillators = [];

export const startSynth = () => {
  console.log("startSynth");
  audioContext = new AudioContext();
  mainGain = audioContext.createGain();
  mainGain.connect(audioContext.destination);
  mainGain.gain.value = 1;
};

const createOscillator = (midiNote) => {
  if (!audioContext) {
    return;
  }

  const note = midiNote.note;
  const velocity = midiNote.velocity;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.connect(gain);
  gain.connect(mainGain);
  const gainValue = velocity / 127;
  console.log("gainValue", gainValue);
  gain.gain.value = gainValue;
  gain.gain.setValueAtTime(0.0, audioContext.currentTime);
  gain.gain.setTargetAtTime(gainValue, audioContext.currentTime, 0.01);
  //  gain.gain.setTargetAtTime(0, audioContext.currentTime + 0.01, 0.5);
  oscillator.frequency.value = getFrequencyFromNote(note);
  oscillator.type = "sine";
  oscillator.start(audioContext.currentTime);

  return { oscillator, note, gain };
};

export const playNote = (midiNote) => {
  if (midiNote.velocity === 0) {
    console.log("midiNote", midiNote);
    stopNote(midiNote.note);
    return;
  }

  const oscillator = createOscillator(midiNote);
  oscillators = [...oscillators, oscillator];
};

export const stopNote = (note) => {
  const oscillator = oscillators.find((o) => o.note === note);

  if (oscillator) {
    oscillator.gain.gain.setTargetAtTime(0, audioContext.currentTime, 0.05);
    oscillators = [...oscillators.filter((o) => o.note !== note)];
  }
};

const getFrequencyFromNote = (note) => {
  console.log("note", note);
  const noteNumber = note - 69;
  const frequency = 440 * Math.pow(2, noteNumber / 12);
  return frequency;
};
