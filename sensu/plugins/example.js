#!/usr/bin/env node

// example will check status.github.com if its up and has "All systems operational" reported

var request = require('request');

function log(msg, time) {
    console.log(msg + ' ' + time + ' '+new Date().getTime());
    console.log();
}

var start = process.hrtime();

request('https://status.github.com', function (error, response, body) {

    var responseTime = parseInt(process.hrtime(start)[1] / 10000000, 10);

    if(error) {
        log(error, responseTime);
        process.exit(1);
    } else if(response.statusCode != 200) {
        log('HTTP ' + response.statusCode, responseTime);
        process.exit(1);
    } else if(body.indexOf('All systems operational') == -1) {
        log('All services are not operational', responseTime);
        process.exit(1);
    } else {
        // success, all services up in html body returned
        process.exit(0);
    }

});
