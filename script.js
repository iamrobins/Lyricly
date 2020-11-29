import Lyricly from './Api.js';
const LyriclyApi = new Lyricly();

// player
const music = document.querySelector('.music-element')
const playBtn = document.querySelector('.play')
const seekbar = document.querySelector('.seekbar')
const currentTime = document.querySelector('.current-time')
const duration = document.querySelector('.duration')

//info
const mic = document.querySelector('#mic');
const listen = document.querySelector('#listen');
const retry = document.querySelector('#retry');
const cover = document.querySelector('#coverImg');
const info = document.querySelector('.title');


//Speech Result
const resultOptions = document.querySelector('#resultOptions');
const speechResult = document.querySelector('#speechResult');
const successYes = document.querySelector('#yes');
const successNo = document.querySelector('#no');


//Spech Recognition Starts
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.lang = 'en-US';

let sucessfulSpeech = false;

recognition.onstart = function () { //On Start, Dont Show = {MIC, FailedSpeech, ResultOptions} and Show = {Searching}
    console.log('voices activated');
    mic.style.display = 'none';
    retry.style.display = 'none';
    resultOptions.style.display = 'none';
    listen.style.display = 'block';
}

let songDetailsObj = {};
let transcript = '';

recognition.onresult = function (event) { //On Results, Dont Show = {Searching} and Show = {ResultOptions}
    transcript = event.results[0][0].transcript;
    console.log(transcript);
    speechResult.textContent = transcript;

    sucessfulSpeech = true;
    listen.style.display = 'none';
    resultOptions.style.display = 'block';
    mic.style.display = 'block';
}


recognition.onend = function() { //On Recognition End, Dont Show = {Searching} and if user didn't speak anything only then Show = {FailedSpeech}
    if(!sucessfulSpeech) { //false
        listen.style.display = 'none';
        retry.style.display = 'block'; //display retry option
    }
}


mic.addEventListener('click', () => {
    recognition.start();
})

retry.addEventListener('click', () => {
    recognition.start();
})

successNo.addEventListener('click', () => {
    sucessfulSpeech = false; //setting false because the user felt its not his/her successful speech
    LyriclyApi.deleteSong(songDetailsObj.songId);
    recognition.start();
})

successYes.addEventListener('click', async () => {
    songDetailsObj = await LyriclyApi.fetchSpeech(transcript);
    resultOptions.style.display = 'none';
    cover.src = songDetailsObj.image;
    info.textContent = songDetailsObj.title;
    console.log('Clicked Right Now');
    playAudio(songDetailsObj);
})

function playAudio(songDetailsObj) {
    music.src = `https://lyricly.herokuapp.com/play/${songDetailsObj.songId}`;
    music.load();
}

playBtn.addEventListener('click', () => handlePlay());
seekbar.addEventListener('input', () => handleSeekBar());

//player code
const handlePlay = function () {
  if (music.paused) {
    music.play();
    playBtn.className = "pause";
    playBtn.innerHTML = '<i class="material-icons">pause</i>';
  } else {
    music.pause();
    playBtn.className = "play";
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
  }
  music.addEventListener("ended", function () {
    playBtn.className = "play";
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
    music.currentTime = 0;
  });
}
  
music.onloadeddata = function () {
  seekbar.max = music.duration;
  let ds = parseInt(music.duration % 60);
  let dm = parseInt((music.duration / 60) % 60);
  duration.innerHTML = dm + ":" + ds;
};


music.ontimeupdate = function () {
  seekbar.value = music.currentTime;
};


const handleSeekBar = function () {
  music.currentTime = seekbar.value;
};


music.addEventListener(
  "timeupdate",
  function () {
    let cs = parseInt(music.currentTime % 60);
    let cm = parseInt((music.currentTime / 60) % 60);
    currentTime.innerHTML = cm + ":" + cs;
  },
  false
);

const volumeRange = document.querySelector(".volume-range");
const volumeDown = document.querySelector(".volume-down");
const volumeUp = document.querySelector(".volume-up");
  
volumeRange.addEventListener('input', () => {
  music.volume = volumeRange.value / 100;
})

volumeDown.addEventListener("click", handleVolumeDown);
volumeUp.addEventListener("click", handleVolumeUp);
  
function handleVolumeDown() {
  volumeRange.value = Number(volumeRange.value) - 20;
  music.volume = volumeRange.value / 100;
}

function handleVolumeUp() {
  volumeRange.value = Number(volumeRange.value) + 20;
  music.volume = volumeRange.value / 100;
}
  