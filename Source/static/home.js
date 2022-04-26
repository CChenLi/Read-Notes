lesson = { // get this from server
    "board": "/static/images/ht",
    "audio_order": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
    ],
    "audio_path": "/static/audio/ht"
}

var recent_key = "Q"
var nums = ["1","2","3","4","5","6","7"]
var num2key = {
    "1": "C",
    "2": "D",
    "3": "E",
    "4": "F",
    "5": "G",
    "6": "A",
    "7": "B"
}

function update_board() {
    var board_path = lesson.board + "/" + recent_key.toLocaleLowerCase() + ".png"
    var board = $("<img class='broad-img'>")
    board.attr('src', board_path)
    $("#board").empty()
    $("#board").append(board)
}

function play_key(key) {
    var audio_path = lesson.audio_path[key]
    const audio = new Audio(audio_path);
    audio.play();
    recent_key = key
    update_board()
}

function play_key(key) {
    var audio_path = lesson.audio_path + "/" + key + ".MP3"
    const audio = new Audio(audio_path);
    audio.play();
    recent_key = key
    update_board()
}

function load_key() {
    $(document).keydown(function (e) {
        var key = e.key.toUpperCase();
        if (nums.includes(key)) {
            key = num2key[key]
        }
        console.log(key)
        if (lesson.audio_order.includes(key)) {
            play_key(key)
        }
    })
}

$(document).ready(function(){
    update_board()
    load_key()
    $('#lesson').click(function(event) {
        window.location = "/lesson"
        console.log('aaa')
        event.preventDefault();
    })
})

$(document).ready(function(){
    $('#quiz').click(function() {
        window.location = "/quiz/1";
    })
})