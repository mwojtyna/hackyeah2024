const fs = require("fs");
const { WaveFile } = require("wavefile");
const { PvRecorder } = require("@picovoice/pvrecorder-node");

const { program } = require("commander");

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

// this needs to be done not by changing a global variable
let stopAudioRecording = false;


async function record() {
	const frames = [];
	const framelength = 512;
	//console.log(PvRecorder.getAvailableDevices());
	const wav = new WaveFile();
	const recorder = new PvRecorder(framelength, -1);
	recorder.start()

	while(!stopAudioRecording) {
		const frame = await recorder.read();
		frames.push(frame);
	}

	const audiodata = new Int16Array(recorder.frameLength * frames.length);
	for (let i = 0; i < frames.length; i++) {
		audiodata.set(frames[i], i * recorder.frameLength);
	}
	wav.fromScratch(1, recorder.sampleRate, '16', audiodata);
	fs.writeFileSync(`recordedAudio.wav`, wav.toBuffer());
	recorder.stop()
	//console.log("stopped recording");
	recorder.release();
}

(async function () {
	try {
		record();
		await sleep(5000);
		stopAudioRecording=true;
		// change this to some mutex thing
	}
	catch {}
})();
