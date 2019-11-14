"use strict";
// specifies the elements to capture
var mediaConstraints = {
    video: true,
    audio: true
};
// UI elements
var localVideoBox = document.querySelector('video');
var startButton = document.getElementById('startButton');
var callButton = document.getElementById('callButton');
var hangButton = document.getElementById('hangButton');
startButton.addEventListener('click', onStart);
function onStart() {
    startButton.disabled = true;
    log("Capturing local stream", "debug");
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(gotLocalMediaStream).catch(localMediaError);
}
var localStream;
var localPeerConnection;
// optional configuration for TURN and STUN servers
var servers = undefined;
// creating a connection and handling events
localPeerConnection = new RTCPeerConnection(servers);
//localPeerConnection.addEventListener('icecandidate', handleConnection);
//localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);
// Accessing the camera and/or mic
function gotLocalMediaStream(mediaStream) {
    if (!!localVideoBox) {
        localStream = mediaStream;
        localVideoBox.srcObject = mediaStream;
        log("Captured local stream", "debug");
        if (callButton) {
            callButton.disabled = false; // Enable call button.
        }
    }
    else {
        log("No video element detected", "warn");
    }
}
function localMediaError(e) {
    log("Cannot create a local video stream " + e.toString);
}
function log(text, level) {
    var now = (window.performance.now() / 1000).toFixed(3);
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
//# sourceMappingURL=main.js.map