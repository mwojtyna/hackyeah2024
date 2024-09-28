const fs = require("fs");
const { WaveFile } = require("wavefile");
const { PvRecorder } = require("@picovoice/pvrecorder-node");

let stop = false;
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

async function record() {
	let outputpath = "audio.wav";

	const wav = new WaveFile();
	const frames = [];
	const framelength = 512;

	const recorder = new PvRecorder(framelength, 1);

	while(!stop) {
		const frame = await recorder.read();
		frames.push(frame);
	}

	const audiodata = new Int16Array(recorder.frameLength * frames.length);
	for (let i = 0; i < frames.length; i++) {
		audiodata.set(frames[i], i*recorder.frameLength);
	}
	wav.fromScratch(1,recorder.sampleRate, '16', audioData);
	fs.writeFileSync(outputpath, wav.tobuffer());

	recorder.release();
}

record();

sleep(5000);

stop=true;

