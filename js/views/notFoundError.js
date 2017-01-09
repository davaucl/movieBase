/**
 * Created by David on 2016-11-30.
 */
var NotFoundError = Backbone.View.extend({
    template: _.template($('#notFoundErrorTemplate').html()),
    el: '#page-wrapper',

    render: function (code) {

        var msg;
        var option;
        switch(code) {
            case 404:
                msg = "Hey boy, what you looking for?";
                break;
            case 400:
                msg = "Oops, just try again in a second";
                break;
            case 503:
                msg = "Seems like we are having some problems over here, hold tight and go get yourself some popcorn ";
                break;
            default:
                msg = "Soz, looks like we ain't doing very well ";
        }
        var template = this.template({
            code: code,
            message: msg,
            option: option
        });
        this.$el.html(template);
    }
});