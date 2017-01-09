var UserPage = Backbone.View.extend({
    template: _.template($("#userPageTemplate").html()),
    el: "#page-wrapper",
    events: {
        "click #follow-unfollow": "follow",
        "click .following-list": "gotoFriendProfil"
    },
    follow: function(e) {
        var elem = $(e.currentTarget);

        if (elem.text() == "Follow") {
            this.model.follow(this.model.get("id"));
            elem.text("Unfollow");
        } else {
            this.model.unfollow(this.model.get("id"));
            elem.text("Follow");
        }
        return true;
    },
    gotoFriendProfil: function(e) {
        Backbone.history.navigate("#user/" + $(e.currentTarget).attr("data-id"),
            { trigger: true});
    },
    render: function(id) {
        var self = this;
        // console.log("userId", session.get("userId"));
        // var tmp = session.get("")
        this.me = new User({
            id: session.get('userId')
        });
        this.model.fetch({
            success: function() {
                self.displayTemplate();
            }
        });
    },
    displayTemplate: function() {
        var self = this;
        var isFollowing;
        for (x in this.model.toJSON().following) {
            console.log("me:", this.me.get("id"), "him:", this.model.toJSON().following[x].id);
            if (this.me.get("id") == this.model.toJSON().following[x].id) {
                isFollowing = true;
                break;
            } else
                isFollowing = false;
        }
        console.log(isFollowing);
        var profile_pic = "http://www.gravatar.com/avatar/" + md5(this.model.toJSON().email.trim().toLowerCase());
        var template = this.template({
            user: this.model.toJSON(),
            me: this.me.toJSON(),
            isFollowing: isFollowing,
            profile_pic: profile_pic,
            wrapper: this.model.toJSON()
        });
        this.$el.html(template);

        //Display user watchlists
        var userWatchlist = new WatchlistCollection({
            watchlistOwner: this.model.get("id")
        });

        userWatchlist.fetch({
            success: function() {
                watchlistsInfo.collection = userWatchlist;
            }
        })

    }
});
