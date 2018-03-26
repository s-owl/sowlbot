# sowlbot

Slack bot for S.OWL

## 실행환경 설정
- Node.js, Git이 미리 설치 되어 있어야 합니다.
- 소스코드를 클론하고, 의존성 패키지를 받습니다.
```
git clone https://github.com/s-owl/sowlbot.git
cd sowlbot
npm install
```
- 환경변수 설정을 합니다.
```
export SLACK_TOKEN=<Slack 봇 토큰>
export GOOGLE_API_KEY=<Google API Key>
export OPENWEATHERMAP_KEY=<Open Weather Map API Key>
export AQICN_TOKEN=<AQI.CN API KEY>
```
> Google API Key 는 [여기](https://console.developers.google.com/apis/credentials)에서 발급 가능합니다.
> Open Weather Map API Key 는 [여기](http://openweathermap.org/api)서 발급 가능합니다.
> AQI.CN API KEY 는 [여기](http://aqicn.org/api/)서 발급 가능합니다.

- 봇 프로그램을 시작합니다.
```
npm start
```
