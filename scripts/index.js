// function for to hide and show  menu

function script() {
  var menuElement = document.getElementById("menuButton");
  menuElement.classList.add("hide");
  if (window.innerWidth <= 800) {
    $("#sliderBar").css("right", "-100%");
    $("#sliderBar").css("width", "100vw");
  }
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

  $("#projectDesk").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#project").offset().top,
      },
      1000
    );
  });
  $("#projectBar").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#project").offset().top,
      },
      1000
    );
    document.getElementById("menuButton").classList.toggle("change");
    document.getElementById("sliderBar").classList.toggle("changed");
  });

  $("#aboutDesk").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".aboutContentBox").offset().top,
      },
      1000
    );
  });
  $("#aboutBar").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".aboutContentBox").offset().top,
      },
      1000
    );
    document.getElementById("menuButton").classList.toggle("change");
    document.getElementById("sliderBar").classList.toggle("changed");
  });

  $("#contactDesk").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".contactContainer").offset().top,
      },
      1000
    );
  });
  $("#contactBar").click(function () {
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

function projectFunc() {
  var test = new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();

    req.open("GET", "project.json");
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(req.statusText);
      }
    };

    req.onerror = function () {
      reject("network error");
    };

    req.send();
  });

  test.then(
    function (response) {
      console.log("Response is ", JSON.parse(response));
      populateProject(JSON.parse(response));
    },
    function (error) {
      console.error("Request failed: ", error);
    }
  );
}

function populateProject(data) {
  //get id from project options
  var qs = new URLSearchParams(window.location.search);
  var id = qs.get("id");

  var projInfo = data.projects[id];

  $(".projectTitle").text(projInfo.projectTitle);

  $("#projectImage").attr("src", projInfo.projectImageUrl);

  if (projInfo.liveLink.hasLink) {
    $(".liveDemo").attr(
      "onclick",
      'window.open("' + projInfo.liveLink.url + '")'
    );
  } else {
    $(".liveDemo").css("opacity", "0.2");
  }

  if (projInfo.gitHubLink.hasLink) {
    $(".viewCode").attr(
      "onclick",
      'window.open("' + projInfo.gitHubLink.url + '")'
    );
  } else {
    $(".viewCode").css("opacity", "0.2");
  }

  // loop to populate content for respective project
  for (let i = 0; i < projInfo.projectContent.length; i++) {
    var heading = document.createElement("div");
    heading.className = "contentTitle";
    heading.innerHTML = projInfo.projectContent[i].heading;

    document.getElementById("contentWrapper").appendChild(heading);

    var content = document.createElement("div");
    content.className = "contentText";
    content.innerHTML = projInfo.projectContent[i].content;

    document.getElementById("contentWrapper").appendChild(content);

    if (projInfo.projectContent[i].image.hasImage) {
      var image = document.createElement("img");
      image.src = projInfo.projectContent[i].image.url;
      image.className = "resImgStyle";
      image.innerHTML = projInfo.projectContent[i].content;
      document.getElementById("contentWrapper").appendChild(image);
    }
  }

  //loop for populating result images

  for (let i = 0; i < projInfo.resultImages.length; i++) {
    var img = document.createElement("img");
    img.src = projInfo.resultImages[i].url;
    img.className = "resImgStyle";

    document.getElementById("resultImage").appendChild(img);
  }
}
