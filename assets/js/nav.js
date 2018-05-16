'use-strict'

document.addEventListener('DOMContentLoaded', function () {

  var burger = document.getElementById('burger');

  burger.addEventListener('click', function (e) {

    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
    event.target.classList.toggle('is-active');

  });



}); // eo dom content loaded
