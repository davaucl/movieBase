Watchlists = Backbone.Model.extend({
    urlRoot: baseURL + 'watchlists',
    parse: function(response) {
        for (var x = 0;x < response.length; x++) {
            if ("name" in response[x]) {
                if (response[x].name.indexOf('<') == 0) {
                    var tmp = response[x].name;
                    var pos1, pos2;
                    var shift = 1;
                    var first = true;
                    for (var idx = 1;idx < tmp.length;idx++) {
                        if (tmp[idx] == '>') {
                            if (tmp[idx + 1] == '<')
                                break;
                            shift--;
                        }
                        if (!shift && first == true) {
                            pos1 = idx + 1;
                            first = false;
                        } else if (!shift && tmp[idx] == '<') {
                            pos2 = idx;
                            break;
                        }
                    }
                    response[x].name = tmp.substring(pos1, pos2);
                }
            }
            else {
                response.splice(x, 1);
                x--;
            }
        }
        return response;
    }
});
