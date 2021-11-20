
// ----------------------------------Music-------------------------------------
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

//-------------------------------------------Chat--------------------------------------------

function scrollToBottom(){
    let objDiv = document.getElementById("chat-messages");
    objDiv.scrollTop = objDiv.scrollHeight;
};
scrollToBottom();

const _roomName = JSON.parse(document.getElementById('json-roomname').textContent);
const _username = JSON.parse(document.getElementById('json-username').textContent);
const _nickname = JSON.parse(document.getElementById('json-nickname').textContent);


const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + _roomName
    + '/'
);
chatSocket.onmessage = function(e){
    console.log('onmessage');

    const data = JSON.parse(e.data);

    let string_of_html_messager = null;
    if(data.message){
        if(data.nickname == _nickname){
            string_of_html_messager =
            `
            <div class="massage-outgoing">
                <div class="container-name-detail">
                    <div class="name-user"><p>`+data.nickname+`</p></div>
                    <div class="detail-outgoing" ><p>`+data.message+`</p></div>
                </div>
                <div class="icon-user-name">
                    <i class="far fa-user"></i>
                </div>
            </div>
            `;
        } else{
            string_of_html_messager =
            `
            <div class="message-incoming">
                <div class="icon-user-name">
                    <i class="far fa-user"></i>
                </div>
                <div class="container-name-detail">
                    <div class="name-user"><p>`+data.nickname+`</p></div>
                    <div class="detail-incoming"><p>`+data.message+`</p></div>
                </div>
            </div>
            `;
        }

        document.querySelector('#chat-messages').innerHTML += string_of_html_messager;
    }
    else{
        alert('The message is empty!');
    }
    scrollToBottom();
};
chatSocket.onclose = function(e) {
    console.log('The socket close');
}
// document.querySelector('#chat-massager-input').onkeyup = function(e) {
//     if (e.keyCode === 13) {
//             document.querySelector('#chat-massager-submit').click();
//         }
// };
function keyEnterMessager(e){
    if(e.key === "Enter"){
        document.querySelector('#chat-massager-submit').click();
    }
};
document.querySelector('#chat-massager-submit').onclick = function(e){
    const messageInputDom = document.querySelector('#chat-massager-input');
    const message = messageInputDom.value;

    chatSocket.send(JSON.stringify({
        'message': message,
        'username': _username,
        'room': _roomName,
        'nickname' : _nickname
    }));

    messageInputDom.value = ''
};

//-------------------------------------------Choose name--------------------------------------------
//-------------------------------------------image--------------------------------------------