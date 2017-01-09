var Footer = Backbone.View.extend({
    el: '#footer-container',

    initialize: function(){
        this.render();
    },

    render: function(){
        var template = _.template($('#footer-tpl').html());
        this.$el.html(template);
        return this;
    }
});
