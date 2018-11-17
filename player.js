// variables declarations
let audio,dir,playlist,playlist_index,title,stopBtn,playBtn,pauseBtn,DurTime,CurTime,poster,
position,imgDir,images,images_index,imgExt,fillbar,previousBtn,nextBtn,audioVolume,
volumeHigh,volumeOff,bgImage;

playlist = document.getElementById('playlist');
title = document.getElementById('title');
stopBtn = document.getElementById('stopBtn');
playBtn = document.getElementById('playBtn');
pauseBtn = document.getElementById('pauseBtn');
DurTime = document.getElementById('audio-duration');
CurTime = document.getElementById('audio-currenttime');
poster = document.getElementById('player-cover');
fillbar = document.getElementById('fillbar');
trackbar = document.getElementById('trackbar');
previousBtn = document.getElementById('previousBtn');
nextBtn = document.getElementById('nextBtn');
bgImage = document.getElementById('bg-image');

// volume references
audioVolume = document.getElementById('volume');
volumeHigh = document.getElementById('volume-high');
volumeLow = document.getElementById('volume-low');
volumeOff = document.getElementById('volume-off');


// Audio initialization

function initAudio(){
audio = new Audio();
dir ='songs/';
playlist_index = 0;
audio.src = dir+playlist[playlist_index].value;
title.innerHTML = playlist[playlist_index].value;
playlist.value = playlist[playlist_index].value;


// Image changes on new track playing
imgDir = 'images/';
imgExt = '.jpg';
images = ['firstimage','secondimage','thirdimage'];
images_index = 0;
// poster.src = imgDir+images[images_index]+imgExt;


// Event handling when clicling on each track
playlist.addEventListener('click',function(){
    audio.src = dir+this.value;
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    title.innerHTML = this.value;
    this.style.color = 'red';

    if(images_index === images.length-1){
        images_index = 0
    }else{
        images_index++;
    }
    bgImage.src = imgDir+images[images_index]+imgExt;
    poster.src = imgDir+images[images_index]+imgExt;
  
})

// buttons functionalities

playBtn.addEventListener('click',function(){
        audio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        playlist.style.color = 'red';
   
})

pauseBtn.addEventListener('click',function(){
        audio.pause();
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        playlist.style.color = 'black';
   
})

stopBtn.addEventListener('click',function(){
    audio.pause();
    audio.currentTime = 0;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
})

nextBtn.addEventListener('click',function(){
    if(playlist_index === playlist.length-1){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    
    // changing images on nextBtn click
    if(images_index === images.length-1){
        images_index = 0
    }else{
        images_index++;
    }

   audio.src = dir+playlist[playlist_index].value;
   audio.play();
   playBtn.style.display = 'none';
   pauseBtn.style.display = 'inline-block';
   title.innerHTML = playlist[playlist_index].value;
   playlist.value = playlist[playlist_index].value;
   poster.src = imgDir+images[images_index]+imgExt;
   bgImage.src = imgDir+images[images_index]+imgExt;
   playlist.style.color = 'red';
})

previousBtn.addEventListener('click',function(){
    if(playlist_index === 0){
        playlist_index = playlist.length-1;
    }else{
        playlist_index--;
    }

    // changing images on previousBtn click
    if(images_index === 0){
        images_index = images.length-1;
    }else{
        images_index--;
    }

   audio.src = dir+playlist[playlist_index].value;
   audio.play();
   playBtn.style.display = 'none';
   pauseBtn.style.display = 'inline-block';
   title.innerHTML = playlist[playlist_index].value;
   playlist.value = playlist[playlist_index].value;
   poster.src = imgDir+images[images_index]+imgExt;
   bgImage.src = imgDir+images[images_index]+imgExt;
   playlist.style.color = 'red';
})


// volume functionality
audioVolume.addEventListener('mousemove',function(){
    audio.volume = this.value / 100;
})

volumeHigh.addEventListener('click',function(){
    audio.muted = true;
    volumeHigh.style.display = 'none';
    volumeOff.style.display = 'inline-block';
})

volumeOff.addEventListener('click',function(){
    audio.muted = false;
    volumeHigh.style.display = 'inline-block';
    volumeOff.style.display = 'none';
})





// Time update
audio.addEventListener('timeupdate',function(){
    
    // Full Audio Duration
    if(audio.readyState > 0){
        let minutes = parseInt((audio.duration / 60 ) % 60);
        let seconds = parseInt(audio.duration % 60);
  
       if(seconds<10){
       seconds = '0'+ seconds
     } 
  
     if(minutes<10){
      minutes = '0'+ minutes
    }
     DurTime.innerHTML = minutes + ':' + seconds ;
    }
    
    //Audio Current Time update
    if(audio.readyState > 0){
        let minutes = parseInt((audio.currentTime / 60 ) % 60);
        let seconds = parseInt(audio.currentTime % 60);
  
        
    
       if(seconds<10){
       seconds = '0'+ seconds
     } 
  
     if(minutes<10){
      minutes = '0'+ minutes
    }
    CurTime.innerHTML = minutes + ':' + seconds ;
    }

    // Fillbar on timeUpdate
    position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + '%';

   });

 
    
  // updating the currentTime and the fillbar on click
   
    // trackbar.addEventListener("click", seek);

    // function seek(e) {
    //   let percent = e.offsetX / this.offsetWidth;
    //   audio.currentTime = percent * audio.duration;
    //     fillbar.value = percent / 100;
    // }

    trackbar.addEventListener("click",function(e){
        let percent = e.offsetX / this.offsetWidth;
      audio.currentTime = percent * audio.duration;
        fillbar.value = percent / 100;
    });

    




   // Automatically play the next song when current song ends
   audio.addEventListener('ended', function(){
    if(playlist_index === playlist.length-1){
        playlist_index = 0;
        
    }else{
     playlist_index++;
    };

    if(images_index === images.length-1){
       images_index = 0;
        
    }else{
     images_index++;
    }

    audio.src = dir+playlist[playlist_index].value;
        audio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        title.innerHTML = playlist[playlist_index].value;
        poster.src = imgDir+images[images_index]+imgExt;
        bgImage.src = imgDir+images[images_index]+imgExt;
        playlist.value = playlist[playlist_index].value;
   
})


};


window.addEventListener('load', initAudio);