const request = require('request');

exports.run = (rtm, msg, channel)=>{
  if(msg.match("(\!공기) (.+)") ||
    msg.match("(\!air) (.+)")){
    console.log("aqicn---");
    const keyword = msg.replace("!공기 ", "").replace("!air ", "").replace(/( )/gi, "+");
    const token = process.env.AQICN_TOKEN;
    try{
      const googleMapsClient = require('@google/maps').createClient({
        key: process.env.GOOGLE_API_KEY
      });
      googleMapsClient.geocode({
        address: keyword
      }, (err, response)=>{
        if (err) console.log(err);
        const geo = response.json.results[0];
        console.log(JSON.stringify(geo));
        const aiqcnUrl = "https://api.waqi.info/feed/geo:"+geo.geometry.location.lat+";"+geo.geometry.location.lng+"/?token="+token;
        console.log(aiqcnUrl);
        request(aiqcnUrl,
          (error, response, body)=>{
            if(error){console.log(error);}
            console.log(response);
            let jsonObj = JSON.parse(body);
            let str = `*${keyword}* (${geo.formatted_address}) 에서 가장 가까운 곳인, *${jsonObj.data.city.name}* 에서 관측된 현재 공기질 정보입니다.\n\n`
            +`종합 AQI 지수는 *${jsonObj.data.aqi}* 이며, 이는 *${getLevelForAqi(jsonObj.data.aqi)}* 입니다.\n\n`
            +`PM2.5: *${jsonObj.data.iaqi.pm25.v || "자료 없음"}*, PM10: *${jsonObj.data.iaqi.pm10.v || "자료 없음"}*\n`
            +`일산화 탄소: *${jsonObj.data.iaqi.co.v || 자료없음}*, 이산화 질소: *${jsonObj.data.iaqi.no2.v || 자료없음}*\n`
            +`오존: *${jsonObj.data.iaqi.o3.v || 자료없음}*, 이산화 황: *${jsonObj.data.iaqi.so2.v || 자료없음}*\n`
            +`>출처: aqicn.org`;
            rtm.sendMessage(str, channel)
            .then((res) => {
              // `res` contains information about the posted message
              console.log('Message sent: ', res.ts);
            })
            .catch(console.error);
          });

      });

    }catch(err){
      console.log(err);
    }
    console.log("---aqicn");
  }
  return;

}

function getLevelForAqi(aqi){
  if(aqi<=50) return "좋음 - 대기오염 관련 질환자군에서도 영향이 유발되지 않을 수준"
  else if(aqi>=51&&aqi<=100) return "보통 - 환자군에게 만성 노출시 경미한 영향이 유발될 수 있는 수준"
  else if(aqi>=101&&aqi<=150) return "민감군영향 - 환자군 및 민감군에게 유해한 영향이 유발될 수 있는 수준"
  else if(aqi>=151&&aqi<=200) return "나쁨 - 환자군 및 민감군(어린이, 노약자 등)에게 유해한 영향 유발, 일반인도 건강상 불쾌감을 경험할 수 있는 수준"
  else if(aqi>=201&&aqi<=300) return "매우나쁨 - 환자군 및 민감군에게 급성 노출시 심각한 영향 유발, 일반인도 약한 영향이 유발될 수 있는 수준"
  else return "위험 - 환자군 및 민감군에게 응급 조치가 발생되거나, 일반인에게 유해한 영향이 유발될 수 있는 수준"
}
