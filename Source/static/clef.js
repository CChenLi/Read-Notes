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

function play_key(key) {
    var audio_path = lesson.audio_path[key]
    const audio = new Audio(audio_path);
    audio.play();
    recent_key = key
    $("#players").empty()
    load_player()
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

function load_player() {
    var player_pad = $("<div id='player-pad'>")
    $("#players").append(player_pad)
    lesson.audio_order.forEach(element => {
        var player = $("<div class='player'>")
        console.log(recent_key)
        player.click(function() {
            play_key(element)
        });
        if (element == recent_key) {
            var play_button = $("<img src='/static/images/play-button2.png' class='lesson-img'>")
        } else {
            var play_button = $("<img src='/static/images/play-button.png' class='lesson-img'>")
        }
        player.append(play_button)
        $("#players").append(player)
    });
}

$(document).ready(function(){
    id= parseInt(id)
    load_player()
    load_key()
    if (id > 1){
        var prev = $('<button type = "button" class = "btn btn-light rightmargin" id = "prev"> Prev </button>')
        $(prev).on( "click", function(event) {
            event.preventDefault();
            window.location = "/lesson/clef/" + (parseInt(id) - 1)
        })
        $("#button").append(prev)
    }
    if (id == 3){
        var next = $('<button type = "button" class = "btn btn-light" id = "back"> Back </button>')
        $(next).on( "click", function(event) {
            event.preventDefault();
            window.location = "/lesson"
        })
    }
    else{
        var next = $('<button type = "button" class = "btn btn-light" id = "next"> Next </button>')
        $(next).on( "click", function(event) {
            event.preventDefault();
            window.location = "/lesson/clef/" + (parseInt(id) + 1)
        })
    }
    
    $("#button").append(next)
})



