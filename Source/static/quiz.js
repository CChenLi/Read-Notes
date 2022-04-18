$(document).ready(function(){
  id = parseInt(id)
  right = parseInt(right)
  if (id == 5){
    var next = $('<button type = "button" class = "btn btn-light" id = "back"> Back </button>')
    $(next).on( "click", function(event) {
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
      send_right()
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
    if (id == 5) {
      var score = $('<div id = "score"> Final score: '+ right+'/5</div>')
      $("#totalscore").append(score)
    }
  });
  $("#optionB").click(function() {
    if (quiz.answer == "B") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right()
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
    if (id == 5) {
      var score = $('<div id = "score"> Final score: '+ right+'/5</div>')
      $("#totalscore").append(score)
    }
  });
  $("#optionC").click(function() {
    if (quiz.answer == "C") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right()
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
    if (id == 5) {
      var score = $('<div id = "score"> Final score: '+ right+'/5</div>')
      $("#totalscore").append(score)
    }
  });
  $("#optionD").click(function() {
    if (quiz.answer == "D") {
      var review = $('<div id = "right"> Right choice! </div>')
      send_right()
    } else {
      var review = $('<div id = "wrong"> Wrong choice! This is '+ quiz.option[quiz.answer] + '</div>')
    }
    $("#review").append(review)
    $("#quizbutton").append(next)
    if (id == 5) {
      var score = $('<div id = "score"> Final score: '+ right+'/5</div>')
      $("#totalscore").append(score)
    }
  });

  
})

function send_right(){
  $.ajax({
    type: "POST",
    url: "add_right",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      "right": 1}),
    error: function(request, status, error){
      console.log('error')
      console.log(request)
      console.log(status)
      console.log(error)
    }

  })
}