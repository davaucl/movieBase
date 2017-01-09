//Variable representing the base url of the API
var baseURL = "https://umovie.herokuapp.com/";

//Format a date in this format: dd MMMM yyyy
function dateFormat(date){
    return $.format.date(new Date(date), 'dd MMMM yyyy');
}

//Function to convert a duration in time
function msToTime(ms){
    var duration = new Date(ms);
    return duration.getMinutes() + ":" + (duration.getSeconds() < 10 ? "0" + duration.getSeconds() : duration.getSeconds());
};

//Function to set the Youtube link of a movie with only the movie title in html DOM
function movieTitle_To_YoutubeLink(title) {
    $.get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + title + "Movie Trailer.&maxResults=1.&key=AIzaSyBmCnFCBIyXfETvLjaNFQOgvHTui4iD_A4",
        function(data) {
            $('#previewYoutube').attr('src','https://www.youtube.com/embed/' + data.items[0].id.videoId);
        }
    )
};

//Function to get information about an actor and insert
// this information to specific places in the html (check jquery selectors)
function actorName_To_ActorData(name) {
    $.get(
        "https://api.themoviedb.org/3/search/person?api_key=09f3084b7e40e902de602959e2a3f4ea&query=" + name,
        function(data) {
            var actorID = data.results[0].id;
            $.get(
                "https://api.themoviedb.org/3/person/" + actorID + "?api_key=09f3084b7e40e902de602959e2a3f4ea",
                function(data) {
                    // biography treatment
                    if (data != null) {
                        var fullBiography = data.biography;
                        if (fullBiography.includes('From Wikipedia, the free encyclopedia')) { // trim string only in some cases
                            var start_pos = fullBiography.indexOf("From Wikipedia, the free encyclopedia")+38;
                        } else if (fullBiography.includes('Description above from the Wikipedia')) {
                            var end_pos = fullBiography.indexOf("Description above from the Wikipedia");
                        } else {
                            start_pos = 0;
                            end_pos = fullBiography.length;
                        }
                        var onlyBiography = fullBiography.substring(start_pos,end_pos);
                    } else {
                        var onlyBiography = 'Biography id under construction. Please comme back later';
                    }
                    // write biography to specific place in html
                    $('#main-informations-carousel-option1').html('<div>' + onlyBiography + '</div>')

                    // photo treatment
                    if (data.profile_path != null) {
                        $('#actorPictureGeneric').attr("src","http://image.tmdb.org/t/p/w154/" + data.profile_path);
                    } else {
                        $('#actorPictureGeneric').attr("src","https://s18.postimg.org/48od562hl/generic.png");
                    }

                    // popularity tratement
                    if (data.popularity != null) {
                        $('#main-informations-carousel-option3').html('<div>Popularity: ' + data.popularity + '</div>');
                    } else {
                        $('#main-informations-carousel-option3').html('<div>Popularity is not available for this actor</div>');
                    }
                }
            )
        }
    )
};

function watchlistId_To_WatchlistName(id) {
    $.get(
        baseURL + "watchlists/" + id,
        function(data) {
            $('#watchListEditName').val(data.name);
        }
    )
};

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function accountEmail_to_Gravatar(email){
    email = email.trim();
    email = email.toLowerCase();
    var hash = md5(email);
    return "https://www.gravatar.com/avatar/" + hash + "?s=200";
};

// costumization inspired from -> http://www.benknowscode.com/2014/03/customize-jquery-ui-autocomplete-menu.html
$.widget("defined.autocomplete", $.ui.autocomplete, {
    _create: function () {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
    },
    _renderMenu: function (ul, items) {
        var that = this,
            currentCategory = "";
        $.each(items, function (index, item) {
            var li;
            if (item.category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                currentCategory = item.category;
            }
            li = that._renderItemData(ul, item);
            if (item.category) {
                li.attr("aria-label", item.category + " : " + item.label);
            }
        });
    }
});

