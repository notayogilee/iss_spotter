const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });
};


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

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    data = JSON.parse(data);
    const latitude = `${data.data.latitude}`;
    const longitude = `${data.data.longitude}`;

    data = { latitude: latitude, longitude: longitude };

    callback(null, data);
  });
};

const fetchISSFlyOverTimes = function(data, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`, (error, response, times) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(times).response;
    callback(null, passes);

  });
};

module.exports = { nextISSTimesForMyLocation };
