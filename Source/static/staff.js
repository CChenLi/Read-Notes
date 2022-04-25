$(document).ready(function(){
    id= parseInt(id)
    if (id > 1){
        var prev = $('<button type = "button" class = "btn btn-light rightmargin" id = "prev"> Prev </button>')
        $(prev).on( "click", function(event) {
            event.preventDefault();
            window.location = "/lesson/staff/" + (parseInt(id) - 1)
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
            window.location = "/lesson/staff/" + (parseInt(id) + 1)
        })
    }
    
    $("#button").append(next)
})



