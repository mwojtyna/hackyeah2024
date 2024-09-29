import fs from "fs";
import os from "node:os";
import path from "path";
import { WaveFile } from "wavefile";
import { PvRecorder } from "@picovoice/pvrecorder-node";
import { Mutex } from "async-mutex";

var recording_mutex = new Mutex();

async function record() {
    const frames = [];
    const framelength = 512;
    //console.log(PvRecorder.getAvailableDevices());
    const wav = new WaveFile();
    console.log();
    const recorder = new PvRecorder(framelength, -1);
    recorder.start();

    while (recording_mutex.isLocked()) {
        const frame = await recorder.read();
        frames.push(frame);
    }

    recorder.stop();

    console.log("stopped recording");

    const audiodata = new Int16Array(recorder.frameLength * frames.length);
    for (let i = 0; i < frames.length; i++) {
        audiodata.set(frames[i], i * recorder.frameLength);
    }

    wav.fromScratch(1, recorder.sampleRate, "16", audiodata);
    var filename = path.join(os.tmpdir(), `recordedAudio.wav`);
    fs.writeFileSync(filename, wav.toBuffer());
    recorder.release();
}

export async function record_audio() {
    if (recording_mutex.isLocked()) {
        recording_mutex.release();
    } else {
        try {
            recording_mutex.acquire();
            record();
        } catch {}
    }
}
