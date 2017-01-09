/**
 * Created by marcus on 23/11/16.
 */

var Connection = Backbone.View.extend({
    template: _.template($('#connectionTemplate').html()),
    el: '#page-wrapper',
    events: {
        'submit #SignUp-form': 'signup',
        'submit #Login-form': 'login'
    },

    initialize: function(action) {
        this.actionType = action.type;
    },
    render: function() {
        var template = this.template({
            action: this.actionType
        })
        this.$el.html(template);
    },

    signup: function(e){
        e.preventDefault(); // overwrite the normal behavior of SignUP-form submit
        var self = this;
        var newAccount = new SignUp();
        var accountDetails = $(e.currentTarget).serializeObject();

        newAccount.save(accountDetails, {
            success: function(model,response){
                console.log(response);
                self.actionType = "Login";
                router.navigate('#/login');
                alert("Your account has been succesfully created");
            },
            error: function(model,response){
                if(response.status == 401){
                    $('#error_message').html("An account already exist with the same information...");
                    $('.signUpForm_error').removeClass("hide");
                }
            }
        });
    },

    login: function(e){
        e.preventDefault(); // overwrite the normal behavior of Login-form submit
        // create date object + 24h for cookie timeout
        var date = new Date()
        date.setTime(date.getTime() + (1000 * 60 * 1440));

        var self = this;
        var credentials = $(e.currentTarget).serializeObject();

        var currentSession = new Login();
        currentSession.save(credentials, {
            success: function(currentSession) {
                $.cookie('signedIn', true, { expires: date });
                $.cookie('token', currentSession.get('token'), { expires: date });
                $.cookie('userId', currentSession.get('id'), { expires: date });
                $.cookie('username', currentSession.get('name'), { expires: date });
                $.cookie('email', currentSession.get('email'), { expires: date });
                session.calledAfterLogin();
                window.location.reload(false);
                router.navigate('#/') // open index after login is success
            },
            error: function(model, response) {
                        if (response.status == 400 || response.status == 401) {
                            alert("Invalid Username/Password combination");
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }
                    }
        });
    }
});