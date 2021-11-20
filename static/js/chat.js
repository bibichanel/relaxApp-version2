var audio = {
    init: function () {
        var $that = this;
        $(function () {
            $that.components.media();
        });
    },
    components: {
        media: function (target) {
            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');
            if (media.length) {
                media.mediaelementplayer({
                    audioHeight: 100,
                    features: ['volume'],
                    alwaysShowControls: true,
                    iPadUseNativeControls: true,
                    iPhoneUseNativeControls: true,
                    AndroidUseNativeControls: true
                });                
            }
        },
    },
};
audio.init();

let myAudio = document.getElementById("myAudio");
let isPlaying = true;

myAudio.onplaying = function() {
  isPlaying = true;
};

myAudio.onpause = function() {
  isPlaying = false;
};

document.getElementById("pause-btn").addEventListener("click", function() {    
    myAudio.pause();

    document.getElementById("pause-btn").style.setProperty("display", "none");
    document.getElementById("play-btn").style.setProperty("display", "var(--fa-display,inline-block)");
});

document.getElementById("play-btn").addEventListener("click", function() {    
    myAudio.play();

    document.getElementById("play-btn").style.setProperty("display", "none");
    document.getElementById("pause-btn").style.setProperty("display", "var(--fa-display,inline-block)");    
});



// $("#volume").slider({
//     min: 0,
//     max: 100,
//     value: 100,
//         range: "min",
//     slide: function(event, ui) {
//         setVolume(ui.value / 100);
//     }
// });

// function setVolume(myVolume) {
//     var myAudio = document.getElementById('myAudio');
//     myAudio.volume = myVolume;
// }

