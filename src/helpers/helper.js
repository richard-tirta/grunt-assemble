module.exports.register = function (Handlebars) {
    'use strict';

    /* String Encode */
    Handlebars.registerHelper('encode', function (text) {
        return encodeURIComponent(text);
    });
};
