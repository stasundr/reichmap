'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports = function(path) {
    var samples = fs
        .readFileSync(path, 'utf-8')
        .split('\n')
        .map(s => s.split('\t'))
        .filter(s => s[0] !== undefined);

    var header = samples.shift();

    var data = {};
    data.autocomplete = [];

    samples.forEach((sample, sampleIndex) => {
        data[sampleIndex] = {};
        sample.forEach((sampleProperty, samplePropertyIndex) => {
            data[sampleIndex][header[samplePropertyIndex]] = sampleProperty;
            data.autocomplete.push(sampleProperty);
        })
    });

    data.autocomplete = _.uniq(data.autocomplete).filter(s => s !== '');

    return data;
};