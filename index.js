const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let pass of passes) {
    //convert date from unix timestamp to readable date

    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date(pass.risetime * 1000);
    let day = daysOfWeek[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let duration = pass.duration;
    console.log(`Next pass at ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT-0700 (Pasific Daylight Time) for ${duration} seconds!`);
  };
});
