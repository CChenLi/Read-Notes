$(document).ready(function(){
    $('#lesson').click(function(event) {
        window.location = "/lesson"
        console.log('aaa')
        event.preventDefault();
    })
    
})
$(document).ready(function(){
    $('#quiz').click(function() {
        // var ip;
        // $.getJSON("https://api.ipify.org/?format=json", function(e) {
        //   ip = e.ip;
        // });
        // send_ip(ip);
        // console.log(ip);
        window.location = "/quiz/1";
    })
})

// function send_ip(ip){
//     $.ajax({
//       type: "POST",
//       url: "/",
//       dataType: "json",
//       contentType: "application/json; charset=utf-8",
//       data: JSON.stringify(ip),
//       error: function(request, status, error){
//         console.log('error')
//         console.log(request)
//         console.log(status)
//         console.log(error)
//       }
  
//     })
//   }