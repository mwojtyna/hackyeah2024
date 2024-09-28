const fs = require("fs");
const { WaveFile } = require("wavefile");
const { PvRecorder } = require("@picovoice/pvrecorder-node");

const Mutex = require('async-mutex').Mutex;
const { program } = require("commander");

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

var recording_mutex = new Mutex();

async function record() {
	const frames = [];
	const framelength = 512;
	//console.log(PvRecorder.getAvailableDevices());
	const wav = new WaveFile();
	console.log()
	const recorder = new PvRecorder(framelength, -1);
	recorder.start()

	while(recording_mutex.isLocked()) {
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
		recording_mutex.acquire();
		record();
		await sleep(5000); // replace with user action
		recording_mutex.release();
	}
	catch {}
})();
