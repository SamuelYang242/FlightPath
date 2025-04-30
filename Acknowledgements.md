### Photos:

logo.png from flaticon at: https://www.flaticon.com/free-icon/boarding-pass_701366

background.jpg from wallpaper cat at: https://wallpapercat.com/air-canada-wallpapers#modal

### Code: 
Most of my CSS learning came from: 
https://www.w3schools.com/css/
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout

The majority of authentication code, written in [auth.mjs](./src/auth.mjs) and [app.mjs](./src/app.mjs) is based on passportjs documentation at https://www.passportjs.org/docs/, as well as various other sources noted below and commented directly into code. 

- [app.post('/register)](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/auth.mjs#L12) is inspired by code from app.mjs in homework05
- [passport.serialize](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/auth.mjs#L51) and [passport.deserialize](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/auth.mjs#L57) is taken from https://github.com/passport/todos-express-password
- [background opacity css rule](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/public/css/main.css#L144) is learned from https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
- [disable horizontal scroll](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/public/css/main.css#L15) is taken from https://stackoverflow.com/questions/17756649/disable-the-horizontal-scroll
- [gradients in css](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/public/css/main.css#L162) are learned from https://www.w3schools.com/css/css3_gradients.asp
- [background images in css](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/c6fceeeac84acd2091edc6b7f8c029d7d9ce9da3/src/public/css/main.css#L5) are learned from https://www.w3schools.com/html/html_images_background.asp 
- All code using leaflet library in [testing](./testing) and [scripts.mjs](./src/public/js/scripts.mjs)  are from https://leafletjs.com/examples/quick-start/ and https://leafletjs.com/reference.html#map-example
- All code using chartjs module in [testing](./testing) and [scripts.mjs](./src/public/js/scripts.mjs) are from https://www.chartjs.org/docs/latest/
- [Reload from client-sized javascript]() from https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
- Used weather API from https://aviationweather.gov/data/api/#/Data/dataMetars in [app.get('/weater/:airport')]() to fetch weather data. 


### Others:
Website name is generated using chatGPT because I am not creative enough. I sure hope it's not copyrighted somewhere.

[Airline data](./src/public/data/airlines.json) adapted from : 
https://github.com/elmoallistair/datasets/blob/main/airlines.csv

[Airport data](./src/public/data/airports.json) adapted from : 
https://github.com/elmoallistair/datasets/blob/main/airports.csv

I used https://csvjson.com/csv2json to convert from csv to json, but data was cleaned and filtered myself using a [javascript program](./src/public/data/parser.mjs)
- Note: the program won't work anymore because the original CSV files have been deleted, but the program is there as a record and in case troubleshooting is needed