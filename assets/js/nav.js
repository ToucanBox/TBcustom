'use-strict'

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelectorAll('.nav-menu-active');
  var circle = document.querySelectorAll('.menu-circle');
  circle[0].style.display = 'none'

  var burger = document.getElementById('burger');

  burger.addEventListener('click', function (e) {

    // Toggle the class on both the "navbar-burger" and the "navbar-menu"

    event.target.classList.toggle('is-active');

    if (circle[0].style.display === 'none') {
      // Inactive state
      circle[0].style.display = 'block';
      nav[0].style.display = 'block';
      window.setTimeout(function(){
        circle[0].classList.toggle('is-active');
      }, 1);
      window.setTimeout(function(){
        nav[0].classList.toggle('is-active');
      }, 400);
    } else {
      // Active state
      nav[0].classList.toggle('is-active');
      circle[0].classList.toggle('is-active');

      window.setTimeout(function(){
        circle[0].style.display = 'none';
        nav[0].style.display = 'none';
      }, 400);
    }

  });



}); // eo dom content loaded
