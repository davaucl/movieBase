var SignUp = Backbone.Model.extend({
    urlRoot: baseURL + 'signup',

    defaults: {
        name: '',
        email: '',
        password: ''
    },

    validate: function (userParams) {
        var errors = [];
        if (userParams.name === '')
            errors.push("name");
        if (userParams.password === '')
            errors.push("password");
        if (errors.length > 0)
            return errors;
    }
});