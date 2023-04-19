const activeVideo = document.getElementById('videoLink');
activeVideo.classList.add('active');

if (!localStorage.username) {
    location.replace('/');
}

let videoCall = document.getElementById('videoCall');
let endCall = document.getElementById('endCall');
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');

function initiateCall() {
    endCall.removeAttribute('disabled');
    console.log("Starting video call");
}

function pageReady() {
    if (navigator.getUserMedia) {
        videoCall.removeAttribute('disabled');
        videoCall.addEventListener('click', initiateCall);
        endCall.addEventListener('click', e => {
            wsc.send(JSON.stringify({ "closeConnection": true }));
        });
    }
    else {
        document.getElementById('videoCall').value = "Sorry, your browser does not support WebRTC!";
    }
}


window.addEventListener('load', pageReady);