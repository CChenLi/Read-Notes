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

function after_chose(quiz, right, next) {
  var chosen = quiz["chosen"]
  var answer = quiz["answer"]
  if (chosen == answer) {
    var review = $('<div id = "right"> Right choice! </div>')
  } else {
    var review = $('<div id = "wrong"> Wrong choice! This is ' + quiz.option[quiz.answer] + '</div>')
  }
  $("#review").append(review)
  $("#quizbutton").append(next)
  $("#optionA").off('click')
  $("#optionB").off('click')
  $("#optionC").off('click')
  $("#optionD").off('click')

  bin_row(right)
}

function send_right(x, id, next) {
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
      show_result(result.result)
      after_chose(result.quiz, result.result, next)
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
      "right": "clear",
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
    var score_value = right.reduce((partialSum, a) => partialSum + Math.max(a, 0), 0)
    var score_main = $("<span class='score-main'>")
    score_main.html(score_value)
    var score_text = $("<div>Final score:</div>")
    var score_sub = $("<span>/10</span>")
    var total_score_content = $("<div class='totalscore-content'>")
    total_score_content.append(score_text)
    total_score_content.append(score_main)
    total_score_content.append(score_sub)
    $("#totalscore").append(total_score_content)
  }
}

function update_key_color(chosen, answer) {
  var chosen_key = "#option" + chosen
  var true_key = "#option" + answer
  $(chosen_key).addClass("red")
  $(true_key).removeClass("red")
  $(true_key).addClass("green")
}

function register_single_option(key, id, next, answer) {
  var botton_id = "#option" + key
  var true_key = "#option" + answer
  $(botton_id).click(function () {
    send_right(key, id, next)
    $(botton_id).addClass("red")
    $(true_key).removeClass("red")
    $(true_key).addClass("green")
  });
}

function register_option(quiz, id, next, right) {
  console.log(quiz)
  var chosen = quiz["chosen"]
  var answer = quiz["answer"]
  var ediable = (chosen == "Q")
  if (ediable) {
    register_single_option("A", id, next, answer)
    register_single_option("B", id, next, answer)
    register_single_option("C", id, next, answer)
    register_single_option("D", id, next, answer)
  } else {
    if (chosen == answer) {
      var review = $('<div id = "right"> Right choice! </div>')
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is ' + quiz.option[quiz.answer] + '</div>')
    }
    update_key_color(chosen, answer)
    $("#review").append(review)
    $("#quizbutton").append(next)
    if (id == 10) {
      show_result(right)
    }
  }
}

function bin_row(right) {
  $("#bin-row").empty()
  right.forEach(function(value, idx) {
    var bin = $("<div class='bin'>")
    if (value == 1) {
      bin.addClass("green")
    } else if (value == 0) {
      bin.addClass("red")
    }
    bin.click(function() {
      window.location = "/quiz/" + (parseInt(idx) + 1)
    })
    console.log("/quiz/" + (parseInt(idx) + 1))
    $("#bin-row").append(bin)
  })
}

$(document).ready(function () {
  load_key()
  update_board()
  ender_audio()
  id = parseInt(id)
  bin_row(right)
  if (id == 10) {
    var next = $('<button type = "button" class = "btn btn-next" id = "back"> Clear Scores </button>')
    $(next).on("click", function (event) {
      clear_score()
      event.preventDefault();
      window.location = "/"
    })
  }
  else {
    var next = $('<button type = "button" class = "btn btn-next" id = "next"> Next </button>')
    $(next).on("click", function (event) {
      event.preventDefault();
      window.location = "/quiz/" + (parseInt(id) + 1)
    })
  }

  register_option(quiz, id, next, right)

})
