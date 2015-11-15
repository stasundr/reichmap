'use strict';

var _ = require('lodash');
var annoParse = require('./annoParse');

module.exports = function(app, upload, anno, data, drawList) {
    app.get('/', function(request, response) {
        response.render('welcomeScreen');
    });

    app.get('/samples', function(request, response) {
        if (anno) {
            data = annoParse(anno);
            response.render('chooseSamples', { autocomplete: JSON.stringify(data.autocomplete) });
        } else {
            response.redirect('/');
        }
    });

    app.get('/map', function(request, response) {
        response.render('drawMap', { samples: JSON.stringify(drawList) });
    });

    app.post('/search', function(request, response) {
        if (data) {
            var query = request.body.query;
            var found = [];
            for (var sampleIndex in data) {
                if ((sampleIndex !== 'autocomplete') && data.hasOwnProperty(sampleIndex)) {
                    var sample = data[sampleIndex];
                    for (var property in sample) {
                        if (sample.hasOwnProperty(property) && (sample[property] === query)) {
                            found.push(sample);
                        }
                    }
                }
            }

            found = _.uniq(found);
            response.json(found);
        } else {
            response.json({});
        }
    });

    app.post('/upload', upload.single('file'), function (request, response) {
        anno = request.file.path;
        response.sendStatus(200);
    });

    app.post('/create', function(request, response) {
        drawList = request.body;
        response.json({});
    })
};