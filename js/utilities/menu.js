function toggleNavbar() {
    var menu = $('#navbar-menu');
    if (menu.hasClass('in')) {
        menu.removeClass('in')
        menu.css('padding', '0px');
    }
    else {
        menu.css('padding', '0 40px');
        menu.addClass('in');
    }
}

function desactive(){
    $('.active').removeClass("active");
}

function active(item){
    desactive();
    $("#" + item + "-menu").addClass("active");
}

//TODO: presentation/menu.js

