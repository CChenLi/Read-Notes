var recent_key = "Q"
var nums = ["1", "2", "3", "4", "5", "6", "7"]
var audio_order = ["C", "D", "E", "F", "G", "A", "B",]
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
  var board_path = "/static/images/" + quiz.range + "/" + recent_key.toLocaleLowerCase() + ".png"
  var board = $("<img class='broad-img'>")
  board.attr('src', board_path)
  $("#board").empty()
  $("#board").append(board)
}

function play_key(key) {
  var audio_path = "/static/audio/" + quiz.range + "/" + key + ".MP3"
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
    if (audio_order.includes(key)) {
      play_key(key)
    }
  })
}

function register_enter_audio(id, key) {
  var botton_id = "#option" + id
  console.log(botton_id)
  $(botton_id).mouseenter(function () {
    console.log("enter", key)
    play_key(key)
  })
}

function ender_audio() {
  for (const d in quiz.option) {
    register_enter_audio(d, quiz.option[d])
  }
}

function register_option(choice, next) {
  var botton_id = "#option" + choice
  $(botton_id).click(function () {
    if (flag == true) {
      flag = false
      if (quiz.answer == choice) {
        var review = $('<div id = "right"> Right choice! </div>')
        send_right(1, id)
      } else {
        var review = $('<div id = "wrong"> Wrong choice! This is ' + quiz.option[quiz.answer] + '</div>')
        send_right(0, id)
      }
      $("#review").append(review)
      $("#quizbutton").append(next)
    }

  });
}

$(document).ready(function () {
  load_key()
  update_board()
  ender_audio()
  flag = true
  id = parseInt(id)
  if (id == 10) {
    var next = $('<button type = "button" class = "btn btn-light" id = "back"> Back </button>')
    $(next).on("click", function (event) {
      clear_score()
      event.preventDefault();
      window.location = "/"
    })
  }
  else {
    if (id == 1) {
      clear_score()
    }
    var next = $('<button type = "button" class = "btn btn-light" id = "next"> Next </button>')
    $(next).on("click", function (event) {
      event.preventDefault();
      window.location = "/quiz/" + (parseInt(id) + 1)
    })
  }

  register_option("A", next)
  register_option("B", next)
  register_option("C", next)
  register_option("D", next)

})

function send_right(x, id) {
  $.ajax({
    type: "POST",
    url: "add_right",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "right": x,
      "id": id
    }),
    success: function (result) {
      show_result(result["result"])
    },
    error: function (request, status, error) {
      console.log('error')
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}

function clear_score() {
  $.ajax({
    type: "POST",
    url: "add_right",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "right": 400,
      "id": -1
    }),
    error: function (request, status, error) {
      console.log('error')
      console.log(request)
      console.log(status)
      console.log(error)
    }

  })
}

function show_result(right) {
  if (id == 10) {
    var score = $('<div id = "score"> Your Final score: ' + right.reduce((partialSum, a) => partialSum + a, 0) + '/10</div>')
    $("#totalscore").append(score)
  }
}