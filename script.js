const bpmInput = document.getElementById('bpm');
const startStopButton = document.getElementById('startStop');
let isRunning = false;
let intervalId;

// Create the audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
    const osc = audioContext.createOscillator();
    osc.frequency.value = 1000; // Frequency in Hz
    osc.type = 'sine'; // Waveform type
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1; // Volume control

    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
    console.log('Tick');
}

function startMetronome() {
    const bpm = parseInt(bpmInput.value);
    const interval = 60000 / bpm;
    intervalId = setInterval(() => {
        playClick();
    }, interval);
}

startStopButton.addEventListener('click', () => {
    console.log('Start/Stop button clicked');
    // Resume audio context on user interaction
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed');
            toggleMetronome();
        }).catch(error => {
            console.error('Audio context resume failed:', error);
        });
    } else {
        toggleMetrono
