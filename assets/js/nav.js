'use-strict'

document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelectorAll('.navbar');
  var circle = document.querySelectorAll('.menu-circle');
  circle[0].style.display = 'none'

  var burger = document.getElementById('burger');

  burger.addEventListener('click', function (e) {

    // Toggle the class on both the "navbar-burger" and the "navbar-menu"

    event.target.classList.toggle('is-active');

    if (circle[0].style.display === 'none') {
      circle[0].style.display = 'block'
    } else {
      window.setTimeout(function(){
        circle[0].style.display = 'none'
      }, 200);
    }

    window.setTimeout(function(){
      navbar[0].classList.toggle('is-active');
    },0);

  });



}); // eo dom content loaded
