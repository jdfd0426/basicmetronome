const bpmInput = document.getElementById('bpm');
const startStopButton = document.getElementById('startStop');
let isRunning = false;
let intervalId;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
    const osc = audioContext.createOscillator();
    osc.frequency.value = 1000; // Frequency in Hz
    osc.type = 'sine'; // Waveform type
    osc.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        startStopButton.textContent = 'Start';
    } else {
        const bpm = parseInt(bpmInput.value);
        const interval = 60000 / bpm;
        intervalId = setInterval(() => {
            playClick(); // Call the playClick function here
        }, interval);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});