/**
 * Created by marcus on 23/11/16.
 */

var Session = Backbone.Model.extend({
    defaults: {
        signedIn: "false",
        access_token: '',
        userId: '',
        username: '',
        email: ''
    },
    initialize: function() {
        var cookie_logged_in = $.cookie('signedIn');
        if (typeof(cookie_logged_in) !== 'undefined') {
            this.calledAfterLogin();
        }
    },
    calledAfterLogin: function() {
        this.set({
            signedIn: $.cookie('signedIn'),
            access_token: $.cookie('token'),
            userId: $.cookie('userId'),
            username: $.cookie('username'),
            email: $.cookie('email')});

        var self = this;
        setTimeout(function(){self.calledAfterLogout(); router.navigate('#/login');},1440 * 60 * 1000); // set cookie time out 24h
    },
    calledAfterLogout: function() {
        $.removeCookie('signedIn');
        $.removeCookie('token');
        $.removeCookie('userId');
        $.removeCookie('username');
        $.removeCookie('email');

        this.clear({silent: true});
        this.set(this.defaults);
    }
})

