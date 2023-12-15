document.addEventListener("DOMContentLoaded", function () {
  const lableButton = document.getElementById("lableButton");
  const burgerMenu = document.getElementsByClassName("burgerMenu")[0];
  const closeButton = document.getElementById("closeButton");

  lableButton.addEventListener("click", function () {
    if (window.innerWidth <= 700) {
      const currentLeft = getComputedStyle(burgerMenu).left;
      if (currentLeft === 0) {
        burgerMenu.style.left = "-250px";
      } else {
        burgerMenu.style.left = "0";
      }
    }
  });

  closeButton.addEventListener("click", function () {
    burgerMenu.style.left = "-250px";
  });
});
