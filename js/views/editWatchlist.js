var EditWatchlist = Backbone.View.extend({
    template: _.template($('#editWatchlistTemplate').html()),
    el: '#page-wrapper',
    events: {
        'click .save': 'saveWatchlist',
        'click .delete': 'removeWatchlist'
    },

    render: function(id) {
        var self = this;
        var template = this.template({
            wrapper : self.id
        });
        this.$el.html(template);
        return this;
    },

    removeWatchlist: function(ev) {
        var id = this.id;
        $.ajax({
            url: baseURL + 'watchlists/' + id,
            type: 'DELETE',
            success: function() {
                router.navigate('watchlists', {trigger: true});
            },
            error: function() {
                console.log('An error has occured while trying to remove a watchlist');
                router.navigate('watchlists', {trigger: true});
            }
        });
    },

    saveWatchlist: function(ev) {
        var id = this.id;
        var nameObject = $('#editWatchlistForm :input').serializeObject();
        var nameObject2 = $('#editWatchlistForm :input');
        console.log(nameObject2);
        $.ajax({
            async: false,
            url: baseURL + 'watchlists/' + id,
            type: 'PUT',
            data: "name=" + nameObject2,
            success: function() {
                console.log('The Watchlist was renamed');
                router.navigate('watchlists', {trigger: true});
            },
            error: function() {
                console.log('An error has occured while trying to rename a watchlist');
                router.navigate('watchlists', {trigger: true});
            }
        });
    }

});
