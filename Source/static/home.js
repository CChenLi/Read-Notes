$(document).ready(function(){
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