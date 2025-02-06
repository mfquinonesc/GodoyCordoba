// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
const loadBurger = (value) => {
    const burger = document.querySelector(value);
    const menu = document.querySelector('#' + burger.dataset.target);
    const options = menu.getElementsByTagName('a');
  
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  
    for (let i = 0; i < options.length; i++) {
      options[i].addEventListener('click', () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    }
  }
  
  addEventListener("DOMContentLoaded", (event) => {
    loadBurger('#burger');
  });