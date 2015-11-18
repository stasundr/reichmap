'use strict';

let _ = require('lodash');
let multer = require('multer');
let annoParse = require('./annoParse');

let anno = undefined; // move to cookies
let data = undefined; // -//-
let drawList = [];    // -//-
let upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    app.get('/', (request, response) => { response.render('welcomeScreen') });

    app.get('/samples', (request, response) => {
        if (anno) {
            data = annoParse(anno);
            response.render('chooseSamples', { autocomplete: JSON.stringify(data.autocomplete) });
        } else {
            response.redirect('/');
        }
    });

    app.get('/map', (request, response) => {
        response.render('drawMap', { samples: JSON.stringify(drawList) });
    });

    app.post('/search', (request, response) => {
        if (data) {
            let query = request.body.query;
            let found = [];

            for (let sampleIndex in data) {
                if ((sampleIndex !== 'autocomplete') && data.hasOwnProperty(sampleIndex)) {
                    let sample = data[sampleIndex];
                    for (let property in sample) {
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

    app.post('/upload', upload.single('file'), (request, response) => {
        anno = request.file.path;
        response.sendStatus(200);
    });

    app.post('/create', (request, response) => {
        drawList = request.body;
        response.json({});
    })
};