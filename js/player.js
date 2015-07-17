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
         url: 'Music/FloatAway.mp3',

         onfinish: function() {
            $('.play').removeClass('fa-pause');
            $('.play').addClass('fa-play');
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
     $('.play').removeClass('fa-play');
     $('.play').addClass('fa-pause');
   } else {
     audio.pause();
     this.classList.remove('is-playing');
     $('.play').removeClass('fa-pause');
     $('.play').addClass('fa-play');
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


