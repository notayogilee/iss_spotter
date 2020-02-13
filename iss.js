const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org?format=json`, (error, response, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    ip = JSON.parse(ip).ip;
    callback(null, ip);

  });
};
module.exports = { fetchMyIP };