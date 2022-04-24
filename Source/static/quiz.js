$(document).ready(function(){
  id = parseInt(id)
  right = parseInt(right)
  if (id == 5){
    var next = $('<button type = "button" class = "btn btn-light" id = "back"> Back </button>')
    $(next).on( "click", function(event) {
        clear_score()
        event.preventDefault();
        window.location = "/"
    })
}
  else{
      var next = $('<button type = "button" class = "btn btn-light" id = "next"> Next </button>')
      $(next).on( "click", function(event) {
          event.preventDefault();
          window.location = "/quiz/" + (parseInt(id) + 1)
      })
  }
  
  $("#optionA").click(function() {
    if (quiz.answer == "A") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right(1)
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
      send_right(0)
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
  });
  $("#optionB").click(function() {
    if (quiz.answer == "B") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right(1)
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
      send_right(0)
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
  });
  $("#optionC").click(function() {
    if (quiz.answer == "C") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right(1)
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
      send_right(0)
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
  });
  $("#optionD").click(function() {
    if (quiz.answer == "D") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right(1)
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
      send_right(0)
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
  });

  
})

function send_right(x){
  let ip
  $.getJSON("https://api.ipify.org/?format=json", function(e) {
        console.log(e.ip);
        ip = e.ip
        });
  $.ajax({
    type: "POST",
    url: "add_right",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "right": x, "ip": ip}),
    success: function(result){
      show_result(result["result"])
    },
    error: function(request, status, error){
      console.log('error')
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
  console.log(ip)
}

function clear_score(){
  $.ajax({
    type: "POST",
    url: "add_right",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "right": -1}),
    error: function(request, status, error){
      console.log('error')
      console.log(request)
      console.log(status)
      console.log(error)
    }

  })
}

function show_result(right){
  if (id == 5) {
    var score = $('<div id = "score"> Final score: '+ right+'/5</div>')
    $("#totalscore").append(score)
  }
}