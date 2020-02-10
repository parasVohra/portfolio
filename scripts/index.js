// function for to hide and show  menu
function script(){

    var menuElement = document.getElementById("menuButton");

    menuElement.classList.add("hide")
    
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        var menuElement = document.getElementById("menuButton");
    
        if(last_known_scroll_position > 49){
            menuElement.classList.remove("hide")
            menuElement.classList.add("show")
        }
        else{
            menuElement.classList.remove("show")
            menuElement.classList.add("hide")
    
        }
    
    })

   
}

