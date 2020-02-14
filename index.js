const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log('It didn\'t work!', error);
      return;
    }
    // console.log("It worked!  Returned Coords: ", data);
    fetchISSFlyOverTimes(data, (error, passes) => {
      if(error) {
        console.log('It didn\'t work!', error);
        return;
      }
      console.log(`It worked!! Flyover times are `, passes);
    });
  });
});

