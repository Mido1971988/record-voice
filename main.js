let constraintObj = { 
    audio: true, 
    video: false
};

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) { 
    let start = document.getElementById('btnStart');
    let stop = document.getElementById('btnStop');
    let output = document.getElementById("output")
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let singleBlob;
    
    start.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "inactive"){
            mediaRecorder.start();
        }
    })
    stop.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "recording" ){
            mediaRecorder.stop();
        }
    });
    mediaRecorder.ondataavailable = function(ev) { 
        singleBlob = ev.data
    }

    mediaRecorder.onstop = (ev)=>{
        let audioURL = window.URL.createObjectURL(singleBlob);
        let audioEl = document.createElement("audio") 
        audioEl.setAttribute("controls","")
        audioEl.src = audioURL;
        output.appendChild(audioEl)
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});