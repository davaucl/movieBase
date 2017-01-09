var MovieInfo = Backbone.View.extend({
    template: _.template($('#movieTemplate').html()),
    el: '#page-wrapper',
    events: {
        'click .add-to-watchlist': 'addToWatchlist',
    },
    render: function(id) {
        var self = this;
        this.model.fetch({
            success: function () {
                self.collection.userWatchList.fetch({
                    success: function () {
                        self.displayTemplate()
                    }
                });
            },
            error: function (model, response) {
                if (response.status === 401) {
                    session.calledAfterLogout();
                    router.navigate('#/login');
                }
                else {
                    notFoundError.render(response.status);
                }
            }
        });
    },
    displayTemplate: function() {
        var releasedDate = dateFormat(this.model.toJSON().releaseDate);

        var template = this.template({
            wrapper : this.model.toJSON(),
            userWatchlists : this.collection.userWatchList.toJSON(),
            release: releasedDate
        });
        this.$el.html(template);
        this.afterRender();
    },

    afterRender: function() {
        $('#navCarouselOption1').click();
        this.populateTable();
    },

    populateTable: function() {
        $.get(
            "http://www.omdbapi.com/?t=" + this.model.get('trackCensoredName') + "&y=&plot=long&r=json",
            function(data) {
                if(data.Actors != undefined) {
                    var actorsList = (data.Actors).split(",");
                    for (i = 0; i < actorsList.length; i++) {
                        $.get(
                            baseURL + "search/actors?q=" + actorsList[i],
                            function (data) {
                                if (data.results[0] != undefined) {
                                    $('#castList').append('<tr>' +
                                        '<td><a class="movieLink" href="#/actors/' + data.results[0].artistId + '">' + data.results[0].artistName + '</a></td>' +
                                        '<td align="center">' + data.results[0].artistType + '</td>' +
                                        '<td align="center">' + data.results[0].primaryGenreName + '</td>' +
                                        '<td align="center"><a href="' + data.results[0].artistLinkUrl + '" target="_blank"><section class="glyphicon glyphicon-share-alt"></section></a></td>' +
                                        '</tr>');
                                }
                            }
                        )
                    }
                }else{
                    $('#castList').append('Under construction');
                }
            }
        )
    },

    addToWatchlist: function(e) {
        e.preventDefault();
        var watchlistId = $(e.currentTarget).attr("id");
        var watchlist = this.collection.userWatchList.get(watchlistId);
        watchlist.add(this.model);
    }
});
