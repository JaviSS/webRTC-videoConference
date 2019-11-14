// specifies the elements to capture
const mediaConstraints: MediaStreamConstraints = {
    video: true,
    audio: true
};


// UI elements
const localVideoBox = <HTMLVideoElement>document.querySelector('video');
const startButton = <HTMLButtonElement>document.getElementById('startButton');
const callButton = <HTMLButtonElement>document.getElementById('callButton');
const hangButton = <HTMLButtonElement>document.getElementById('hangButton');

let startTime;
let localStream: MediaStream;
let localPeerConnection;

startButton.addEventListener('click', onStart);
callButton.addEventListener('click', onCall);


function onStart() {
    startButton.disabled = true;
    log("Capturing local stream", "debug");
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(gotLocalMediaStream).catch(localMediaError);

}


function onCall() {

    callButton.disabled = true;
    hangButton.disabled = false;

    log("Starting call", "info");

    startTime = window.performance.now();


    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();

    if (videoTracks.length > 0) {
        log(`Using video device: ${videoTracks[0].label}`, "info");
    }

    if (audioTracks.length > 0) {
        log(`Using audio device: ${audioTracks[0].label}.`, "info");
    }

    const servers = null;  // Allows for RTC server configuration.


}


// optional configuration for TURN and STUN servers
const servers: RTCConfiguration | undefined = undefined;

// creating a connection and handling events
localPeerConnection = new RTCPeerConnection(servers);
//localPeerConnection.addEventListener('icecandidate', handleConnection);
//localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);


// Accessing the camera and/or mic
function gotLocalMediaStream(mediaStream: MediaStream) {

    if (!!localVideoBox) {
        localStream = mediaStream;
        localVideoBox.srcObject = mediaStream;
        log("Captured local stream", "debug");
        if (callButton) {
            (<HTMLButtonElement>callButton).disabled = false;  // Enable call button.
        }
    } else {
        log("No video element detected", "warn");
    }

}

function localMediaError(e: Error) {
    log(`Cannot create a local video stream ${e.toString}`);
}


function log(text: string, level?: string) {
    const now = (window.performance.now() / 1000).toFixed(3);
    switch (level) {
        case "warn": {
            console.warn(now, " - " + text);
            break;
        }
        case "error": {
            console.error(now, " - " + text);
            break;
        }
        case "debug": {
            console.debug(now, " - " + text);
            break;
        }
        default: {
            console.log(now, " - " + text);
            break;
        }
    }
}