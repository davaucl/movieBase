/********************************************************************/
/*Script that allows the navigation between 3 option carousel style */
/********************************************************************/

/* Color of the selected element */
var colorSelection = "darkred";

/* Basic color (non selected elements */
var colorBase = "#959595";

$('#page-wrapper').on('click', '#navCarouselOption1', function() {
    $('#main-informations-carousel-option1').css("display", "block");
    $('#main-informations-carousel-option2').css("display", "none");
    $('#main-informations-carousel-option3').css("display", "none");
    $('#navCarouselOption1').css("color", colorSelection);
    $('#navCarouselOption1').parent().css("border-bottom-color", colorSelection);
    $('#navCarouselOption2').css("color", colorBase);
    $('#navCarouselOption2').parent().css("border-bottom-color", colorBase);
    $('#navCarouselOption3').css("color", colorBase);
    $('#navCarouselOption3').parent().css("border-bottom-color", colorBase);
});

$('#page-wrapper').on('click', '#navCarouselOption2', function() {
    $('#main-informations-carousel-option1').css("display", "none");
    $('#main-informations-carousel-option2').css("display", "block");
    $('#main-informations-carousel-option3').css("display", "none");
    $('#navCarouselOption1').css("color", colorBase);
    $('#navCarouselOption1').parent().css("border-bottom-color", colorBase);
    $('#navCarouselOption2').css("color", colorSelection);
    $('#navCarouselOption2').parent().css("border-bottom-color", colorSelection);
    $('#navCarouselOption3').css("color", colorBase);
    $('#navCarouselOption3').parent().css("border-bottom-color", colorBase);
});

$('#page-wrapper').on('click', '#navCarouselOption3', function() {
    $('#main-informations-carousel-option1').css("display", "none");
    $('#main-informations-carousel-option2').css("display", "none");
    $('#main-informations-carousel-option3').css("display", "block");
    $('#navCarouselOption1').css("color", colorBase);
    $('#navCarouselOption1').parent().css("border-bottom-color", colorBase);
    $('#navCarouselOption2').css("color", colorBase);
    $('#navCarouselOption2').parent().css("border-bottom-color", colorBase);
    $('#navCarouselOption3').css("color", colorSelection);
    $('#navCarouselOption3').parent().css("border-bottom-color", colorSelection);
});