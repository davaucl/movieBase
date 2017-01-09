User = Backbone.Model.extend({
    urlRoot: baseURL + 'users',
    follow: function(data) {
        console.log("ici ? nan ? ");
        $.ajax({
            type: "POST",
            contentType: "application/json",
            crossDomain: true,
            url: baseURL + 'follow',
            data: JSON.stringify({id: data}),
        }).done(function () {
            console.log("follow succed");
            return true;
        }).fail(function () {
            console.log("follow fail");
            return false;
        });
    },
    unfollow: function(data) {
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            crossDomain: true,
            url: baseURL + 'follow/' + data,
        }).done(function () {
            console.log("unfollow succed");
            return true;
        }).fail(function () {
            console.log("unfollow fail");
            return false;
        });
    },
    parse: function(response) {
        return response;
    }
});
