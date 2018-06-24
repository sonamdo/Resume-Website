$(document).ready(function(){

var socket = io();

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

  $("#submit").on("click",function(){

    var from = $("#from").val();
    var email = $("#email").val();
    var message = $("#message").val();

    if(validateEmail(email)){
      if (message.length == 0){
        alert("message required")
      }
      else{
        if (from.length == 0){
          alert("from field required")
        }
        else {
          socket.emit('sendEmail',{
            from,
            email,
            message
          });
          alert("Message sent, thanks for reaching out!")
        }
      }
    }
    else {
      alert("invalid email address");
      return
    }
  });

  $('#carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint:600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3500,
          dots: true,
          arrows: false
        },
      },
      {
        breakpoint:480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3500,
          dots: true,
          arrows: false
        },
      }
    ]
  });

});
