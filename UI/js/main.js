const toggleNavIcon = () => {
    var myTopNav = document.querySelector("#myTopnav");
    if (myTopNav.className === "topnav") {
      myTopNav.className += " responsive";
    } else {
      myTopNav.className = "topnav";
    }
}

const navButton = document.querySelector("#navButton");
navButton.addEventListener('click', toggleNavIcon);
