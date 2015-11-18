'use strict';

let fs = require('fs');
let _ = require('lodash');

module.exports = (path) => {
    let samples = fs
        .readFileSync(path, 'utf-8')
        .split('\n')
        .map(s => s.split('\t'))
        .filter(s => s[0] !== undefined);

    let header = samples.shift();
    let data = { autocomplete: [] };

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