const request = require("request");
exports.getGeoForAddr = (address)=>{
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    (error, response, body)=>{
      let jsonObj = JSON.parse(body);
      body.result[0]
});
}
