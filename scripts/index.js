// function for to hide and show  menu
function script() {
  var menuElement = document.getElementById("menuButton");
  menuElement.classList.add("hide");

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;
    var menuElement = document.getElementById("menuButton");

    if (last_known_scroll_position > 49) {
      menuElement.classList.remove("hide");
      menuElement.classList.add("show");
    } else if (window.outerWidth < 812) {
      menuElement.classList.remove("hide");
      menuElement.classList.add("show");
    } else {
      menuElement.classList.remove("show");
      menuElement.classList.add("hide");
    }
  });

  $("#projectDesk, #projectBar").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#project").offset().top,
      },
      1000
    );
    document.getElementById("menuButton").classList.toggle("change");
    document.getElementById("sliderBar").classList.toggle("changed");
  });

  $("#aboutDesk, #aboutBar").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".aboutContentBox").offset().top,
      },
      1000
    );
    document.getElementById("menuButton").classList.toggle("change");
    document.getElementById("sliderBar").classList.toggle("changed");
  });

  $("#contactDesk, #contactBar").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".contactContainer").offset().top,
      },
      1000
    );
    document.getElementById("menuButton").classList.toggle("change");
    document.getElementById("sliderBar").classList.toggle("changed");
  });
}
