var player = {
   btnPlay: document.querySelector('.player__play'),
   btnStop: document.querySelector('.player__stop'),
};
var audio = null;

soundManager.setup({
   useFastPolling: true,
   useHighPerformance: true,
   onready: function() {
      audio = soundManager.createSound({
         id: 'audio',
         url: '../Music/MoveOn.mp3',

         onfinish: function() {
            $('.fa').removeClass('fa-pause');
            $('.fa').addClass('fa-play');
            var event;
            try {
               // Internet Explorer doesn't like this statement
               event = new Event('click');
            } catch (ex) {
               event = document.createEvent('MouseEvent');
               event.initEvent('click', true, false);
            }
            player.btnStop.dispatchEvent(event);
         }
      });
   }
});

player.btnPlay.addEventListener('click', function() {
   if (audio === null) {
     return;
   }
   
   if (audio.playState === 0 || audio.paused === true) {
     audio.play();
     this.classList.add('is-playing');
     $('.fa').removeClass('fa-play');
     $('.fa').addClass('fa-pause');
   } else {
     audio.pause();
     this.classList.remove('is-playing');
     $('.fa').removeClass('fa-pause');
     $('.fa').addClass('fa-play');
   }
});

player.btnStop.addEventListener('click', function() {
   if (audio === null) {
     return;
   }

   audio.stop();
   document.querySelector('.player__time-elapsed').textContent = formatMilliseconds(0);
   player.btnPlay.classList.remove('is-playing');
});

player.btnVolumeDown.addEventListener('click', function() {
   if (audio === null) {
     return;
   }

   var volume = audio.volume - 10 < 0 ? 0 : audio.volume - 10;
   audio.setVolume(volume);
   player.volume.textContent = volume;
});

player.btnVolumeUp.addEventListener('click', function() {
   if (audio === null) {
     return;
   }

   var volume = audio.volume + 10 > 100 ? 100 : audio.volume + 10;
   audio.setVolume(volume);
   player.volume.textContent = volume;
});

player.btnPrevious.addEventListener('click', function() {
   if (audio === null) {
     return;
   }

   var position = audio.position - 30000 < 0 ? 0 : audio.position - 30000;
   audio.setPosition(position);
   player.timeElapsed.textContent = formatMilliseconds(audio.position);
});

player.btnNext.addEventListener('click', function() {
   if (audio === null) {
     return;
   }

   var position = audio.position + 30000 > audio.duration ? audio.duration : audio.position + 30000;
   if (position === audio.duration) {
      var event;
      try {
         // Internet Explorer doesn't like this statement
         event = new Event('click');
      } catch (ex) {
         event = document.createEvent('MouseEvent');
         event.initEvent('click', true, false);
      }
      player.btnStop.dispatchEvent(event);
   } else {
      audio.setPosition(position);
      player.timeElapsed.textContent = formatMilliseconds(audio.position);   
   }
});