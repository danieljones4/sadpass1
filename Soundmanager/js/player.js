function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
}

function formatMilliseconds(milliseconds) {

   return milliseconds;
}

var player = {
   btnPlay: document.querySelector('.player__play'),
   btnStop: document.querySelector('.player__stop'),
   btnPrevious: document.querySelector('.player__previous'),
   btnNext: document.querySelector('.player__next'),
   btnVolumeDown: document.querySelector('.player__volume-down'),
   btnVolumeUp: document.querySelector('.player__volume-up'),
   timeElapsed: document.querySelector('.player__time-elapsed'),
   timeTotal: document.querySelector('.player__time-total'),
   volume: document.querySelector('.player__volume-info')
};
var audio = null;

soundManager.setup({
   useFastPolling: true,
   useHighPerformance: true,
   onready: function() {
      audio = soundManager.createSound({
         id: 'audio',
         url: '../Music/MoveOn.mp3',
         whileloading: function() {
            player.timeTotal.textContent = formatMilliseconds(audio.durationEstimate);
         },
         whileplaying: function() {
            player.timeElapsed.textContent = formatMilliseconds(audio.position);
         },
         onload: function() {
            player.timeTotal.textContent = formatMilliseconds(audio.duration);
         },
         onfinish: function() {
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
   } else {
     audio.pause();
     this.classList.remove('is-playing');
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