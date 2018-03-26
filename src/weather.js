const request = require('request');

exports.run = async (rtm, msg, channel)=>{
  if(msg.startsWith("!날씨 ") ||
    msg.startsWith("!weather ") ||
    msg.startsWith("！天气 ")
  ){
    const keyword = msg.replace("!날씨 ", "").replace("!weather ", "")
      .replace("！天气 ", "").replace(/( )/gi, "+");
    const token = process.env.OPENWEATHERMAP_KEY;
    try{
      const googleMapsClient = require('@google/maps').createClient({
        key: process.env.GOOGLE_API_KEY
      });
      googleMapsClient.geocode({
        address: keyword
      }, (err, response)=>{
        if (!err) {
          const geo = response.json.results[0];
          const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${geo.geometry.location.lat}&lon=${geo.geometry.location.lng}&units=metric&appid=${token}`;
          console.log(weatherUrl);
          request(weatherUrl,
            (error, response, body)=>{
              if(error) console.log(error);
              console.log(body);
              let jsonObj = JSON.parse(body);
              let str = `*${keyword}* (${geo.formatted_address}) 의 현재 날씨 입니다.\n`
              +`${jsonObj.weather[0].main}, ${jsonObj.main.temp}℃, 습도: ${jsonObj.main.humidity}%, 기압:${jsonObj.main.pressure}hPa,\n`
              +`풍속: ${jsonObj.wind.speed}m/s, 풍향: ${jsonObj.wind.deg}°\n`
              +`> 출처: openweathermap.org`;
              rtm.sendMessage(str, channel)
              .then((res) => {
                // `res` contains information about the posted message
                console.log('Message sent: ', res.ts);
              })
              .catch(console.error);
            });
        }
      });

    }catch(err){
      console.log(err);
    }
  }

}
